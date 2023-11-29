import { ERR_CODE_UNAUTH_ERROR } from '../constants/http-codes';
import { ERR_TEXT_UNAUTH_DEFAULT } from '../constants/error-text';
import { extError } from '../types/ext-error';

class UnauthErr extends Error implements extError {
  statusCode: number;

  constructor(message: string = ERR_TEXT_UNAUTH_DEFAULT) {
    super(message);
    this.statusCode = ERR_CODE_UNAUTH_ERROR;
  }
}

export default UnauthErr;
