var nodemailer = require("nodemailer");
var Client = require('../models/khachhang');


var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'giayneptt@gmail.com', // generated ethereal user
        pass: 'giayne123' // generated ethereal password
    }
});
module.exports.sendMail = function (req, res) {
    Client.findOne({ username: req.body.username }, function (err, client) {
        if (err) return res.json({ success: false, message: err });
        if (!client) return res.json({ success: false, message: 'Không tìm thấy khách hàng' });

        var mailOptions = {
            from: '"Giay Nè 👻" <giayneptt@gmail.com>',
            to: client.email, // list of receivers
            subject: "Đặt hàng thành công", // Subject line
            html: "<h1>Xin chào bạn " + client.name + "</h1>" +
                "<br><p>Đơn hàng bạn đặt vào ngày " + req.body.date + " đã xác nhận thành công</p>" +
                "<br><br><h5>Để xem chi tiết, vui lòng nhấn vào<a href='https://localhost:4200/chi-tiet-don-hang/" +
                req.body._id + "'> đây</a></h5>" // html body
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) return res.json({ success: false, message: err });
            return res.json({ success: true, message: 'Gửi thành công' });
        });
    });
}