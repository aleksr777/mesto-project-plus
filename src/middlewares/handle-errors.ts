import { Request, Response, NextFunction } from 'express';
import {
  ERR_CODE_DEFAULT,
  ERR_CODE_BAD_REQUEST,
  ERR_CODE_NOT_FOUND,
  ERR_CODE_FORBIDDEN,
  ERR_CODE_CONFLICT,
  ERR_CODE_UNAUTH_ERROR,
} from '../constants/http-codes';
import {
  ERR_TEXT_DEFAULT,
  ERR_TEXT_INVALID_ID,
  ERR_TEXT_INVALID_DATA,
  ERR_TEXT_NOT_FOUND_BY_ID,
  ERR_TEXT_NOT_FOUND_PAGE,
  ERR_TEXT_UNAUTH_ERROR,
  ERR_TEXT_INSUFFICIENT_RIGHTS,
  ERR_TEXT_CONFLICT_EMAIL,
  ERR_TEXT_TOKEN_NOT_PROVIDED,
  ERR_TEXT_INVALID_TOKEN,
} from '../constants/error-text';

export type ErrorType =
'validation' |
'cast' |
'not-found-id' |
'not-found-page' |
'unauth'|
'insufficient-rights'|
'conflict-email'|
'token_not_provided'|
'invalid-token'|
undefined;

export default function handleErrors(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) {
    return next(err);
  }

  function sendRes(code: number, text: string) {
    return res.status(code).json({ error: text });
  }

  const errorType: ErrorType = err.message;

  switch (errorType) {
  case 'validation':
    return sendRes(ERR_CODE_BAD_REQUEST, ERR_TEXT_INVALID_DATA);
  case 'cast':
    return sendRes(ERR_CODE_BAD_REQUEST, ERR_TEXT_INVALID_ID);
  case 'not-found-id':
    return sendRes(ERR_CODE_NOT_FOUND, ERR_TEXT_NOT_FOUND_BY_ID);
  case 'not-found-page':
    return sendRes(ERR_CODE_NOT_FOUND, ERR_TEXT_NOT_FOUND_PAGE);
  case 'unauth':
    return sendRes(ERR_CODE_UNAUTH_ERROR, ERR_TEXT_UNAUTH_ERROR);
  case 'insufficient-rights':
    return sendRes(ERR_CODE_FORBIDDEN, ERR_TEXT_INSUFFICIENT_RIGHTS);
  case 'conflict-email':
    return sendRes(ERR_CODE_CONFLICT, ERR_TEXT_CONFLICT_EMAIL);
  case 'token_not_provided':
    return sendRes(ERR_CODE_UNAUTH_ERROR, ERR_TEXT_TOKEN_NOT_PROVIDED);
  case 'invalid-token':
    return sendRes(ERR_CODE_UNAUTH_ERROR, ERR_TEXT_INVALID_TOKEN);
  default:
    return sendRes(ERR_CODE_DEFAULT, ERR_TEXT_DEFAULT);
  }
}
