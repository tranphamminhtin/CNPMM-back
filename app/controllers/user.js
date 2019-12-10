var Model = require('../models/user');
var Client = require('../models/khachhang');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var bcrypt = require('bcrypt-nodejs');

// super secret for creating tokens
var superSecret = config.secret;

var createToken = function (user) {
    var token = jwt.sign({
        quyen: user.quyen,
        username: user.username,
        userId: user._id
    }, superSecret, {
        expiresIn: '5s'
    });
    return token;
}

module.exports.getList = function (req, res) {
    Model.find(function (err, users) {
        if (err) return res.json({ success: false, message: err });

        // return the users
        return res.json({ success: true, message: users });
    });
}

module.exports.add = function (req, res) {
    var user = new Model();      // create a new instance of the User model
    user.username = req.body.username;  // set the users username (comes from the request)
    user.password = req.body.password;  // set the users password (comes from the request)
    user.quyen = req.body.right;  // set the users name (comes from the request)

    user.save(function (err) {
        if (err) {
            // duplicate entry
            if (err.code == 11000)
                return res.json({ success: false, message: 'Tên đăng nhập đã tồn tại! ' });
            else
                return res.json({ success: false, message: err });
        }
        // return a message
        return res.json({ success: true, message: 'User created!' });
    });
}

module.exports.search = function (req, res) {
    Model.findOne({
        username: req.params.username
    }).exec(function (err, user) {
        if (err) return res.json({ success: false, message: err });
        if(!user) return res.json({ success: false, message: 'Trống' });
        return res.json({ success: true, message: user });
    });
}

module.exports.update = function (req, res) {
    Model.findOne({
        username: req.params.username
    }).select("username password").exec(function (err, user) {
        if (err) return res.json({ success: false, message: err });
        if (!user) return res.json({ success: false, message: 'Người dùng không tồn tại' });
        var validPassword = user.comparePassword(req.body.oldpassword);
        if (!validPassword) {
            return res.json({
                success: false,
                message: 'Sai mật khẩu'
            });
        } else {
            if (req.body.password) user.password = req.body.password;
            else return res.json({ success: false, message: 'pass cũ trống' });
        }
        user.save(function (err) {
            if (err) return res.json({ success: false, message: err });
            // return a message
            return res.json({ success: true, message: 'Đổi mật khẩu thành công' });
        });
    });
};

module.exports.delete = function (req, res) {
    Model.remove({
        username: req.params.username
    }, function (err, user) {
        if (err) return res.json({ success: false, message: err });
        return res.json({ success: true, message: 'Xóa thành công' });
    });
};

// module.exports.fb = function (req, res) {
//     Model.findOne({
//         facebookId: req.params.id
//     }, function (err, user) {
//         if (err) return res.json({ success: false, message: err });
//         if(!user) return res.json({success: false, message:'Trống'});
//         var token = jwt.sign({
//             quyen: user.quyen,
//             username: user.username,
//             userId: user._id
//         }, superSecret, {
//             expiresIn: '24h'
//         });
//         return res.json({ success: true, username: user.username, token: token });
//     });
// };

// module.exports.gg = function (req, res) {
//     Model.findOne({
//         googleId: req.params.id
//     }, function (err, user) {
//         if (err) return res.json({ success: false, message: err });
//         if(!user) return res.json({success: false, message:'Trống'});
//         var token = jwt.sign({
//             quyen: user.quyen,
//             username: user.username,
//             userId: user._id
//         }, superSecret, {
//             expiresIn: '24h'
//         });
//         return res.json({ success: true, username: user.username, token: token });
//     });
// };

module.exports.login = function (req, res) {
    // console.log(req.body.username);
    let quyen = parseInt(req.params.right);

    // find the user
    Model.findOne({
        username: req.body.username,
        quyen: quyen
    }).select("username password quyen").exec(function (err, user) {

        if (err) return res.json({ success: false, message: err });;
        // no user with that username was found
        if (!user) {
            return res.json({
                success: false,
                message: 'Tên tài khoản k tồn tại'
            });
        } else if (user) {
            // check if password matches
            var validPassword = user.comparePassword(req.body.password);
            if (!validPassword) {
                return res.json({
                    success: false,
                    message: 'Sai mật khẩu'
                });
            } else {
                // if user is found and password is right
                // create a token
                var token = createToken(user);
                return res.json({
                    success: true,
                    message: 'Đăng nhập thành công',
                    token: token
                });
            }
        }
    });
}

module.exports.fb = function (req, res) {
    Model.findOne({ facebookId: req.body.id }, function (err, user) {
        if (err) return res.json({ success: false, message: err });
        if (user) {
            var token = createToken(user);
            return res.json({ success: true, username: user.username, token: token });
        } else {
            var newUser = new Model();
            newUser.username = req.body.id + 'fb';
            bcrypt.hash(req.body.id, null, null, function (err, result) {
                if (err) console.log(err);
                newUser.password = result;
            });
            newUser.quyen = 1;
            newUser.facebookId = req.body.id;
            newUser.save(function (err, nu) {
                if (err) {
                    return res.json({ success: false, message: err });
                }
                var client = new Client();
                client.username = nu.username;
                client.name = req.body.name;
                client.email = req.body.email;
                client.save(function (err) {
                    if (err) return res.json({ success: false, message: err });
                    var token = createToken(nu);
                    return res.json({ success: true, username: nu.username, token: token });
                });
            });
        }
    });
};

module.exports.gg = function (req, res) {
    Model.findOne({ googleId: req.body.id }, function (err, user) {
        if (err) return res.json({ success: false, message: err });
        if (user) {
            var token = createToken(user);
            return res.json({ success: true, username: user.username, token: token });
        } else {
            var newUser = new Model();
            newUser.username = req.body.id + 'gg';
            bcrypt.hash(req.body.id, null, null, function (err, result) {
                if (err) console.log(err);
                newUser.password = result;
            });
            newUser.quyen = 1;
            newUser.googleId = req.body.id;
            newUser.save(function (err, nu) {
                if (err) {
                    return res.json({ success: false, message: err });
                }
                var client = new Client();
                client.username = nu.username;
                client.name = req.body.name;
                client.email = req.body.email;
                client.save(function (err) {
                    if (err) return res.json({ success: false, message: err });
                    var token = createToken(nu);
                    return res.json({ success: true, username: nu.username, token: token });
                });
            });
        }
    });
};