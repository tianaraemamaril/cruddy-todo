const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};
var hi;

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {   
    var filePath = path.join(exports.dataDir, id + '.txt');
  fs.writeFile(filePath, text, (err) => {
    if(err){
      callback(err);
    } else {
      callback(null, {id: id, text: text});
    }
  });
});
  // var id = counter.getNextUniqueId();
  // items[id] = text;
  // callback(null, { id, text });
};

exports.readAll = (callback) => {
  fs.readdir(exports.dataDir, (err, data){
    if(err){
      callback(err);
    }
    var data = _.map(files, (file) => {
     
    })
  })


  // fs.readFile()
  // readCounter                      
  // var data = [];
  // _.each(items, (text, id) => {
  //   data.push({ id, text: id });
  // });
  // callback(null, data);
};

exports.readOne = (id, callback) => {
  if(!id){
    throw Error;
  } else {
  var filePath = path.join(exports.dataDir, id + '.txt')
  fs.readFile(filePath, 'utf-8', (err, fileData) => {
     if(err){
       callback(err);
     } else {
       callback(null, {id:id , text: fileData});
     }
    }
  );
}
};

exports.update = (id, text, callback) => {
  var filePath = path.join(exports.dataDir, id + '.txt')
  if(!id){
    throw Error;
  } else {
    fs.readFile(filePath, 'utf-8', (err, fileData) => {
      if(!fileData){
        callback(err);
      } else {
        fs.writeFile(filePath, text, (err) => {
          if(err){
            callback(err)
          } else {
            callback(null, {id: id , text: text})
          }
        })
      }
    })
  }
};

exports.delete = (id, callback) => {
  var filePath = path.join(exports.dataDir, id + '.txt');
  if(!id) {
    throw Error;
  } else {
    fs.unlink(filePath, (err) => {
      if(err) {
        callback(err);
      } else {
        callback();
      }
    });
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
