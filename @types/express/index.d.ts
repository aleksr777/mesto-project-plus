import idType from '../../src/types/id-type';
/* eslint-disable no-unused-vars */
declare global {
  namespace Express {
    interface Request {
      user: {
        _id: idType;
      };
    }
  }
}
/* eslint-disable no-unused-vars */
