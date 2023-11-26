import fs from 'fs';
import { Request, Response, NextFunction } from 'express';
import {
  ERR_TEXT_REQUEST_LOG_WRITE,
} from '../constants/error-text';
import handleErrors from '../utils/handle-errors';

const logRequest = async (req: Request, _res: Response, next: NextFunction) => {
  const log = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    body: req.body,
    query: req.query,
  };
  try {
    await fs.promises.appendFile('request.log', `${JSON.stringify(log)}\n`);
  } catch (error) {
    console.error(ERR_TEXT_REQUEST_LOG_WRITE, error);
  }
  next();
};

const logError = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errorLog = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    error: {
      message: err.message,
      stack: err.stack,
    },
  };
  try {
    await fs.promises.appendFile('error.log', `${JSON.stringify(errorLog)}\n`);
  } catch (error) {
    console.error(ERR_TEXT_REQUEST_LOG_WRITE, error);
  }
  if (!res.headersSent) {
    return handleErrors(res);
  }
  return next();
};

export { logRequest, logError };
