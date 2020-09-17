document.addEventListener('DOMContentLoaded', () => {
  const username = prompt('what is your name??')

  const socket = io();
  
  
  function addNewMessage(message){
    console.log(message.content);
    document.querySelector('.messageContainer').innerHTML+= `<div class='message ${message.sender === username ? 'user' : ''}'>${message.content}</div>`
    document.querySelector('.messageContainer').lastElementChild.scrollIntoView()
    document.body.style.background = 'white';
  }
  
  socket.on('message', message => addNewMessage(message));
  socket.on('showtyping', stuff => document.body.style.background ='blue');
  const $form = document.querySelector('form');
  
  $form.addEventListener('submit', e => {
    e.preventDefault();
    let message = e.target.elements[0];
    message.textContent = ''
    socket.emit('msgFromFront', {sender: username, content: message.value})
  })
  
  document.querySelector('input').addEventListener('focus', e => {
    socket.emit('typing', null)
  })
})
