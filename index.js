import {
    onGetLongboards,
    saveLongboards,
    deleteLongboard,
    getLongboard,
    updateLongboard,
    getLongboards,
  } from "./firebase.js";
  
  const longboardForm = document.getElementById("longboard-form");
  const longboardContainer = document.getElementById("longboard-container");
  
  let editStatus = false;
  let id = "";
  
  window.addEventListener("DOMContentLoaded", async (e) => {
    // const querySnapshot = await getTasks();
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    // });
  
    onGetTasks((querySnapshot) => {
      longboardContainer.innerHTML = "";
  
      querySnapshot.forEach((doc) => {
        const longboard = doc.data();
  
        longboardContainer.innerHTML += `
        <div class="card card-body mt-2 border-primary">
      <h3 class="h5">${longboard.shape}</h3>
      <h3 class="h5">${longboard.truck}</h3>
      <h3 class="h5">${longboard.roda}</h3>

      <p>${longboard.description}</p>
      <div>
        <button class="btn btn-primary btn-delete" data-id="${doc.id}">
          🗑 Delete
        </button>
        <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
          🖉 Edit
        </button>
      </div>
    </div>`;
      });
  
      const btnsDelete = longboardContainer.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async ({ target: { dataset } }) => {
          try {
            await deleteLongboard(dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );
  
      const btnsEdit = longboardContainer.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getLongboard(e.target.dataset.id);
            const longboard = doc.data();
            longboardForm["longboard-shape"].value = longboard.shape;
            longboardForm["longboard-truck"].value = longboard.truck;
            longboardForm["longboard-roda"].value = longboard.roda;
            longboardForm["longboard-description"].value = longboard.description;

           
  
            editStatus = true;
            id = doc.id;
            longboardForm["btn-longboard-form"].innerText = "Update";
          } catch (error) {
            console.log(error);
          }
        });
      });
    });
  });
  
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const title = taskForm["task-title"];
    const description = taskForm["task-description"];
  
    try {
      if (!editStatus) {
        await saveTask(title.value, description.value);
      } else {
        await updateTask(id, {
          title: title.value,
          description: description.value,
        });
  
        editStatus = false;
        id = "";
        taskForm["btn-task-form"].innerText = "Save";
      }
  
      taskForm.reset();
      title.focus();
    } catch (error) {
      console.log(error);
    }
  });