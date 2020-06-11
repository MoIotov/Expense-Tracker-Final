const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
//kolory są czysto dla lepszego widoku
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');


//wskazanie ścieżki konfiguracji
dotenv.config({ path: './config/config.env' });

connectDB();

const transactions = require('./routes/transactions');
//Initialize App
const app = express();

app.use(express.json());

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/transactions', transactions);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

//Wskazanie portu backendu, wskazanie portu 5000 jeśli z jakiegoś powodu nie może go znaleść
const PORT = process.env.PORT || 5000;

//Informacja o wystartowaniu servera w konsoli 
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

