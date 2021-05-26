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

      //Issue: the messages are emitted to all the rooms
      
     

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

      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then(stream => {
        addVideo(myVideo, stream) 
    
        peer.on('call', call => { 
            call.answer(stream) 
            const thatVideo = document.createElement('video') 
            call.on('stream', userVideoStream => { 
              addVideo(thatVideo, userVideoStream) 
            })
        })
    
        socket.on('user-connected', userId => { // If a new user connect
          connectUser(userId, stream) 
        })
    })
    
    peer.on('open', id => { // When we first open the app, have us join a room
        socket.emit('room', ROOM_ID, id)
    })
    
    function connectUser(userId, stream) { 
        const call = peer.call(userId, stream) 
        // Add their video
        const userVideo = document.createElement('video') 
        call.on('stream', userVideoStream => {
          addVideo(userVideo, userVideoStream)
        })
        // If they leave, remove their video
        call.on('close', () => {
            video.remove()
        })
    }
    
    
    function addVideo(video, stream) {
        video.srcObject = stream 
        video.addEventListener('loadedmetadata', () => { // Play the video as it loads
            video.play()
        })
        videoArea.append(video) 
    }