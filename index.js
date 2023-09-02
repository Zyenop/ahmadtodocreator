const taskListEl = document.getElementById("js-task-list");
const taskInputEl = document.getElementById("js-todo-input");
const timeInputEl = document.getElementById("js-time-input");
const dateInputEl = document.getElementById("js-date-input");
const addTodoBtn = document.getElementById("js-add-todo");
const titleEl = document.getElementById("js-task-title");
addTodoBtn.addEventListener('click', () => {
  const addClick = true;
  updateTodo();
  return addClick;
})


let todos = [];
let addClick = false;

displayTodos(addClick,taskListEl)
  function updateTodo() {
    titleEl.innerHTML = "TASKS"
    titleEl.classList.remove("no-task")
    const todoslide = {
      id : new Date().getTime(),
      task : "",
      time : "",
      date : "",
      complete : false
    }

    todos.unshift(todoslide);

    const task = taskInputEl.value;
    const time = timeInputEl.value;
    const date = dateInputEl.value;
    if (task == "") {
      alert("Pls Input a task.");
    } else if (time == "") {
      alert("Pls Input the time.");
    } else if (date == "") {
      alert("Pls Input a date.");
    } else {
      const {taskSlideEl, taskEl, editEl, deleteEl} = createTodoElement(todoslide);
      taskListEl.prepend(taskSlideEl)

      save()
    }
  }

  

  function createTodoElement(todoslide, task, time, date) {
    const taskSlideEl = document.createElement("div");
    taskSlideEl.classList.add("task-slide");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todoslide.complete;
    if (taskInputEl != ""){
      todoslide.task = taskInputEl.value;
      todoslide.time = timeInputEl.value;
      todoslide.date = dateInputEl.value;
    } else if (taskInputEl == "") {
      todoslide.task = task;
      todoslide.time = time;
      todoslide.date = date;
    }
    save();

    if (todoslide.complete) {
      taskSlideEl.classList.add("complete");
    }
    taskSlideEl.append(checkbox)
    const taskEl = document.createElement("input");
    taskEl.type = "text";
    taskEl.classList.add("task");
    taskEl.id = "js-task";
    taskEl.setAttribute("readonly", "readonly");
    taskEl.value = todoslide.task;
    taskSlideEl.append(taskEl);
    const actionsEl = document.createElement("div");
    actionsEl.classList.add("actions");
    actionsEl.setAttribute("id", "js-actions");
    taskSlideEl.append(actionsEl);
    const optionIconEl = document.createElement("button");
    optionIconEl.classList.add("action");
    optionIconEl.classList.add("info");
    optionIconEl.innerHTML = ":-:"
    actionsEl.append(optionIconEl);
    const editEl = document.createElement("button");
    editEl.classList.add("action");
    editEl.classList.add("edit");
    editEl.innerHTML = "EDIT"
    actionsEl.append(editEl);
    const deleteEl = document.createElement("button");
    deleteEl.classList.add("action");
    deleteEl.classList.add("delete");
    deleteEl.innerHTML = "DELETE"
    actionsEl.append(deleteEl);
    const dropdownEl = document.createElement("div");
    dropdownEl.classList.add("dropdown");
    taskSlideEl.append(dropdownEl);
    listEl = document.createElement("ul")
    dropdownEl.append(listEl)
    listItemTimeEl = document.createElement("li");
    listItemTimeEl.classList.add("option");
    listEl.append(listItemTimeEl);
    listItemTimeEl.innerHTML = todoslide.time;
    listItemDateEl = document.createElement("li");
    listItemDateEl.classList.add("option");
    listEl.append(listItemDateEl);
    listItemDateEl.innerHTML = todoslide.date;

    taskInputEl.value = "";
    timeInputEl.value = "";
    dateInputEl.value = "";

    checkbox.addEventListener('change', () => {
      todoslide.complete = checkbox.checked

      if (todoslide.complete) {
        taskSlideEl.classList.add("complete");
      } else {
        taskSlideEl.classList.remove("complete");
      }

      save()
    });

    editEl.addEventListener('click', () => {
      const checkReadonly = taskEl.getAttribute("readonly")
      if (checkReadonly == "readonly") {
        taskEl.removeAttribute("readonly");
        taskEl.focus();
        editEl.innerHTML = "SAVE";
        save();
      } else {
        taskEl.setAttribute("readonly", "readonly")
        todoslide.task = taskEl.value;
        editEl.innerHTML = "EDIT"
        save();
      }
    })

    deleteEl.addEventListener('click', () => {
      todos = todos.filter(t => t.id != todoslide.id);

      taskSlideEl.remove();

      save();
      if (taskListEl.innerHTML == "") {
        titleEl.innerHTML = "No available task, fill the inputs above to add taskk.";
        titleEl.classList.add("no-task");
      }
    });

    optionIconEl.addEventListener('click', () => {
      const period = dropdownEl.getAttribute("class");
      if ( period == "dropdown") {
        dropdownEl.removeAttribute("class");
        dropdownEl.setAttribute("class", "show-dropdown");
      } else if (period == "show-dropdown") {
        dropdownEl.removeAttribute("class");
        dropdownEl.setAttribute("class", "dropdown")
      }
    })

    return {taskSlideEl, taskEl, editEl, deleteEl}
  }

  function displayTodos(addClick,taskListEl) {
    load();

    for (let i = 0; i < todos.length; i++) {
      const todoslide = todos[i];

      const task = todoslide.task;
      const time = todoslide.time;
      const date = todoslide.date;

      if (addClick == true) {
        const { taskSlideEl } = createTodoElement(todoslide,task,time,date);
      } else {
        console.log(addClick)
      }

      

      taskListEl.append(taskSlideEl)
    }
  }

  function recreateTodoElement(todoslide, task, time, date) {
    const taskSlideEl = document.createElement("div");
    taskSlideEl.classList.add("task-slide");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todoslide.complete;

    if (todoslide.complete) {
      taskSlideEl.classList.add("complete");
    }
    taskSlideEl.append(checkbox)
    const taskEl = document.createElement("input");
    taskEl.type = "text";
    taskEl.classList.add("task");
    taskEl.id = "js-task";
    taskEl.setAttribute("readonly", "readonly");
    taskEl.value = task;
    taskSlideEl.append(taskEl);
    const actionsEl = document.createElement("div");
    actionsEl.classList.add("actions");
    actionsEl.setAttribute("id", "js-actions");
    taskSlideEl.append(actionsEl);
    const optionIconEl = document.createElement("button");
    optionIconEl.classList.add("action");
    optionIconEl.classList.add("info");
    optionIconEl.innerHTML = ":-:"
    actionsEl.append(optionIconEl);
    const editEl = document.createElement("button");
    editEl.classList.add("action");
    editEl.classList.add("edit");
    editEl.innerHTML = "EDIT"
    actionsEl.append(editEl);
    const deleteEl = document.createElement("button");
    deleteEl.classList.add("action");
    deleteEl.classList.add("delete");
    deleteEl.innerHTML = "DELETE"
    actionsEl.append(deleteEl);
    const dropdownEl = document.createElement("div");
    dropdownEl.classList.add("dropdown");
    taskSlideEl.append(dropdownEl);
    listEl = document.createElement("ul")
    dropdownEl.append(listEl)
    listItemTimeEl = document.createElement("li");
    listItemTimeEl.classList.add("option");
    listEl.append(listItemTimeEl);
    listItemTimeEl.innerHTML = `T: ${time}`;
    listItemDateEl = document.createElement("li");
    listItemDateEl.classList.add("option");
    listEl.append(listItemDateEl);
    listItemDateEl.innerHTML = `D: ${date}`;

    taskInputEl.value = "";
    timeInputEl.value = "";
    dateInputEl.value = "";

    checkbox.addEventListener('change', () => {
      todoslide.complete = checkbox.checked

      if (todoslide.complete) {
        taskSlideEl.classList.add("complete");
      } else {
        taskSlideEl.classList.remove("complete");
      }
      save()
    });

    editEl.addEventListener('click', () => {
      const checkReadonly = taskEl.getAttribute("readonly")
      if (checkReadonly == "readonly") {
        taskEl.removeAttribute("readonly");
        taskEl.focus();
        editEl.innerHTML = "SAVE";
        save()
      } else {;
        taskEl.setAttribute("readonly", "readonly")
        todoslide.task = taskEl.value;
        editEl.innerHTML = "EDIT"
        save();
      }
    })

    deleteEl.addEventListener('click', () => {
      todos = todos.filter(t => t.id != todoslide.id);

      taskSlideEl.remove();

      save();
      if (taskListEl.innerHTML == "") {
        titleEl.innerHTML = "No available task, fill the inputs above to add taskk.";
        titleEl.classList.add("no-task");
      }
    });

    optionIconEl.addEventListener('click', () => {
      const period = dropdownEl.getAttribute("class");
      if ( period == "dropdown") {
        dropdownEl.removeAttribute("class");
        dropdownEl.setAttribute("class", "show-dropdown");
      } else if (period == "show-dropdown") {
        dropdownEl.removeAttribute("class");
        dropdownEl.setAttribute("class", "dropdown")
      }
    })

    return {taskSlideEl, taskEl, editEl, deleteEl}
  }

  function displayTodos(addClick) {
    load();

    for (let i = 0; i < todos.length; i++) {
      const todoslide = todos[i];

      const task = todoslide.task;
      const time = todoslide.time;
      const date = todoslide.date;

      console.log(task, time, date);

      const { taskSlideEl } = recreateTodoElement(todoslide,task,time,date);

      taskListEl.append(taskSlideEl)

      if (taskListEl.innerHTML == "") {
        titleEl.innerHTML = "No available task, fill the inputs above to add task";
      } else {
        titleEl.innerHTML = "TASKS"
        titleEl.classList.remove("no-task")
      }
    }
  }



  function save() {
    const save = JSON.stringify(todos);

    localStorage.setItem("todosmi", save);
  }

  function load() {
    const data = localStorage.getItem("todosmi");

    if (data) {
      todos = JSON.parse(data)
    }
  }