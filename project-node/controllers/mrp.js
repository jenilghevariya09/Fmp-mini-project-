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
    const msg_forgot_password = "forgot password successfully. please check your email inbox"
    const msg_email_send = "Email send Successfully"

    app.post('/api/admin/mrplist', (req, res) => {
        helper.Dlog(req.body)
        var reqObj = req.body;
        helper.CheckParameterValid(res, reqObj, ['access_token', 'user_id'], () => {
            db.query('SELECT pm.*,ud.name,ud.	email FROM stock_management.mrp_stock as pm inner join stock_management.user_detail_admin as ud on ud.user_id=pm.user_id', [reqObj.device_token, reqObj.user_id], (err, result) => {
                if (err) {
                    helper.ThrowHtmlError(err, res);
                    return
                }
                var response;
                if (result) {
                    response = {
                        "success": "true",
                        "status": "1",
                        "payload": result,
                        "message": msg_success
                    };

                    res.json(response)
                } else {
                    response = {
                        "success": "false",
                        "status": "1",
                        "message": msg_fail
                    };

                    res.json(response)
                }
            });
        });
    });

    app.post('/api/admin/mrpstocklist', (req, res) => {
        helper.Dlog(req.body)
        var reqObj = req.body;

        helper.CheckParameterValid(res, reqObj, ['access_token', 'user_id', 'type'], () => {
            let tbl = "party_stock_buy";
            if (reqObj.type == 1) {
                tbl = "party_stock_sell";
            }
            var sql = "SELECT psb.*,ud.first_name,ud.email,pm.name as party_name,pm.email as party_email,pm.mobile as party_mobile " +
                "FROM party_master as pm " +
                "inner join user_detail as ud on ud.user_id=pm.user_id " +
                "inner join " + tbl + " as psb on psb.party_id=pm.id ";
            if (reqObj.party_id) {
                sql += "where party_id=".reqObj.party_id;
            }

            db.query(sql, [reqObj.device_token, reqObj.user_id], (err, result) => {
                if (err) {
                    helper.ThrowHtmlError(err, res);
                    return
                }
                var response;
                if (result) {
                    response = {
                        "success": "true",
                        "status": "1",
                        "payload": result,
                        "message": msg_success
                    };

                    res.json(response)
                } else {
                    response = {
                        "success": "false",
                        "status": "1",
                        "message": msg_fail
                    };

                    res.json(response)
                }
            });
        });
    });



}