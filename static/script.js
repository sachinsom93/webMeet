const socket = io('/')
const videoGrid = document.getElementById('videoGrid')
const myVideo = document.createElement('video')
myVideo.muted = true

let peers = {}
let myVideoStream ;
let no_of_members = 0

// peer 
const peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: "3000"
})
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
})
    .then(function(stream){
        myVideoStream = stream
        addVideoStream(myVideo, stream)

        peer.on('call', function(call){
            call.answer(stream)
            const ansVideo = document.createElement('video')
            call.on('stream', function (ansStream) {
                addVideoStream(ansVideo, ansStream)
            })
            // document.getElementById("noOfMembers").append(no)

            // // for finding no of membres
            // no_of_members = rooms.length
            // const no = document.createElement('span')
            // no.innerText = no_of_members
        })

        // when a new member enter into room 
        socket.on('new-member', function (roomId, userId){
            addNewMember(userId, stream)
        })
        
    })
    .catch(function(err){
        console.error(err)
    })

socket.on("user-disconnect", userId => {
    if(peers[userId]){
        peers[userId].close()
    }

    
    
})

peer.on('open', function(userId){
    socket.emit('join-room', roomId, userId)    
    
})

socket.on('new-member', function (roomId, userId) {
    // for finding no of membres
    no_of_members += 1
    
    console.log(`new member entered into the room ${roomId}`)
})

socket.on('member', function (roomId, rooms, userId) {
    no_of_members = rooms.length
    // for finding no of membres
    const no = document.createElement('span')
    no.innerText = no_of_members
    document.getElementById("noOfMembers").append(no)
})

const addNewMember = function (userId, stream) {
    const call = peer.call(userId, stream)
    let userVideo = document.createElement('video')
    call.on('stream', function(userVideoStream){
        addVideoStream(userVideo, userVideoStream)
    })
    peers[userId] = call
    call.on('close', function(){
        userVideo.remove()
    })
}

const addVideoStream = function(myVideo, stream){
    myVideo.srcObject = stream
        myVideo.addEventListener('loadedmetadata', function(){
            myVideo.play()
        })
    videoGrid.append(myVideo)
}


// for mute unmute option
const muteUnmute = function(){
    const enabled = myVideoStream.getAudioTracks()[0].enabled
    if(enabled){
        myVideoStream.getAudioTracks()[0].enabled = false
        const html = `
                    <i class="red fa fa-microphone-slash"></i>
                    <div class="red">Unmute</div>
        `
        document.getElementsByClassName('microphone')[0].innerHTML = html 
    }
    else{
        myVideoStream.getAudioTracks()[0].enabled = true;
        const html = `
                    <i class="fa fa-microphone"></i>
                    <div>Mute</div>
        `
        document.getElementsByClassName('microphone')[0].innerHTML = html 

    }
}


// for stop video option
const stopVideo = function(){
    const enabled = myVideoStream.getVideoTracks()[0].enabled
    if(enabled){
        myVideoStream.getVideoTracks()[0].enabled = false
        const html = `
                    <i class="red fa fa-play"></i>
                    <div class="red">Start Video</div>
        `
        document.getElementsByClassName('camera')[0].innerHTML = html 
    }
    else{
        myVideoStream.getVideoTracks()[0].enabled = true;
        const html = `
                    <i class="fa fa-camera"></i>
                    <div>Stop Video</div>
        `
        document.getElementsByClassName('camera')[0].innerHTML = html 

    }
}

// for leave room button
// const leaveRoom = function(){
    
// }

Object.values(peers).forEach((value) => {
    console.log(value)
})



// for copy room id
function copyId(e) {
    /* Get the text field */
    var copyText = document.getElementById("copyRoomId");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
  
    /* Alert the copied text */
    alert('Room Id copied')
  }


  