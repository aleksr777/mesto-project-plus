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
};

export const handleDefaultError = (res: Response) => {
  res.status(errorMessages.default.code).json({ error: errorMessages.default.text });
};

export const handleValidationError = (res: Response) => {
  res.status(errorMessages.invalidData.code).json({ error: errorMessages.invalidData.text });
};

export const handleCastError = (res: Response) => {
  res.status(errorMessages.invalidId.code).json({ error: errorMessages.invalidId.text });
};

export const handleNotFoundError = (res: Response) => {
  res.status(errorMessages.notFoundById.code).json({ error: errorMessages.notFoundById.text });
};
