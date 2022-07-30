const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({credentials:true, origin:'http://localhost:3000'}));

const appRoute = require('./src/routes/route-rekap');
app.use('/', appRoute);

app.listen(process.env.PORT, ()=>{
    console.log('Server Berjalan di Port : '+process.env.PORT);
});