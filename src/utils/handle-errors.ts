import { Response } from 'express';

interface ErrorMessage {
  code: number;
  text: string;
}

const errorMessages: Record<string, ErrorMessage> = {
  default: {
    code: 500,
    text: 'Ошибка на сервере при обработке запроса',
  },
  invalidId: {
    code: 400,
    text: 'Некорректный формат _id',
  },
  invalidData: {
    code: 400,
    text: 'Переданы некорректные данные',
  },
  notFoundById: {
    code: 404,
    text: 'По указанному _id ничего не найдено',
  },
  notFoundPage: {
    code: 404,
    text: 'Error 404! Страница не найдена!',
  },
};

export function handleDefaultError(res: Response) {
  return res.status(errorMessages.default.code)
    .json({ error: errorMessages.default.text });
}

export function handleValidationError(res: Response) {
  return res.status(errorMessages.invalidData.code)
    .json({ error: errorMessages.invalidData.text });
}

export function handleCastError(res: Response) {
  return res.status(errorMessages.invalidId.code)
    .json({ error: errorMessages.invalidId.text });
}

export function handleNotFoundIdError(res: Response) {
  return res.status(errorMessages.notFoundById.code)
    .json({ error: errorMessages.notFoundById.text });
}

export function handleNotFoundPageError(res: Response) {
  return res.status(errorMessages.notFoundPage.code)
    .json({ error: errorMessages.notFoundPage.text });
}
