import { Request, Response } from 'express';
import { ParamsDictionary, Send } from 'express-serve-static-core';

export interface SecuredBaseRequest extends Request {}

// requests
export interface BaseBodyRequest<T> extends Request {
  body: T;
}

export interface BaseParamsRequest<T extends ParamsDictionary> extends Request {
  params: T;
}
export interface BaseQueryParamsRequest<TParams extends ParamsDictionary, TQuery extends ParamsDictionary> extends Request {
  params: TParams;
  query: TQuery;
}

export interface SecuredBaseBodyRequest<T> extends SecuredBaseRequest {
  body: T;
}

export interface SecuredBaseParamsRequest<T extends ParamsDictionary> extends SecuredBaseRequest {
  params: T;
}

export interface SecuredBaseQueryRequest<T extends ParamsDictionary> extends SecuredBaseRequest {
  query: T;
}

// responses
export interface BaseResponse<ResBody> extends Response {
  json: Send<ResBody, this>;
}

export interface VerificationErrorModel {
  [key: string]: string;
}
