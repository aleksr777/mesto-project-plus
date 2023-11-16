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

export default errorMessages;
