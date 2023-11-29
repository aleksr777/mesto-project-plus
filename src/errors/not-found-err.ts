import { ERR_CODE_NOT_FOUND } from '../constants/http-codes';
import { ERR_TEXT_NOT_FOUND_DATA } from '../constants/error-text';
import { extError } from '../types/ext-error';

class NotFoundErr extends Error implements extError {
  statusCode: number;

  constructor(message: string = ERR_TEXT_NOT_FOUND_DATA) {
    super(message);
    this.statusCode = ERR_CODE_NOT_FOUND;
  }
}

export default NotFoundErr;
