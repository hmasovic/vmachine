import { Request, Response } from 'express';

/**
 * Handler function used for the health check endpoint.
 *
 * @param  {Request} req - The base request
 * @param  {Response} res - The base response
 */
export const healthCheck = async (req: Request, res: Response) => {
  return res.json({ healthy: true });
};
