import mongoose from 'mongoose';
import logErrorMessage from './log-error-message';

export default async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb');
    console.log('Connected to "mestodb".');
  } catch (error: unknown) {
    logErrorMessage(error);
  }
}
