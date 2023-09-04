import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 3000;

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/mestodb');

// Получаем объект подключения для прослушивания событий
const db = mongoose.connection;

// Ошибка подключения
db.on('error', (error) => {
  console.error('Connection error:', error);
});

// Успешное подключение
db.once('open', () => {
  console.log('Connected to MongoDB successfully!');
});

// Подключение закрыто
db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
