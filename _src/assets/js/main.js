'use strict';

const listWrapper = document.querySelector(".js-list-wrapper");
const displayDate = document.querySelector(".js-date");
const btnAddTask = document.querySelector(".js-btn-newtask")
const modalWindow = document.querySelector(".js-modal");
const inputNewTask = document.querySelector(".js-newtask");
const btnCloseModal = document.querySelector(".js-btn-closemodal");
//const checkboxes = document.querySelectorAll(ul > input[type = "checkbox"])

let toDoTasks = [
    {
        id: "id00",
        task_name: "Sacar la basura",
        isCompleted: true,
    },
    {
        id: "id01",
        task_name: "Aprender Redux",
        isCompleted: false,
    }
];




function renderTask(toDoTasks) {
    let createList = document.createElement("ul");
    listWrapper.appendChild(createList);
    toDoTasks.map(task => {
        let inputhtml = (task.isCompleted === true) ? `<input type="checkbox" name=${`task${task.id}`} checked ></input>` : ` <input type="checkbox" name=${`task${task.id}`}></input>`;

        let htmlTask = `
        <li data-id="${task.id}">
            ${inputhtml}
            <label for=${`task${task.id}`}>${task.task_name}</label>
        </li>`;
        createList.innerHTML += htmlTask
    });

}

function addNewTask() {
    let newTaskName = inputNewTask.value;
    let newTaskId = `id0${toDoTasks.length}`;
    let newtask = {
        id: newTaskId,
        task_name: newTaskName,
        isCompleted: false,
    };
    toDoTasks.push(newtask);
    modalWindow.classList.toggle("hidden")
}

function addListenerToCheckboxes() {
    const checkboxes = document.querySelectorAll("ul input[type = 'checkbox']")
    console.log(checkboxes)
    checkboxes.forEach(checkbox => checkbox.addEventListener("click", handleChecbox))
}

function handleChecbox(e) {
    let selectedTaskID = e.target.parentNode.dataset.id;
    for (let task of toDoTasks) {
        if (task.id === selectedTaskID) {
            task.isCompleted = !task.isCompleted
        }
    }
}

function transformDayNumberToName(weekDayInNumber) {
    if (weekDayInNumber === 0) {
        return "Domingo"
    } else if (weekDayInNumber === 1) {
        return "Lunes"
    } else if (weekDayInNumber === 2) {
        return "Martes"
    } else if (weekDayInNumber === 3) {
        return "Miércoles"
    } else if (weekDayInNumber === 4) {
        return "Jueves"
    } else if (weekDayInNumber === 5) {
        return "Viernes"
    } else if (weekDayInNumber === 6) {
        return "Sábado"
    } else {
        return "No hemos podido encontrar el día de la semana"
    }
}
function transformMonthNumberToName(monthInNumber) {
    if (monthInNumber === 0) {
        return "Enero"
    } else if (monthInNumber === 1) {
        return "Febrero"
    } else if (monthInNumber === 2) {
        return "Marzo"
    } else if (monthInNumber === 3) {
        return "Abril"
    } else if (monthInNumber === 4) {
        return "Mayo"
    } else if (monthInNumber === 5) {
        return "Junio"
    } else if (monthInNumber === 6) {
        return "Julio"
    } else if (monthInNumber === 7) {
        return "Agosto"
    } else if (monthInNumber === 8) {
        return "Septiembre"
    } else if (monthInNumber === 9) {
        return "Octubre"
    } else if (monthInNumber === 10) {
        return "Noviembre"
    } else if (monthInNumber === 11) {
        return "Diciembre"
    } else {
        return "No hemos podido encontrar el mes"
    }
}

function getDate() {
    let newDate = new Date();
    let dayNumber = newDate.getDate();
    let dayName = transformDayNumberToName(newDate.getDay());
    let month = transformMonthNumberToName(newDate.getMonth());
    let year = newDate.getUTCFullYear();

    let dateHTML = `<div class="js-daynumber">${dayNumber}</div>
    <div class="">
      <p class="js-dayname">${dayName}</p>
      <p class="js-monthname">${month} , ${year}</p>
    </div>`;
    displayDate.innerHTML = dateHTML
}

btnCloseModal.addEventListener("click", addNewTask)
btnAddTask.addEventListener("click", () => modalWindow.classList.toggle("hidden"))

// Init
function initApp() {
    getDate();
    renderTask(toDoTasks);
    addListenerToCheckboxes();
}
window.onload = initApp