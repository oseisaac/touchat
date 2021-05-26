const express = require('express')
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');


const port = process.env.PORT || 3000;


//Express engine
app.engine('hbs',hbs({
    extname:'hbs',
    defaultLayout:'layout',
    layoutsDir: __dirname + '/views/layouts/'
}));


app.set('view engine','hbs');
app.use(express.static('public'))

app.use("/css",express.static(__dirname + '/public/css'))
app.use("/images",express.static(__dirname + '/public/images'))
app.use(favicon(__dirname + '/public/images/favicon.ico'));

const urlencodeParser = bodyParser.urlencoded({extended:false})


//GET methods
app.get('/chatroom/:id', (req, res) => {
  let id = req.params.id;
  let name = req.query.name;
  res.render('chatroom',{
    title: id,
    style:"../css/chat-style.css",
    image:'../images/logo.png',
    name: name
    
  })
});
app.get('/chatroom/', (req, res) => {
  let id = req.query.chatid;
  let name = req.query.name;
  res.render('chatroom',{
    title:id,
    style:"/css/chat-style.css",
    image:'images/logo.png',
    name: name
    
  })
});
app.get('/', (req, res) => {
  res.render('index',{
    title:'Touchat',
    style:"/css/index-style.css"
    
  })
});

//Socket.io connections

io.on('connection', (socket) => {
  
  
  socket.on('room', function(room) {
    socket.join(room);
    socket.on('chat message', msg => {
      io.to(room).emit('chat message', msg);
    });
   
});

});


http.listen(port, () => {
  console.log(`Sever is running at http://localhost:${port}/`);
});
