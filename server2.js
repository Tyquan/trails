var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression');
var session = require('express-session');

const Block = require("./classes/block");
const BlockChain = require("./classes/blockchain");

var initHttpServer = () => {
    var app = express();
    app.use(bodyParser.json());

    app.get('/blocks', (req, res) => res.send(JSON.stringify(Blockchain)));
    app.post('/mineBlock', (req, res) => {
        var newBlock = Blockchain.generateNextBlock(req.body.data);
        Blockchain.addBlock(newBlock);
        //broadcast(responseLatestMsg());
        console.log('block added: ' + JSON.stringify(newBlock));
        res.send();
    });
    // app.get('/peers', (req, res) => {
    //     res.send(sockets.map(s => s._socket.remoteAddress + ':' + s._socket.remotePort));
    // });
    // app.post('/addPeer', (req, res) => {
    //     connectToPeers([req.body.peer]);
    //     res.send();
    // });
    app.listen("3000", () => console.log('Listening http on port: 3000'));
};

initHttpServer();