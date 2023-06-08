var draggedItem = null;

function dragStart(event) {
  draggedItem = event.target;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', event.target.textContent);
  event.target.classList.add('dragging');
}

function dragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
  return false;
}

function dragEnter(event) {
  event.target.classList.add('over');
}

function dragLeave(event) {
  event.target.classList.remove('over');
}

function drop(event) {
  event.preventDefault();
  event.target.classList.remove('over');
  if (draggedItem !== event.target) {
    var container1 = document.getElementById('container1');
    var container2 = document.getElementById('container2');
    container2.appendChild(draggedItem);
    container2.classList.add('success');
    container1.classList.remove('success');
    displaySuccessMessage();
  }
  event.target.classList.remove('dragging');
}

function displaySuccessMessage() {
  var successMessage = document.getElementById('successMessage');
  successMessage.style.display = 'block';
  setTimeout(function() {
    successMessage.style.display = 'none';
  }, 2000);
}

function reset() {
  var container1 = document.getElementById('container1');
  var container2 = document.getElementById('container2');
  container2.innerHTML = '';
  container2.classList.remove('success');
  container1.innerHTML = '';
  createDefaultItems(container1);
}

function createDefaultItems(container) {
  for (var i = 1; i <= 3; i++) {
    var item = document.createElement('div');
    item.textContent = 'Item ' + i;
    item.classList.add('item');
    item.setAttribute('draggable', 'true');
    container.appendChild(item);
    item.addEventListener('dragstart', dragStart, false);
  }
}

// Create default items in the first container
var container1 = document.getElementById('container1');
createDefaultItems(container1);

var container2 = document.getElementById('container2');
container2.addEventListener('drop', drop, false);
container2.addEventListener('dragenter', dragEnter, false);
container2.addEventListener('dragover', dragOver, false);
container2.addEventListener('dragleave', dragLeave, false);
