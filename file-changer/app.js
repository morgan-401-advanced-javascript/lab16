'user strict';
const fs = require('fs');
const faker = require('faker');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const net = require('net');
const socket = new net.Socket();

let file = process.argv.slice(2).shift();


let config = {
  port: 3000,
  host: 'localhost',
};

/**
 * @function
 * ths listens for connect event 
 */
socket.on('connect', () => {
  console.log('Connected!');
});

/**
 * @function connect this connects to the tCP server
 * 
 */
socket.connect(config, () => {});

/**
 * function loadFile takes in a file path and reads the contents
 * @param {string} path file path
 * @returns {Promise<string>}  contents of file path 
 */
const loadFile = async (path)=>{
  try{
    return await readFile(path);
  } 
  catch(e){
    socket.write(`${e.name} + (${e.message})`);
  }

};
/**
 * function saveFile saves updates to our specified file
 * @param {string} file original file information
 * @param {string} path the path that we want to save
 * @param {string} data the data we want to save in the file
 * @returns {promise} 
 */
const saveFile = async (file, path, data)=>{
  try{
    return await writeFile(file, data);
  }
  catch(e){
    socket.write(`${e.name} + (${e.message})`);
  }
};
/**
 * @function alterFile will take in a file path and alter the contents using faker npm package
 * @param {string} path 
 * @returns {promise} 
 */
const alterFile = async (path)=>{
  let newData = faker.lorem.sentence();
  let data;
  try{
    data = await loadFile(path);
    data = newData;
    await saveFile(path, data);
    console.log(path);
    socket.write(`altered a file!`);
  }
  catch(e){
    socket.write(`${e.name} + (${e.message})`);
  }
};


alterFile(file);
