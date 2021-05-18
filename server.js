const express = require('express')
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.engine('hbs',hbs({
    extname:'hbs',
    defaultLayout:'layout',
    layoutsDir: __dirname + '/views/layouts/'
}));
app.set('view engine','hbs');

app.use("/css",express.static(__dirname + '/public/css'))

const urlencodeParser = bodyParser.urlencoded({extended:false})


app.get('/chatroom/:id', (req, res) => {
  let id = req.params.id;
  res.render('chatroom',{
    title:id,
    style:"../css/chat-style.css"
    
  })
});
app.get('/chatroom/', (req, res) => {
  let chatid = req.query.chatid;
  res.render('chatroom',{
    title:chatid,
    style:"/css/chat-style.css"
    
  })
});
app.get('/', (req, res) => {
  res.render('index',{
    title:'Touchat',
    style:"/css/index-style.css"
    
  })
});

io.on('connection', (socket) => {
  
  
  socket.on('room', function(room) {
    socket.join(room);
    socket.on('chat message', msg => {
      io.emit('chat message', msg);
    });
  console.log(room)
});

});

http.listen(port, () => {
  console.log(`Sever is running at http://localhost:${port}/`);
});