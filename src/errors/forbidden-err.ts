import { ERR_CODE_FORBIDDEN } from '../constants/http-codes';
import { ERR_TEXT_INSUFFICIENT_RIGHTS } from '../constants/error-text';
import { extError } from '../types/ext-error';

class ForbiddenErr extends Error implements extError {
  statusCode: number;

  constructor(message: string = ERR_TEXT_INSUFFICIENT_RIGHTS) {
    super(message);
    this.statusCode = ERR_CODE_FORBIDDEN;
  }
}

export default ForbiddenErr;
