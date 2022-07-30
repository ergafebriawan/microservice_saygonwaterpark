const config = require('../config/database');
const mysql = require('mysql')
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    seluruhPengunjung(req, res){
        const from = req.body.from;
        const to = req.body.to;
        const sql = "SELECT itempenjualan.qty, itempenjualan.subtotal FROM (penjualan INNER JOIN itempenjualan ON itempenjualan.kode=penjualan.kode) WHERE penjualan.tanggal BETWEEN '"+from+"' AND '"+to+"';";
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(sql, function (error, results) {
                if(error) throw error; 
                var total = 0;
                var pendapatan = 0;
                for(i = 0; i <results.length; i++){
                    total = total + results[i].qty;
                    pendapatan = pendapatan + results[i].subtotal;
                 }
                return res.status(200).json({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: {
                        pengunjung: total,
                        pendapatan: pendapatan
                    }
                });
            });
            connection.release();
        });
    },
    pengunjungByTicket(req, res){
        const ticket = req.body.ticket;
        const from = req.body.from;
        const to = req.body.to;
        const sql = "SELECT itempenjualan.qty, itempenjualan.subtotal FROM (penjualan INNER JOIN itempenjualan ON itempenjualan.kode=penjualan.kode) WHERE CONVERT(CAST(itempenjualan.kode_barang AS BINARY) USING utf8) ='"+ticket+"' AND penjualan.tanggal BETWEEN '"+from+"' AND '"+to+"';";
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(sql, function (error, results) {
                if(error) throw error; 
                var total = 0;
                var pendapatan = 0;
                for(i = 0; i <results.length; i++){
                    total = total + results[i].qty;
                    pendapatan = pendapatan + results[i].subtotal;
                 }
                res.json({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: {
                        pengunjung: total,
                        pendapatan: pendapatan
                    }
                });
            });
            connection.release();
        });
    },
    pengunjungByKategori(req, res){
        const category = req.body.category;
        const from = req.body.from;
        const to = req.body.to;
        const sql = "SELECT itempenjualan.qty, itempenjualan.subtotal FROM itempenjualan LEFT JOIN penjualan ON itempenjualan.kode=penjualan.kode LEFT JOIN barang ON itempenjualan.nama_barang=barang.nama WHERE CONVERT(CAST(barang.kategori AS BINARY) USING utf8) = '"+category+"' AND penjualan.tanggal BETWEEN '"+from+"' AND '"+to+"';";
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(sql, function (error, results) {
                if(error) throw error;
                var total = 0;
                var pendapatan = 0;
                for(i = 0; i <results.length; i++){
                    total = total + results[i].qty;
                    pendapatan = pendapatan + results[i].subtotal;
                 }
                return res.status(200).json({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: {
                        pengunjung: total,
                        pendapatan: pendapatan
                    }
                });
            });
            connection.release();
        });
    },
}