import CryptoJS from "crypto-js";

//首先声明两个变量，加密的时候要用到，要和后台沟通，保持一致
const AES_KEY = '0000000000000000';


const IV = 'TRYTOCN394402133';
function encrypt(params) {
        var key = CryptoJS.enc.Utf8.parse(AES_KEY);
        var iv = CryptoJS.enc.Utf8.parse(IV);
        var jsonData = JSON.stringify(params);
        //下面的data参数要求是一个字符串，第一次用的时候我直接传递的是一个对象，出现了错误，要转换成字符串
        var data = CryptoJS.enc.Utf8.parse(jsonData);
        var encrypted = CryptoJS.AES.encrypt(data, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString();
        return encrypted;
    }

//然后就可以使用了，比如要加密的表单是下面的格式：

// var params = {
//         "txtValid":"1234",
//         "txtPwd":"admin",
//         "txtName":"admin",
//         "timestamp":"123456789"
//     };
// encrypt(params)//YLi/+YY1Ojd14ybMu6j68OZhO4HuDHAkE/iYEtqLly/RS3oIvxjca4IGUp8wM6MaxCj2ju7pMg20OGhWrl+SsIkg1CYR6p29FA2OJJLKNUY=


export default{
    decrypt:(params)=> {
        //解密
        var key = CryptoJS.enc.Utf8.parse(AES_KEY);
        // var iv = CryptoJS.enc.Utf8.parse(IV);
        var decrypt = CryptoJS.AES.decrypt(params, key, {
            // iv: iv,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8);
        console.log(decrypt)
        return decrypt ;
    }

} 

