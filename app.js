//Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Function to load all event listeners
loadEventListeners();

function loadEventListeners(){
    //Add task event
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click', removeTask);
    //Clear task event
    clearBtn.addEventListener('click', clearTasks);
    //Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

//Add Task function
function addTask(e){
    if(taskInput.value === '') {
        alert('Add a task');
    }

    //Create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //If you want ul's to look good in materialize you want the collection's name to be in the item's name too

    //Create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));

    //Create a new link element (the X to delete)
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    //If you want something to the right of an item in materialize you need to have the secondary-content part

    //Add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //Append the link to the li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);

    //Clear input
    taskInput.value = '';

    e.preventDefault();
}

//Remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
        }
    }
}

//Clear Tasks
function clearTasks(){
    // taskList.innerHTML = '';
    //Doing it this way is simple

    //Faster way of doing it with a while loop
    //jsperf.com/innerhtml-vs-removechild to see some examples of why it's faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
}

//Filter Tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    //This will give you the value of whatever's being typed in

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        //We're gonna take the first item's text and assign it to "item"
        if(item.toLowerCase().indexOf(text) != -1){
            //if it's equal to -1 then that means there's no match, and we don't want that
            task.style.display = 'block';
            //'block' is "to show" 
        } else {
            task.style.display = 'none';
            //Otherwise if there's no match, then set display property to 'none'
        }
    });


}