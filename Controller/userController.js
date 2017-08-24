const Services = require('../Services');
  const async = require('async'); 
  const utils = require('../Utils');  
  const plugins = require('../Plugins');
  

  const signUp = function(data,callback)
  {
      let encryptPassword;
    async.series([
        function(cb)
        {
            if(utils.universalFunctions.isEmail(data.email))
                {
                    cb();
                }
                else{
                    cb('email is not valid');
                }
        },
        function(cb)
        {
            let tokenData = {
                email:data.email,
                name:data.name,
                password:data.password
            }
            var token = plugins.auth.generateToken(tokenData);
            data.token = token;
            cb();
        },
        function(cb)
        {
           utils.universalFunctions.encryptPassword(data.password,(err,hash)=>
        {
            if(err)
                cb(err);
         else{
            data.password = hash;
            cb();
         }
        });  
        },
        function(cb)
        {
            plugins.emailNotification.sendEmail('bajaj.payal27@gmail.com',(err,d)=>
        {
            console.log(err,d);
            if(err)
                cb(err);
            else
                cb();
        })
        },
        function(cb)
        {
            console.log(Services.dbCommonServices);
            Services.dbCommonServices.insertData("user", data, (err,data)=>
                {
                    if(err)
                        {
                            cb(err);
                        }
                        else{
                            cb(null,data);
                        }
                })
        }
    ],(err,result)=>
        {
            if(err)
                {
                    callback(err);
                }
                else{
                    callback(null,result);
                }
        })
  };

  const login = function(data,callback)
  {
      let encryptPassword;
      const criteria = {
        email : data.email,
        token:data.accessToken,
        isDeleted: false,
        isVerified : true
    }
    async.series([
        function(cb)
        {
            plugins.auth.checkToken(data.accessToken,(err,verified)=>
        {
            console.log(err,verified);
            if(err)
                cb(err);
            else
                cb();
        });
        },
        function(cb)
        {
           
            Services.dbCommonServices.getData("user", criteria, {},{}, (err,result)=>
        {
            if(err)
                cb(err)
            else
                {
                    encryptPassword = result[0].password;
                    cb();
                }
               
        } )
        },
        function(cb)
        {
            utils.universalFunctions.comparePassword(data.password , encryptPassword , (err,result)=>
        {
            console.log(err,"eroororoor");
            if(err)
                cb(err)
            else if(result)
            {
                console.log(err,result,"knvdjkbvdjbvd")
                    cb()
            }
            else
                {
                    cb('password is not matched');
                }
        })
        },
        function(cb)
        {
            Services.dbCommonServices.getData("user", criteria, {}, { password : 0 , __v : 0 , isDeleted : 0 , isVerified : 0 , createdAt : 0 , updatedAt : 0}, (err,result)=>
            {
                if(err)
                    cb(err)
                else
                    {
                        cb(result);
                    }
                   
            } )
        }
    ],(err,result)=>
    {
        if(err)
            {
                callback(err);
            }
            else{
                callback(null,result);
            }
    })
  }

  var verifyEmail = function(payload , callback)
  {
    async.series ([
        function(cb)
        {
            Services.dbCommonServices.getData("user", { _id : payload.userId }, {}, {}, (err,result)=>
            {
                if(err)
                    cb(err)
                else
                    {
                        cb();
                    }
                   
            } )
        },
        function(cb)
        {
            const criteria = {
                _id : payload.userId ,
                isDeleted : false
            }
            const query = {
                $set : {
                    isVerified : true
                }
            }
            const options = {
                lean:true,
                new :true
            }
            Services.dbCommonServices.updateData("user", criteria , query , {} , (err,result)=>
            {
                if(err)
                    cb(err)
                else
                    {
                        cb(result);
                    }
                   
            } )
        }

    ],(err,result)=>
    {
        if(err)
            {
                callback(err);
            }
            else{
                callback(null,result);
            }
    })
  }


  var getUserData = function(callback)
  {
    Services.dbCommonServices.getData("user", {}, {},{},(err,result)=>
    {
        if(err)
            {
                callback(err);
            }
            else{
                callback(null,result);
            }
    })
  }
  module.exports = {
      signUp : signUp,
      login : login,
      verifyEmail : verifyEmail, 
      getUserData : getUserData
  }