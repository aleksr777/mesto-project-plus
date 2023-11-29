import { ERR_CODE_CONFLICT } from '../constants/http-codes';
import { ERR_TEXT_CONFLICT_DATA } from '../constants/error-text';
import { extError } from '../types/ext-error';

class ConflictErr extends Error implements extError {
  statusCode: number;

  constructor(message: string = ERR_TEXT_CONFLICT_DATA) {
    super(message);
    this.statusCode = ERR_CODE_CONFLICT;
  }
}

export default ConflictErr;
