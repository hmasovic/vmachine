import { logger } from '@logs/index';
import moment from 'moment';
import supertest from 'supertest';

import db from '@lib/db';
import { buildMessageResponse, createHashedPassword } from '@lib/helpers';

import { Product, Session, User, UserRole } from '@lib/db/interfaces';
import { Products, Sessions, Users } from '@lib/db/models';

import { HTTP_STATUSES } from '@lib/constants';

import app from '../../../app';

jest.mock('@config/index', () => ({
  __esModule: true,
  DB_HOSTS_READER: [],
  NODE_ENV: 'test',
  DB_DIALECT: 'sqlite',
}));

describe('handlers/vending-machine', () => {
  const request = supertest(app);

  const mockedUser: User = { id: 1, username: 'testing', password: createHashedPassword('password'), role: UserRole.BUYER, deposit: 0 };
  const mockedSession: Session = { id: 1, userId: mockedUser.id, isActive: true, expireTimestamp: moment().utc().add(2, 'h').toDate(), token: 'randomtoken' };

  beforeEach(async () => {
    try {
      await db.sync({ force: true });

      await Users.create(mockedUser);
      await Sessions.create(mockedSession);
    } catch (err) {
      logger.info(err);
    }
  });

  describe('/api/v1/vending-machine/deposit', () => {
    const callDepositEndpoint = async (coin: number) => {
      return await request.post('/api/v1/vending-machine/deposit').set('Content-Type', 'application/json').set('authorization', `Bearer ${mockedSession.token}`).send({ coin });
    };

    test('Should deposit the coins properly and sum up the deposit', async () => {
      await callDepositEndpoint(50);
      await callDepositEndpoint(100);
      await callDepositEndpoint(10);

      const user = await Users.findOne({ where: { id: mockedUser.id } });
      expect(user.deposit).toBe(1.6);
    });

    test('Should deposit only the expected data properly and return the expected amount', async () => {
      await callDepositEndpoint(50);
      await callDepositEndpoint(100);
      const failedResult = await callDepositEndpoint(33);

      const user = await Users.findOne({ where: { id: mockedUser.id } });

      expect(user.deposit).toBe(1.5);
      expect(failedResult.statusCode).toBe(HTTP_STATUSES.BAD_REQUEST);
    });
  });

  describe('/api/v1/vending-machine/buy', () => {
    const callBuyEndpoint = async (productId: number, amount: number) => {
      return await request.post('/api/v1/vending-machine/buy').set('Content-Type', 'application/json').set('authorization', `Bearer ${mockedSession.token}`).send({ productId, amount });
    };

    test('Should buy the product with the amount properly and calculate the coin change as expected', async () => {
      const mockedSeller: User = { id: 2, username: 'testing-seller', password: createHashedPassword('passwordseller'), role: UserRole.SELLER, deposit: 0 };
      await Users.create(mockedSeller);

      const mockedProduct: Product = { id: 1, productName: 'snickers', amountAvailable: 5, cost: 0.5, sellerId: mockedSeller.id };
      await Products.create(mockedProduct);

      await Users.update({ deposit: 3.75 }, { where: { id: mockedUser.id } });

      const response = await callBuyEndpoint(mockedProduct.id, 5);
      const result = response.body;

      expect(result.changeAmount).toBe(1.25);
      expect(result.changeInCoins).toStrictEqual([1, 0, 1, 0, 1]);
      expect(result.totalSpent).toBe(5 * 0.5);
    });

    test('Should not buy the product because the deposit is missing funds', async () => {
      const mockedSeller: User = { id: 2, username: 'testing-seller', password: createHashedPassword('passwordseller'), role: UserRole.SELLER, deposit: 0 };
      await Users.create(mockedSeller);

      const mockedProduct: Product = { id: 1, productName: 'snickers', amountAvailable: 5, cost: 0.5, sellerId: mockedSeller.id };
      await Products.create(mockedProduct);

      await Users.update({ deposit: 0.4 }, { where: { id: mockedUser.id } });

      const response = await callBuyEndpoint(mockedProduct.id, 5);

      expect(response.statusCode).toBe(HTTP_STATUSES.UNPROCESSABLE_ENTITY);
      expect(response.body).toStrictEqual(buildMessageResponse('Not enough deposit available to perform the transaction!'));
    });
  });
});
