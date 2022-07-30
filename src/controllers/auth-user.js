const config = require('../config/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);
const md5 = require('md5');
const jwt = require('jsonwebtoken');


pool.on('error', (err) =>{
    console.error(err);
});

module.exports = {
    getLogin(req, res){
        const username = req.body.kode;
        const password = md5(req.body.password);
        const sql = "SELECT password, kode, nama, level FROM karyawan WHERE CONVERT(CAST(nama AS BINARY) USING utf8) = ?;";
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(sql,[username], function (error, results) {
                if(results.length == 0){
                    return res.status(404).json({ 
                        success: false, 
                        message: 'user belum ada..'
                    });
                }else{
                    if(results[0].password == password){
                        const nama = results[0].nama;
                        const kode = results[0].kode;
                        const level = results[0].level;

                        const accessToken = jwt.sign({nama, kode, level}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "2000"});
                        res.cookie("token", accessToken, {
                            httpOnly: true,
                            maxAge: 24 * 60 * 60 * 1000,
                        });

                        return res.status(200).json({ 
                            success: true, 
                            message: 'Berhasil login..',
                            data: {
                                token:accessToken, 
                                nama: nama,
                                kode: kode,
                                level: level
                            }
                        });
                    }else{
                        return res.status(400).json({ 
                            success: false, 
                            message: 'password invalid..'
                        });
                    }
                }
            });
            connection.release();
        })  
    },
    getAllUser(req, res){
        const sql = "SELECT nama,kode,level FROM karyawan;";
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
    }
}