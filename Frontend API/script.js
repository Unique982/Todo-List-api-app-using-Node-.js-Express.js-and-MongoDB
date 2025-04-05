
import {addItemToService,deleteItemFromServer,getItemsFromServer,markedCompletedItem} from "./services/itemsServices.js";
const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task");
const dateInput = document.getElementById("taskDate");
const notCompletedList = document.getElementById("notCompleted");
const completedList = document.getElementById('completedTask');

// add
form.addEventListener("submit", async function(event) {
    event.preventDefault();
    const task = taskInput.value.trim();
    const date = dateInput.value.trim();
try{
   const newItem = await addItemToService(task, date);
   alert("Item added Successfully");
    
   taskInput.value = "";
   dateInput.value= "";

   }catch(err){
    console.log("Could Not add task",err);
   } 
   location.reload();
});

// fetch all reacord
const fetchTodoItem = async() => {
    try{
        const todolist = await getItemsFromServer();
        const notCompletedItems= todolist.filter(item => !item.completed); 
        const completedItems = todolist.filter(item => item.completed);

        // not Completed Items Display All
        if(notCompletedItems.length===0){
            notCompletedList.innerHTML = "<li class='err'>No Task! </li>";
        }else{
        notCompletedList.innerHTML = notCompletedItems.map(item => `
            <li>
                ${item.task}
                <span>${item.completed ? 'Completed':'Not Completed'}</span>
                <span>(${new Date(item.date).toLocaleDateString()})</span>
                ${
                    !item.completed ? ` <button item-id="${item.id}"class='btn btn-success btn-sm make-complete'>Check Complete</button>` :""
                }
                
                <button data-id="${item.id}"class='btn btn-danger btn-sm delete-btn'>Delete</button>
            </li>
        `).join('');
            }
        // completed Items All Display 
        if(completedItems.length===0){
            completedList.innerHTML = "<li class='err'>No task have been completed yet! </li>";

        }else{
        completedList.innerHTML = completedItems.map(item => `
            <li>
                ${item.task}
                <span>${item.completed ? 'Completed':'Not Completed'}</span>
                <span>(${new Date(item.date).toLocaleDateString()})</span>
            
                <button data-id="${item.id}"class='btn btn-danger btn-sm delete-btn'>Delete</button>
            </li>
        `).join('');
        }
        // complete task list
        
        document.querySelectorAll('.delete-btn').forEach(button =>{
            button.addEventListener('click',handleDelete);
        });
        document.querySelectorAll('.make-complete').forEach(button =>{
            button.addEventListener('click',completedHandle);
        });
    }catch(err){
        console.log("Error",err);
        list.innerHTML = "<li> Failed To load Item</li>";
    }
   
};


// handle Delte 
const handleDelete = async(e) =>{
    const id = e.target.getAttribute("data-id")
    confirm("Are you sure want to delete this task")
   try{
    await deleteItemFromServer(id);
    await fetchTodoItem();
    location.reload();
   } catch(err){
    console.log("Delete Error",err);
   }
   location.reload();
}

const completedHandle = async(e) =>{
    const id = e.target.getAttribute("item-id");
    try{
        await markedCompletedItem(id);
        alert("task marked as Completed!");
        await fetchTodoItem();
        location.reload();
    }
    catch(err){
        console.log("Completed Task Error");
    }
}

fetchTodoItem();
