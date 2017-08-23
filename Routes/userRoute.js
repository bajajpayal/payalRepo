const joi = require('joi');
const Controller = require('../Controller');

module.exports = [
    {
    method: 'POST',
    path : '/user/signUp',
    handler:(request,response)=>
    {
        Controller.userController.signUp(request.payload,(err,data)=>
            {
                if(err)
                    {
                        response(err);
                    }
                    else{
                        response(data);
                    }
            })
    },
    config:{
        tags:['api'],
        description:'sign up api ',
        validate:{
            payload:{
                name:joi.string().required(),
                password:joi.string().min(6).max(20).required(),
                email:joi.string().required(),
                phoneNo:joi.number()
            }
        },
        plugins:{
            'hapi-swagger':{
                payloadType : 'form'
            }
        }
    }
},

{
    method: 'POST',
    path : '/user/login',
    handler:(request,response)=>
    {
        Controller.userController.login(request.payload,(err,data)=>
            {
                if(err)
                    {
                        response(err);
                    }
                    else{
                        response(data);
                    }
            })
    },
    config:{
        tags:['api'],
        description:'login api',
        validate:{
            payload:{
                accessToken:joi.string().required(),
                email:joi.string().required(),
                password:joi.string().min(6).max(20).required()
                
            }
        },
        plugins:{
            'hapi-swagger':{
                payloadType : 'form'
            }
        }
    }
},
{
    method: 'POST',
    path : '/user/verifyEmail',
    handler:(request,response)=>
    {
        Controller.userController.verifyEmail(request.payload,(err,data)=>
            {
                if(err)
                    {
                        response(err);
                    }
                    else{
                        response(data);
                    }
            })
    },
    config:{
        tags:['api'],
        description:'login api',
        validate:{
            payload:{
                accessToken:joi.string().required(),
                userId:joi.string().required()
                
            }
        },
        plugins:{
            'hapi-swagger':{
                payloadType : 'form'
            }
        }
    }
}
];
