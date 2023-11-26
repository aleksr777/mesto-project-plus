import { Response } from 'express';
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
'invalid-token' |
'w';

export default function handleErrors(res: Response, errorType?: ErrorType) {
  switch (errorType) {
  case 'validation':
    return res.status(ERR_CODE_BAD_REQUEST).json({ error: ERR_TEXT_INVALID_DATA });
  case 'cast':
    return res.status(ERR_CODE_BAD_REQUEST).json({ error: ERR_TEXT_INVALID_ID });
  case 'not-found-id':
    return res.status(ERR_CODE_NOT_FOUND).json({ error: ERR_TEXT_NOT_FOUND_BY_ID });
  case 'not-found-page':
    return res.status(ERR_CODE_NOT_FOUND).json({ error: ERR_TEXT_NOT_FOUND_PAGE });
  case 'unauth':
    return res.status(ERR_CODE_UNAUTH_ERROR).json({ message: ERR_TEXT_UNAUTH_ERROR });
  case 'token_not_provided':
    return res.status(ERR_CODE_UNAUTH_ERROR).json({ error: ERR_TEXT_TOKEN_NOT_PROVIDED });
  case 'invalid-token':
    return res.status(ERR_CODE_UNAUTH_ERROR).json({ error: ERR_TEXT_INVALID_TOKEN });
  case 'insufficient-rights':
    return res.status(ERR_CODE_FORBIDDEN).json({ error: ERR_TEXT_INSUFFICIENT_RIGHTS });
  case 'conflict-email':
    return res.status(ERR_CODE_CONFLICT).json({ message: ERR_TEXT_CONFLICT_EMAIL });
  default:
    return res.status(ERR_CODE_DEFAULT).json({ error: ERR_TEXT_DEFAULT });
  }
}
