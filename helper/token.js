var seperator = "|wesleybooktown|";

var generate = function(data) {
 //Puts together values of the password, seperator, and phoneNumber
 var token = data.password + seperator + data.email;
 // initilize buffer object
 
 var buff = new Buffer(token);
 // encode the token
 var base64Token = buff.toString('base64');
 //Returns generated base64Token String
 console.log(base64Token)
 return base64Token;
};

module.exports = {
    "generate" : generate
}