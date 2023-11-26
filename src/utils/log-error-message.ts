export default function logErrorMessage(err: unknown) {
  if (err instanceof Error) {
    return console.error('Ошибка сервера: ', err.message);
  }
  // В случае, когда err не является экземпляром Error
  return console.error('Неопределённая ошибка сервера!');
}
