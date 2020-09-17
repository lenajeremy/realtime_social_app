const socket = io();

function addNewMessage(message){
  document.querySelector('.messageContainer').innerHTML+= `<div class='message'>${message}</div>`
}

socket.on('message', message => addNewMessage(message))
const $form = document.querySelector('form');



$form.addEventListener('submit', e => {
  e.preventDefault();
  let message = e.target.elements[0].value;
  socket.emit('msgFromFront', message)
})
