export default function logError(err: unknown) {
  if (err instanceof Error) {
    return console.error('Произошла ошибка: ', err.message);
  }
  // В случае, когда err не является экземпляром Error
  return console.error('Произошла неопределённая ошибка');
}
