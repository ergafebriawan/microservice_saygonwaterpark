const config = require('../config/database');
const mysql = require('mysql')
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    //total transaksi harian
    getDataTransaksi(req,res){
        let sql = "SELECT SUM(itempenjualan.subtotal) FROM penjualan INNER JOIN itempenjualan ON itempenjualan.kode = penjualan.kode WHERE tanggal=CURRENT_DATE;";
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(sql, function (error, results) {
                if(error) throw error;  
                res.json({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results 
                });
            });
            connection.release();
        })
    },

    getAllKasir(req, res){
        let sql= "SELECT PASSWORD, kode, nama, LEVEL FROM karyawan WHERE CONVERT(CAST(LEVEL AS BINARY) USING utf8) LIKE '%KS';";
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(sql, function (error, results) {
                if(error) throw error;  
                res.json({ 
                    success: true, 
                    message: 'mengambil data semua kasir',
                    data: results 
                });
            });
            connection.release();
        })
    }

    //total transaksi by tanggal

    //total transaksi by kasir

    //total transaksi by product
}