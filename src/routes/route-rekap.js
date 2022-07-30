const router = require('express').Router();
const { transaksi, authentication, counter } = require('../controllers');

router.get('/', (req, res) => {
    res.send('Hello World!')
  }) 

router.get('/transaksi', transaksi.getDataTransaksi);
router.get('/all-kasir', transaksi.getAllKasir);

//login
router.post('/do-login', authentication.getLogin);

//get all user
router.get('/all-user', authentication.getAllUser);

//counter pengunjung
router.post('/total-pengunjung', counter.seluruhPengunjung);
router.post('/pengunjung-byticket', counter.pengunjungByTicket);
router.post('/pengunjung-bycategory', counter.pengunjungByKategori);


module.exports = router;