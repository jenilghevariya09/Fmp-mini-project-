var helper = require('./../helpers/helpers')
var db = require('./../helpers/db_helpers')
var fs = require('fs')
var multiparty = require('multiparty')
var request = require('request')
const image_save_path = "./public/img/"

module.exports.controller = function(app, io, socket_list) {
    //String value
    const msg_success = "successfully"
    const msg_fail = "fail"
    const msg_login_other_device = "Login other device"
    const msg_invalid_user_password = "invalid username or password"
    const msg_user_already_exits = "Already Exist."
    const msg_already_exits = "Email Already Exist."
    const msg_invalid_user = "invalid user"
    const msg_otp_code_fail = "Invalid OTP Code"
    const msg_otp_code = "OTP verify successfully"
    const msg_forgot_password = "forgot password successfully. please check your email inbox"
    const msg_email_send = "Email send Successfully"
    const msg_change_password = "Password change successfully"
    const msg_old_password_wrong = "Old password is wrong"
    const msg_user_success = "new user create successfully"
        // console.log("data");
    app.post('/api/admin/branchlogin', (req, res) => {
        helper.Dlog(req.body)
        var reqObj = req.body;
        helper.CheckParameterValid(res, reqObj, ['email', 'password', 'socket_id'], () => {

            var access_token = helper.create_request_token();
            helper.Dlog("access_token :-----------" + access_token);
            var sql = "";
            if (req.device_token) {
                sql = ",device_token=" + req.device_token;
            }
            debugger
            db.query('UPDATE `user_detail_branch` SET `access_token`= ?   WHERE `email` = ? AND `password` = ? AND `user_type`= 1', [access_token, reqObj.email, reqObj.password], (err, result) => {
                if (err) {
                    helper.ThrowHtmlError(err, res);
                    return
                }
                if (result['affectedRows'] == 1) {

                    db.query('SELECT `user_id`,`branch_name`, `contact_name`, `email`,`GST_number`,`address`, `mobile`, `access_token` FROM `user_detail_branch` WHERE `email` = ?', [reqObj.email], (err, result) => {
                        if (err) {
                            helper.ThrowHtmlError(err, res);
                            return
                        }
                        if (result.length == 1) {

                            // Other Deivce inLogin
                            var user_id = result[0].user_id;
                            if (socket_list['us_' + user_id] != null && io.sockets.connected[socket_list['us_' + user_id].socket_id]) {

                                helper.Dlog(' Other login ---------------------------- ' + socket_list['us_' + user_id].socket_id);
                                io.sockets.connected[socket_list['us_' + user_id].socket_id].emit('UpdateSocket', {
                                    "success": "false",
                                    "status": "0",
                                    "message": msg_login_other_device
                                });
                            }

                            socket_list['us_' + user_id] = {
                                'socket_id': reqObj.socket_id
                            };

                            response = {
                                "success": "true",
                                "status": "1",
                                "payload": result[0]
                            }
                        } else {
                            response = {
                                "success": "false",
                                "status": "0",
                                "message": msg_invalid_user_password
                            };
                        }
                        res.json(response)
                    });
                } else {
                    res.json({
                        "success": "false",
                        "status": "0",
                        "message": msg_invalid_user_password
                    })
                }
            })
        })
    })

    app.post('/api/user_image_upload', (req, res) => {
        var form = new multiparty.Form();
        helper.Dlog(req.body);
        form.parse(req, (err, fields, files) => {
            if (err) {
                helper.ThrowHtmlError(err, res);
                return
            }

            helper.CheckParameterValid(res, fields, ['access_token', "user_id"], () => {

                helper.CheckParameterValid(res, files, ["image"], () => {
                    console.log(files);
                    // console.log(res);
                    var image_name = "profile/" + helper.file_name_generate(files.image[0].originalFilename.substring(files.image[0].originalFilename.lastIndexOf(".") + 1));;
                    var new_path = image_save_path + image_name;

                    fs.copyFile(files.image[0].path, new_path, () => {
                        if (err) {
                            helper.ThrowHtmlError(err, res);
                            return
                        }
                        db.query("UPDATE `user_detail_branch` SET `image_name` = ? WHERE `user_id` = ?", [image_name, fields.user_id[0]], (err, result) => {
                            if (err) {
                                helper.ThrowHtmlError(err, res)
                                return
                            }
                            if (result.affectedRows > 0) {

                                res.json({
                                    "success": "true",
                                    "status": "1",
                                    "payload": [{ 'image': image_name }]
                                });

                            } else {
                                res.json({
                                    "success": "false",
                                    "status": "0",
                                    "message": msg_fail
                                });
                            }
                        })
                    })
                })
            })
        })
    })


    app.post('/api/admin/user_list_branch', (req, res) => {
        helper.Dlog(req.body);
        var reqObj = req.body;

        helper.CheckParameterValid(res, reqObj, ['user_id', 'access_token'], () => {
            db.query('SELECT * FROM `user_detail_branch` ', [], (err, result) => {
                if (err) {
                    helper.ThrowHtmlError(err, res);
                    return;
                }

                if (result.length > 0) {
                    console.log(result);
                    res.json({
                        'success': 'true',
                        'status': '1',
                        'payload': result
                    })
                } else {
                    res.json({
                        'success': 'false',
                        'status': '0',
                        'payload': []
                    })
                }
            })
        })
    })


    app.post('/api/registorUser', (req, res) => {
        var form = new multiparty.Form();
        helper.Dlog(req.body);

        form.parse(req, (err, fields, files) => {
            if (err) {
                helper.ThrowHtmlError(err, res);
                return
            }
            console.log(fields);
            //CREATE DEFINER=`root`@`%` PROCEDURE `insertNewUser`(first_name varchar(255),image_name varchar(225),password varchar(225),email varchar(100),access_token varchar(200),device_token varchar(200),user_type INT(11),is_deleted INT(3),mobile INT(15),status INT(3),address_1 varchar(225),address_2 varchar(225),last_name varchar(225),compony_name varchar(200),country varchar(100),zip_code varchar(200),city varchar(200),gst_no varchar(20),initial_balance INT(11),compony_logo varchar(225))


            // helper.CheckParameterValid(res, fields, ['company_name', 'first_name', 'last_name', 'email', 'gst_no', 'state', 'password', 'address_1', 'address_2', 'city', 'state', 'zipcode', 'country'], () => {
                // helper.CheckParameterValid(res, files, ["compony_logo"], () => {
                //     console.log(files);

                //     var image_name = "profile/" + helper.file_name_generate(files.image_name[0].originalFilename.substring(files.image_name[0].originalFilename.lastIndexOf(".") + 1));;
                //     var new_path = image_save_path + image_name;

                var encriptPass = helper.encrypt(fields.password[0]);

                //     fs.copyFile(files.image_name[0].path, new_path, () => {
                //         if (err) {
                //             helper.ThrowHtmlError(err, res);
                //             return
                //         }
                //         debugger;

                db.query("INSERT INTO `user_detail_branch` (`first_name`, `image_name`, `password`, `email`, `user_type`, `address_1`, `address_2`, `last_name`, `company_name`, `country`, `zipcode`, `gst_no`, `compony_logo`, `city`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [fields.first_name[0], "", encriptPass, fields.email[0], 0, fields.address_1[0], fields.address_2[0], fields.last_name[0], fields.compony_name[0], fields.country[0], fields.zipcode[0], fields.gst_no[0], '', fields.city[0]], (err, result) => {
                    if (err) {
                        helper.ThrowHtmlError(err, res);
                        return
                    }
                    if (result.affectedRows > 0) {

                        res.json({
                            "success": "true",
                            "status": "1",
                            "payload": [{ 'image': "" }],
                            "message": msg_success
                        });

                    } else {
                        res.json({
                            "success": "false",
                            "status": "0",
                            "message": msg_fail
                        });
                    }
                })
                // })
            // })
            // })
        })
    })
    


}