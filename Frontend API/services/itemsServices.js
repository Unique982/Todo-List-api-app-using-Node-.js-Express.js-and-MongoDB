export const addItemToService = async(task,date) =>{
  const response = await fetch("http://localhost:3000/api/todo", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify({task,date}),
  });
  const serverItem = await response.json();
  return mapServerItemtoLocalItem(serverItem);
};

// get 
export const getItemsFromServer = async () =>{
  const response = await fetch("http://localhost:3000/api/todo");
  const items = await response.json();
  return items.map(mapServerItemtoLocalItem);
}

// marked completed 
export const  markedCompletedItem = async(id) =>{
  const response = await fetch(`http://localhost:3000/api/todo/${id}/completed`,{
    method:"PUT",
  });
  const item = await response.json();
  return mapServerItemtoLocalItem(item);
}

// Delete 
export const deleteItemFromServer = async(id) =>{
  const response = await fetch(`http://localhost:3000/api/todo/${id}`,{
    method:"DELETE",
  });
 
  return id;
}

export const mapServerItemtoLocalItem = (serverItem) =>{
  return {
    id:serverItem._id,
    task:serverItem.task,
    date:serverItem.date,
    completed:serverItem.completed,
    createdAt:serverItem.createdAt,
    updatedAt:serverItem.updatedAt
  }
}