import { logger } from '@logs/index';
import supertest from 'supertest';

import db from '@lib/db';

import { UserRole } from '@lib/db/interfaces';
import { Users } from '@lib/db/models';

import { HTTP_STATUSES } from '@lib/constants';

import app from '../../../app';

jest.mock('@config/index', () => ({
  __esModule: true,
  DB_HOSTS_READER: [],
  NODE_ENV: 'test',
  DB_DIALECT: 'sqlite',
}));

describe('handlers/user', () => {
  const request = supertest(app);

  beforeEach(async () => {
    try {
      await db.sync({ force: true });
    } catch (err) {
      logger.info(err);
    }
  });

  describe('/api/v1/user', () => {
    const callCreateUser = async (username: string, password: string, role: string) => {
      const user = {
        username,
        password,
        role,
      };

      return await request.post('/api/v1/user').set('Content-Type', 'application/json').send(user);
    };

    test('Should create the user as expected, because all of the data is valid', async () => {
      await callCreateUser('new-user', 'new-password', UserRole.BUYER);

      const users = await Users.findAll();
      expect(users.length).toBe(1);
      expect(users[0].username).toBe('new-user');
    });

    test('Should not create the user because the pre-defined status is wrong', async () => {
      const result = await callCreateUser('new-user', 'new-password', 'something-random');
      expect(result.statusCode).toBe(HTTP_STATUSES.BAD_REQUEST);
    });

    test('Should not create the user because a user already exists with the username', async () => {
      const firstResult = await callCreateUser('new-user', 'new-password', UserRole.BUYER);
      const secondResult = await callCreateUser('new-user', 'new-password-v2', UserRole.SELLER);

      const users = await Users.findAll({ where: { username: 'new-user' } });

      expect(firstResult.statusCode).toBe(HTTP_STATUSES.CREATED);
      expect(secondResult.statusCode).toBe(HTTP_STATUSES.UNPROCESSABLE_ENTITY);
      expect(users.length).toBe(1);
    });
  });
});
