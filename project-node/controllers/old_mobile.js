var helper = require('./../helpers/helpers')
var db = require('./../helpers/db_helpers')
var fs = require('fs')
var multiparty = require('multiparty')
var request = require('request')
const image_save_path = "./public/img/"

module.exports.controller = function (app, io, socket_list) {
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
    app.post('/api/admin/devicetoken', (req, res) => {
        helper.Dlog(req.body)
        var reqObj = req.body;
        helper.CheckParameterValid(res, reqObj, ['access_token', 'user_id'], () => {
            db.query('UPDATE `user_detail` SET `device_token`= ?  WHERE id=?', [reqObj.device_token, reqObj.user_id], (err, result) => {
                if (err) {
                    helper.ThrowHtmlError(err, res);
                    return
                }
                var response;
                if (result['affectedRows'] == 1) {
                    response = {
                        "success": "true",
                        "status": "1",
                        "message": "Token update sucessfully"
                    };
                    res.json(response)
                } else {
                    response = {
                        "success": "false",
                        "status": "0",
                        "message": "Invalid User ID"
                    };
                    res.json(response)
                }
            });
        });
    });

    app.post('/api/admin/old_mobile', (req, res) => {
        helper.Dlog(req.body)
        var reqObj = req.body;
        helper.CheckParameterValid(res, reqObj, ['access_token'], () => {
            db.query('INSERT INTO  `old_mobile` (`user_id`,`id`,`party_name`,`mobile_no`,`Bill_details`,`id_proof_detail`,`model_no`,`imei_no`,`purchase_price`) VALUES (?,?,?,?,?,?,?,?,?)', [reqObj.user_id,reqObj.id,reqObj.party_name,reqObj.mobile_no,reqObj.Bill_details,reqObj.id_proof_detail,reqObj.model_no,reqObj.imei_no,reqObj.purchase_price], (err, result) => {
                if (err) {
                    debugger
                    helper.ThrowHtmlError(err, res);
                    return
                }
                var response;
                if (result) {
                    response = {
                        "success": "true",
                        "status": "1",
                        "message": "insert sucessfully"
                    };
                    debugger
                    res.json(response);
                } else {
                    response = {
                        "success": "false",
                        "status": "0",
                        "message": "Invalid insert"
                    };
                    debugger
                    res.json(response);
                }
            });
        });
    });

    app.post('/api/admin/old_mobilelist', (req, res) => {
        helper.Dlog(req.body)
        var reqObj = req.body;
        helper.CheckParameterValid(res, reqObj, ['access_token', 'user_id'], () => {
            db.query('select * from old_mobile', [], (err, result) => {
                debugger
                if (err) {
                    helper.ThrowHtmlError(err, res);
                    return
                }
                var response;
                if (result) {
                   
                    response = {
                        "success": "true",
                        "status": "1",
                        "message": "data get success",
                        data:result
                    };
debugger
                    res.json(response);
                } else {
                    response = {
                        "success": "false",
                        "status": "0",
                        "message": "Invalid data"
                    };

                    res.json(response);
                }
            });
        });
debugger    
    });



    app.post('/api/admin/old_mobileupdate/:id', (req, res) => {
    helper.Dlog(req.body)
    var reqObj = req.body;
    var id = req.params.id;
    helper.CheckParameterValid(res, reqObj, ['access_token'], () => {
        db.query('UPDATE old_mobile SET  party_name=?,mobile_no=? , Bill_details=? , id_proof_detail=? , model_no=? , imei_no=? , purchase_price=?  WHERE id =?;', [reqObj.party_name, reqObj.mobile_no,reqObj.Bill_details, reqObj.id_proof_detail, reqObj.model_no, reqObj.imei_no,reqObj.purchase_price,id], (err, result) => {
            debugger
            if (err) {
                helper.ThrowHtmlError(err, res);
                return
            }
            var response;
            if (result) {
               
                response = {
                    "success": "true",
                    "status": "1",
                    "message": "update data successfully",
                    data:result
                };
debugger
                res.json(response);
            } else {
                response = {
                    "success": "false",
                    "status": "0",
                    "message": "data not update"
                };

                res.json(response);
            }
        });
    });
debugger    
});


app.post('/api/admin/old_mobiledelete/:id', (req, res) => {
    helper.Dlog(req.body)
    var reqObj = req.body;
    var id = req.params.id;
    helper.CheckParameterValid(res, reqObj, ['access_token'], () => {
        db.query('DELETE FROM old_mobile WHERE id =?;', [id], (err, result) => {
            debugger
            if (err) {
                helper.ThrowHtmlError(err, res);
                return
            }
            var response;
            if (result) {
               
                response = {
                    "success": "true",
                    "status": "1",
                    "message": "deleted data successfully",
                    data:result
                };
    debugger
                res.json(response);
            } else {
                response = {
                    "success": "false",
                    "status": "0",
                    "message": "data not deleted try again"
                };

                res.json(response);
            }
        });
    });
    debugger    
});
}