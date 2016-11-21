'use strict';

var mongoConnect = require('../../../admin/mongoConnect');
var mongoose = require('mongoose');
var Profile = require('../models/profile.js');
var Todo = require('../models/todo.js');
var AppUser = require('../models/users.js');

var reqModels = [Profile, Todo, AppUser];

var updateRequiredModels = function (models) {
  return new Promise((resolve, reject) => {

    var requiredPaths = [];
    var resave = {};
    var i = 0;
    //per reqModels, find who has required properties,
    //and add those requiredPaths for tracking.
    models.map(function (model) {
      var tmp = {};
      tmp[model.modelName] = [];
      requiredPaths[i] = tmp;
      Object.keys(model.schema.paths).map((property) => {
        if(model.schema.paths[property].hasOwnProperty('isRequired')){
          requiredPaths[i][model.modelName].push(property);
        }
      });

      if(models.length - 1 === i){
        checkRequiredProperties();
      } else {
        i++;
      }
    });

    //when model map is finished
    //check requiredPaths, then look through the model
    //and check if the required property is not set on any record
    function checkRequiredProperties(){

      //requiredPaths
      console.log('required paths');
      console.log('_____________________________');
      console.log(JSON.stringify(requiredPaths, null, 3));
      console.log('_____________________________');
      var int = 0;
      var i = 0;
      requiredPaths.map((model) => {
        model[Object.keys(model)].map((value) => {
          var query = {};
          query[value] = {$exists:false};
          var q = reqModels[int].find(query);
          q.exec((err, result) => {
            if(err) reject(err);
          }).then(function(result){
            console.log(
              '\n\n\n' +
              Object.keys(model) +
              ', has ' + result.length + ' records that do not have the "' + value + '" property'
            );
            console.log('_____________________________');
            console.log(JSON.stringify(result, null, 3));
            console.log('_____________________________');

            if (result.length) {
              resaveRecords(result, int, reject, function(){
                int === (requiredPaths.length - 1) && i === (model[Object.keys(model)].length - 1) ? resolve() : i++;
              });
            } else {
              int === (requiredPaths.length - 1) && i === (model[Object.keys(model)].length - 1) ? resolve() : i++;
            }
          });
        });
        int < (requiredPaths.length - 1) ? int++ : null;
      })
    }

    //will resave each found record with missing required fields
    //but these fields must have appropriate defaults
    function resaveRecords(records, int, reject, cb){
      var i = 0;
      records.map((record) => {
        reqModels[int].findOne({_id:record._id}, function(err, found){
          found.save(function(err){
            if(err) reject(err);
          }).then(function(){
            if(i === (records.length - 1))
              console.log('done saving');
              cb();
            i++;
          });
        });
      });
    }
  });
};

mongoose.connection.on('connected', () => {
  updateRequiredModels(reqModels).then(() => {
    console.log('success');
    process.exit();
  }).catch((err) => {
    console.log('failure');
    console.log(err);
    process.exit(1);
  });
});
