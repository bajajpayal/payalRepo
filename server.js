const hapi = require('hapi');
const hapiswagger = require('hapi-swagger');
const vision  = require('vision');
const inert = require('inert');
const mongoose = require('mongoose');
const Controller = require('./Controller');
const routes = require('./Routes');
const joi = require('joi');

const Server = new hapi.Server();

const mongouri = 'mongodb://localhost:27017/mydatabase1';
const options = {
    info:{
        title:'API DOCUMENTATION',
        version:'1.0.0'
    }
};
Server.connection({
    port:3002,
    host:'localhost',
    routes:{
        cors:{
            origin:['*']
        }
    }
});

Server.register([
    inert,
    vision,
    {
        'register':hapiswagger,
        'options':options
    }
],(err,done)=>
{
    if(err)
        console.log("error in registering plugins");
    else
        console.log("successful registered plugins");
});



Server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {

        return reply({
            name: app.name,
            endpoint: app.host,
            port: app.port

        });
    }
}
);

Server.route(routes);

Server.start((err,connection)=>{
    if(err)
        console.log("error in connecting database",err);
    else
        {
            var db = mongoose.connect('mongodb://127.0.0.1:27017/test');
            mongoose.connection.once('connected', function(err) {
                if(err)
                    console.log("error in connecting database",err);
                else
                    console.log("successful connected");
            });
            }
});