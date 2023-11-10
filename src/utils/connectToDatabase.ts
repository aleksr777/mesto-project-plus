import mongoose from 'mongoose';

export async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb');
    console.log('Connected to "mestodb".');
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('An error occurred: ', err.message);
    } else {
      // Обработка случаев, когда err не является экземпляром Error
      console.error('An unknown error occurred');
    }
  }
}
