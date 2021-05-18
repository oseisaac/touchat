/*
const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
*/
const express = require('express');
const hbs = require('express-handlebars');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
/*
app.engine('hbs',hbs({
    extname:'hbs',
    defaultLayout:'layout',
    layoutsDir: __dirname + '/views/layouts/'
}));
app.set('view engine','hbs');

app.use("/css",express.static(__dirname + '/public/css'))

const urlencodeParser = bodyParser.urlencoded({extended:false})
const jsonParser = bodyParser.json();


//GET methods
app.get("/chatroom/:id",(req,res)=>{
    let id = req.params.id;
    res.render('chatroom',{
        title:id,
        style:"../css/chat-style.css"
        
    })
})
app.get("/chatroom",(req,res)=>{
    let id = req.params.id;
    res.render('chatroom',{
        title:id,
        style:"../css/chat-style.css"
        
    })
})
*/
app.get('/test', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  
  io.on('connection', (socket) => {
    socket.on('chat message', msg => {
      io.emit('chat message', msg);
    });
  });
  
/*
app.get("/",(req,res)=>{

    res.render('index',{
        title:"Chatroom",
        style:"css/index-style.css"
        
    })

})

//POST methods

app.post("/chatroom",urlencodeParser,(req,res)=>{
    let chatName = req.body.chatid
    res.render('chatroom',{
        title:chatName,
        style:"css/chat-style.css"
        
    })

})



*/

app.listen(port)