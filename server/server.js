'use strict';

const net = require('net');

const port = process.env.PORT || 3001;
const server = net.createServer();

server.listen(port, () => console.log(`Server up on ${port}`) );

let socketPool = {};
/**
 * event listener
 * @function anonymous function that fires during a connection event
 * 
 */
server.on('connection', (socket) => {
  const id = `Socket-${Math.random()}`;
  addSocket(socket, id);
  socket.on('data', (buffer) => dispatchEvent(buffer));
  socket.on('close', () => {
    deleteSocket(id);
  });
});

/**
 * @function dispatchEvent this fires an event 
 * @param {buffer} buffer data in buffer format
 */
let dispatchEvent = (buffer) => {
  let text = buffer.toString().trim();
  for (let socket in socketPool) {
    socketPool[socket].write(`${event} ${text}`);
  }
};

/**
 * @function addSocket this adds a new socket
 * @param  {object} socket
 * @param  {string} id 
 */
let addSocket = (socket, id) => {
  socketPool[id] = socket;
};

/**
 * @function deleteSocket this removes a socket
 * @param  {string} id
 */
let deleteSocket = (id) => {
  delete socketPool[id];
};

// First, modularize the server file so that it has functions addSocket, deleteSocket and dispatchEvent. Second, every time any Socket in the server's socket pool receives data, write (or "broadcast") that data to every other socket in the pool.


