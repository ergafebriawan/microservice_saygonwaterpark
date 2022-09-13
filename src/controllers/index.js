const transaksi = require('./transaksi-harian');
const authentication = require('./auth-user');
const counter = require('./counter-pengunjung');
const counterToday = require('./counter-today');

module.exports ={
	transaksi,
	authentication,
	counter,
	counterToday
};