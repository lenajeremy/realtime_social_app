document.addEventListener('DOMContentLoaded', () => {
  const username = prompt('what is your name??')

  const socket = io();
  
  function addNewMessage(message){
    console.log(message.content);
    document.querySelector('.messageContainer').innerHTML+= 
    `<div class = 'message ${message.sender === username ? 'user': ''}'>
      <div class="sender">${message.sender}</div>
      <hr>
      <div class="content">${message.content}</div>
    </div>`;
    document.querySelector('.messageContainer').lastElementChild.scrollIntoView()
    document.querySelector('.typing').classList.remove('active')
  }
  
  socket.on('message', message => addNewMessage(message));
  socket.on('showtyping', stuff => document.querySelector('.typing').classList.add('active'));
  const $form = document.querySelector('form');
  
  $form.addEventListener('submit', e => {
    e.preventDefault();
    let message = e.target.elements[0];
    message.focus();
    socket.emit('msgFromFront', {sender: username, content: message.value})
    message.value = '';
  })
  
  document.querySelector('input').addEventListener('focus', e => {
    socket.emit('typing', null)
  })
  document.querySelector('input').addEventListener('focusout', e => {
    socket.emit('donetyping', null)
  })
})
