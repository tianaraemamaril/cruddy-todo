const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};
var hi;

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err,counterString) => {   
  fs.writeFile(`test/testData/${counterString}.txt`, text, (err) => {
    callback(null, text);
  });
});
  // var id = counter.getNextUniqueId();
  // items[id] = text;
  // callback(null, { id, text });
};

exports.readAll = (callback) => {
  // returning an array of todos to client app whenever a GET request to the collection route 
  // occurs. To do this, you will need to read the dataDir directory and build a list of files. 
  // Remember, the id of each todo item is encoded in its filename.
  //fs.readFile()
  //readCounter
  // var data = [];
  // _.each(items, (text, id) => {
  //   data.push({ id, text: id });
  // });
  // callback(null, data);
};

exports.readOne = (id, callback) => {
  fs.readFile(`./test/testData/${id}`, (err, fileData) => {
    var text = items[id]; // value of the file??
    // if(err)??
    if (!text) {
      callback(new Error(`No item with id: ${id}`));
    } else {;
      // deeply equal { Object (id, text) }
      callback(null, { id: id, text: fileData });
    }
  });
  
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
