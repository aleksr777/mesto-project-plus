import { Response } from 'express';
import {
  ERR_CODE_DEFAULT,
  ERR_CODE_BAD_REQUEST,
  ERR_CODE_NOT_FOUND,
} from '../constants/http-codes';
import {
  ERR_TEXT_DEFAULT,
  ERR_TEXT_INVALID_ID,
  ERR_TEXT_INVALID_DATA,
  ERR_TEXT_NOT_FOUND_BY_ID,
  ERR_TEXT_NOT_FOUND_PAGE,
} from '../constants/error-text';

export function handleDefaultError(res: Response) {
  return res.status(ERR_CODE_DEFAULT)
    .json({ error: ERR_TEXT_DEFAULT });
}

export function handleValidationError(res: Response) {
  return res.status(ERR_CODE_BAD_REQUEST)
    .json({ error: ERR_TEXT_INVALID_DATA });
}

export function handleCastError(res: Response) {
  return res.status(ERR_CODE_BAD_REQUEST)
    .json({ error: ERR_TEXT_INVALID_ID });
}

export function handleNotFoundIdError(res: Response) {
  return res.status(ERR_CODE_NOT_FOUND)
    .json({ error: ERR_TEXT_NOT_FOUND_BY_ID });
}

export function handleNotFoundPageError(res: Response) {
  return res.status(ERR_CODE_NOT_FOUND)
    .json({ error: ERR_TEXT_NOT_FOUND_PAGE });
}
