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
const appCounter = require('./src/routes/route-counter');
app.use('/', appRoute);
app.use('/api/counter/', appCounter);

app.listen(process.env.PORT, ()=>{
    console.log('Server Berjalan di Port : '+process.env.PORT);
});