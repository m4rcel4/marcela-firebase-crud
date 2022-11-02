import {
    onGetLongboards,
    saveLongboard,
    deleteLongboard,
    getLongboard,
    updateLongboard,
    getLongboards,
  } from "./firebase.js";
  
  const longboardForm = document.getElementById("longboard-form");
  const longboardsContainer = document.getElementById("longboards-container");
  
  let editStatus = false;
  let id = "";
  
  window.addEventListener("DOMContentLoaded", async (e) => {
    // const querySnapshot = await getLongboards();
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    // });
  
    onGetLongboards((querySnapshot) => {
      longboardsContainer.innerHTML = "";
  
      querySnapshot.forEach((doc) => {
        const longboard = doc.data();
  
        longboardsContainer.innerHTML += `
        <div class="card card-body mt-2 border-primary">
      <h3>${longboard.shape}</h3>
      <h5>${longboard.truck}</h5>
      <h5>${longboard.roda}</h5>

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
  
      const btnsDelete = longboardsContainer.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async ({ target: { dataset } }) => {
          try {
            await deleteLongboard(dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );
  
      const btnsEdit = longboardsContainer.querySelectorAll(".btn-edit");
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
  
  longboardForm.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const shape = longboardForm["longboard-shape"];
    const truck = longboardForm["longboard-truck"];
    const roda = longboardForm["longboard-roda"];
    const description = longboardForm["longboard-description"];
  
    try {
      if (!editStatus) {
        await saveLongboard(shape.value,truck.value,roda.value, description.value);
      } else {
        await updateLongboard(id, {
          shape: shape.value,
          truck: truck.value,
          roda: roda.value,
          description: description.value,
        });
  
        editStatus = false;
        id = "";
        longboardForm["btn-longboard-form"].innerText = "Save";
      }
  
      longboardForm.reset();
      shape.focus();
    } catch (error) {
      console.log(error);
    }
  });