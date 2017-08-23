const validator  = require('validator');
const bcrypt = require('bcrypt');

var isEmail = function(email) {
    return validator.isEmail(email);
};

var encryptPassword = function(password,callback)
{
    bcrypt.genSalt(10,(err,salt)=>
{
    if(err)
        console.log(err);
    else{
        bcrypt.hash(password,salt,(err,hash)=>
    {
        callback(err,hash);
    })
    }
})
}

var comparePassword = function(plaintext,hash,callback)
{
    bcrypt.compare(plaintext,hash,(err,mathched)=>
{
    return err == null ?
    callback(null, mathched) :
    callback(err);
})
}

module.exports = {
    isEmail : isEmail,
    encryptPassword : encryptPassword,
    comparePassword : comparePassword
}
