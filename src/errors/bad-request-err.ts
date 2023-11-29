import { ERR_CODE_BAD_REQUEST } from '../constants/http-codes';
import { ERR_TEXT_INVALID_DATA } from '../constants/error-text';
import { extError } from '../types/ext-error';

class BadRequestErr extends Error implements extError {
  statusCode: number;

  constructor(message: string = ERR_TEXT_INVALID_DATA) {
    super(message);
    this.statusCode = ERR_CODE_BAD_REQUEST;
  }
}

export default BadRequestErr;
