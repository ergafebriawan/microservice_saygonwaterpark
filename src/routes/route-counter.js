const routerCounter = require('express').Router();
const {authentication, counter, counterToday} = require('../controllers');

//authentication 
routerCounter.get('/user-marketing', authentication.getUserMarketing);
routerCounter.post('/do-login', authentication.getLogin);

//counter today
routerCounter.post('/total-pengunjung', counterToday.seluruhPengunjung);
routerCounter.post('/pengunjung-byticket', counterToday.pengunjungByTicket);
routerCounter.post('/pengunjung-bycategory', counterToday.pengunjungByKategori);

//counter by date
routerCounter.post('/total-pengunjung', counter.seluruhPengunjung);
routerCounter.post('/pengunjung-byticket', counter.pengunjungByTicket);
routerCounter.post('/pengunjung-bycategory', counter.pengunjungByKategori);

module.exports = routerCounter;