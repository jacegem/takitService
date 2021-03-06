const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');
const config = require("../config");
const mariaDB = require("./mariaDB");

// auth
router.oauthSuccess=function(req,res){
	console.log("oauth success");
	
	/*		
	let url = decodeURI(req.url).split("userPhone=");
	console.log(url);
	let url2 = url[1].split("userName=");
	
	console.log(url2);		
	let userPhone = CryptoJS.AES.decrypt(url2[0],config.tomcat.uPhonePwd);
	console.log(userPhone.toString(CryptoJS.enc.Utf8));
   let userName = CryptoJS.AES.decrypt(url2[1],config.tomcat.uNamePwd);
   console.log(userName.toString(CryptoJS.enc.Utf8));
	*/

	res.send(JSON.stringify({"result":"oauth success"}));
};

router.oauthFailure=function(req,res){
	res.send(JSON.stringify({"result":"oauth failure"}));
};

router.validUserInfo=function(req,res){
   let userPhone = CryptoJS.AES.decrypt(decodeURI(req.body.userPhone),config.tomcat.uPhonePwd);
   console.log(userPhone.toString(CryptoJS.enc.Utf8));
   let userName = CryptoJS.AES.decrypt(decodeURI(req.body.userName),config.tomcat.uNamePwd);
   console.log(userName.toString(CryptoJS.enc.Utf8));

   mariaDB.validUserwithPhone(req.session.uid,userName.toString(CryptoJS.enc.Utf8),userPhone.toString(CryptoJS.enc.Utf8),function(err,result){
      if(err){
         console.log(err);
         res.send(JSON.stringify({"result":"failure"}));
      }else{
         console.log(result);
         res.send(JSON.stringify({"result":"success"}));
      }
   });
}


module.exports = router;
