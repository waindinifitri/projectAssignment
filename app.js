const express = require("express");
const app = express();
require("dotenv").config({path: '.env'});

const PORT = process.env.PORT || 4000;

const errorHandling = require('./middlewares/errorHandling')
const router = require('./routes');

// app.use('/', routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
	console.log(`This Server brought you by port : ${PORT}`);
});
