
const socket = io('')


var messages = document.getElementById('messages');
      var form = document.getElementById('form');
      var input = document.getElementById('input');

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (input.value) {
          socket.emit('chat message', input.value);
          input.value = '';
        }
      });

 
      
     

      socket.on('chat message', function(msg) {
        var item = document.createElement('li');
        item.textContent = msg;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
      });
      var peer = new Peer(ROOM_ID);
      

      peer.on('open', function(id) {
        console.log('My peer ID is: ' + id);
      });
      

      const videoArea= document.getElementById('video-area');
      const myVideo = document.createElement('video') 

      var videoState= true;
      var audioState = true;

    function startVideo(){
      navigator.mediaDevices.getUserMedia({
        video: videoState,
        audio: audioState
      }).then(stream => {
        addVideo(myVideo, stream) 
    
        peer.on('call', call => { 
            call.answer(stream) 
            const thatVideo = document.createElement('video') 
            call.on('stream', userVideoStream => { 
              addVideo(thatVideo, userVideoStream) 
            })
        })
    
        socket.on('user-connected', userId => { // If a new user connects
          console.log('debug')
          connectUser(userId, stream) 
        })
    })
  }
  startVideo()
    
    peer.on('open', id => { // When we first open the app, have us join a room
        socket.emit('room', ROOM_ID, id)
    })
    
    function connectUser(userId, stream) { 
        const call = peer.call(userId, stream) 
        // Add video to room
        const userVideo = document.createElement('video') 
        call.on('stream', userVideoStream => {
          addVideo(userVideo, userVideoStream)
        })
        // Remove video for user leaving
        call.on('close', () => {
            video.remove()
        })
    }
    
    //add video to stream
    function addVideo(video, stream) {
        video.srcObject = stream 
        video.addEventListener('loadedmetadata', () => { 
            video.play()
        })
        videoArea.append(video) 
    }


    //Disable and enable mic and video

    function changeVideoState(){
      var icon = document.getElementById('video')
      if(videoState==true)
      {
        videoState=false;
        icon.innerHTML='<i class="fas fa-video-slash" style="font-size:24px; "></i>';
      }
      else{
        videoState=true;
        icon.innerHTML='<i class="fa fa-video-camera" style="font-size:24px; "></i>';
      }  
      
      startVideo()

    }

    function changeAudioState(){
      var icon = document.getElementById('audio')
      if(audioState==true)
      {
        audioState=false;
        icon.innerHTML='<i class="fas fa-microphone-slash" style="font-size:24px;"></i>';
      }
      else{
        audioState=true;
        icon.innerHTML='<i class="fa fa-microphone" style="font-size:24px;"></i>';
      }  
      startVideo()
      
    }
    
    
const socket = io()

// Join chatroom
socket.emit('joinRoom', ROOM_ID);
console.log("roomid ", ROOM_ID)

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});





socket.on('chat message', function (msg) {
  var item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
var peer = new Peer(ROOM_ID);


peer.on('open', function (id) {
  console.log('My peer ID is: ' + id);
});


const videoArea = document.getElementById('video-area');
const myVideo = document.createElement('video')

var videoState = true;
var audioState = true;

function startVideo() {
  navigator.mediaDevices.getUserMedia({
    video: videoState,
    audio: audioState
  }).then(stream => {
    addVideo(myVideo, stream)

    peer.on('call', call => {
      call.answer(stream)
      const thatVideo = document.createElement('video')
      call.on('stream', userVideoStream => {
        addVideo(thatVideo, userVideoStream)
      })
    })

    socket.on('user-connected', userId => { // If a new user connects
      console.log('debug')
      connectUser(userId, stream)
    })
  })
}
startVideo()

peer.on('open', id => { // When we first open the app, have us join a room
  socket.emit('room', ROOM_ID, id)
})

function connectUser(userId, stream) {
  const call = peer.call(userId, stream)
  // Add video to room
  const userVideo = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideo(userVideo, userVideoStream)
  })
  // Remove video for user leaving
  call.on('close', () => {
    video.remove()
  })
}

//add video to stream
function addVideo(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoArea.append(video)
}


//Disable and enable mic and video

function changeVideoState() {
  var icon = document.getElementById('video')
  if (videoState == true) {
    videoState = false;
    icon.innerHTML = '<i class="fas fa-video-slash" style="font-size:24px; "></i>';
  }
  else {
    videoState = true;
    icon.innerHTML = '<i class="fa fa-video-camera" style="font-size:24px; "></i>';
  }

  startVideo()

}

function changeAudioState() {
  var icon = document.getElementById('audio')
  if (audioState == true) {
    audioState = false;
    icon.innerHTML = '<i class="fas fa-microphone-slash" style="font-size:24px;"></i>';
  }
  else {
    audioState = true;
    icon.innerHTML = '<i class="fa fa-microphone" style="font-size:24px;"></i>';
  }
  startVideo()

}

