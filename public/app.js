const socket = io()
const msgText = document.querySelector('#msg')
const btnSend = document.querySelector('#btnSend')
const chatBox = document.querySelector('.chatContent')
const displayMsg = document.querySelector('.message')

let name
do{
    name = prompt('What is your name?')
}while(!name)

document.querySelector('#yourName').textContent = name
msgText.focus()

btnSend.addEventListener('click', (e)=>{
    e.preventDefault()
    sendMsg(msgText.value)
    msgText.value = ''
    msgText.focus()
    chatBox.scrollTop = chatBox.scrollHeight
})

const sendMsg = message =>{
    let msg = {
        user: name,
        message: message.trim()
    }

    display(msg, 'youMessage')

    socket.emit('sendMessage', msg)
}

socket.on('sendToAll', msg=>{
    display(msg, 'otherMessage')
    chatBox.scrollTop = chatBox.scrollHeight
})

const display = (msg, type) =>{
    const msgDiv = document.createElement('div')
    let className = type
    msgDiv.classList.add(className, 'messageRow')
    let times = new Date().toLocaleTimeString()

    let innerText = `
    <div class="messageTitle">
        👻<span>${msg.user}</span>
    </div>
    <div class="messageText">
        ${msg.message}
    </div>
    <div class="messageTime">
        ${times}
    </div>
    `
    msgDiv.innerHTML = innerText
    displayMsg.appendChild(msgDiv)
}
// Now deploy heroku