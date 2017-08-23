var Models =  require('../Models');

exports.insertData = function(model,data,callback)
{
    new Models[model](data).save(callback);
};

exports.getData = function(model,criteria,options,projection,callback)
{
    Models[model].find(criteria, projection,(err,data)=>
{
    callback(err,data);

})
}

exports.updateData = function (model , criteria , query , options , callback)
{
    Models[model].update(criteria , query , options,(err,d)=>
{
    console.log(err,d)
    callback(err,d);
})
}