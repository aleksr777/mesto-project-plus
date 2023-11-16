import mongoose from 'mongoose';
import logError from './log-error';

export default async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb');
    console.log('Connected to "mestodb".');
  } catch (error: unknown) {
    logError(error);
  }
}
