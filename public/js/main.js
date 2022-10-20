const socket = io();
const chatForm = document.getElementById('chat-form');
const messageinp = document.getElementById('msg');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// get username and room for url
const{username,room} = Qs.parse(location.search,{
    ignoreQueryPrefix: true
});
// join chatroom
const checking = [];
const detail = {username,room};
var idx = checking.indexOf(detail);
console.log(idx);
console.log('xxx');
if(idx==-1)
{
    checking.push(detail);
   // socket.emit('joinRoom',{username,room});
}
else{
    prompt("username is not available");
}




//Add users to DOM
function outputUsers(users)
{
    //if(users.find(username))
    userList.innerHTML=`
    ${users.map(user => `<li>${user.username}</li>`).join('')}`;
}


// Get room and users
socket.on('roomUsers',({room,users})=>{
  outputRoomName(room);
  outputUsers(users);
});
// message from server
socket.on('message', message=>{
outputMessage(message);

// scroll down
chatMessages.scrollTop = chatMessages.scrollHeight;
});

// message submit
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    //Get message text
    const msg = e.target.elements.msg.value;

    //emit message to server
    socket.emit('chatMessage', msg);

    // clear message
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();
});
//output message to DOM
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
    ${message.text}
    </p>`
    document.querySelector('.chat-messages').appendChild(div);
}
// Add room name to DOM
function outputRoomName(room)
{
    roomName.innerText = room;

}
