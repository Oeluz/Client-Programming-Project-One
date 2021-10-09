/**
 * Author:      Zhencheng Chen
 * Program:     Project One - Client Programming
 * Date:        10/9/2021
 */


let currentChoice = selectInfo.choices[0];
var currentKey = currentChoice.key;

// get the max depth from the depth property in data.js
var maxDepth = depth;

var depth = 0;
let selections = [];

//set up 2 divs
const head = document.createElement("div");
head.id = "head";
document.body.append(head);

const container = document.createElement("div");
container.id = "container";
document.body.append(container);

// will be called when the user make a choice in a select
function getNextChoice() {
    selectInfo.choices.forEach(element => {

        if (element.key.match(currentKey)) {
            currentChoice = element;
            depth++;
            console.log(currentChoice.key);
        }
    });
}

// make a "question" from the description in data.js
function displayHeading() {
    const listHeading = document.createElement("h2");
    listHeading.id = "heading" + depth;
    listHeading.textContent = currentChoice.description;
    container.append(listHeading);
}

// make a select with options 
function displayList() {
    const select = document.createElement("select");
    select.id = "select" + depth;
    container.append(select);

    //check if depth reach the max depth, if so, stop at there and dispaly result
    select.addEventListener("change", () => {
        if (depth == maxDepth) {
            selections.push(select.value);
            select.disabled = true;
            displayResult();
            return;
        }

        currentKey = select.value;
        selections.push(currentKey);
        getNextChoice();
        displayCategory();
        select.disabled = true;
    });

    addDefaultOption(select);
    currentChoice.options.forEach(element => {
        let option = document.createElement("option");
        option.value = element;
        option.textContent = element;
        select.append(option);
    });

}

// add default option to the select
function addDefaultOption(select) {
    let option = document.createElement("option");
    option.value = "default";
    option.textContent = "Please make a selection";
    select.append(option);
}

// make the messages that display the result of the user's choices
function displayResult() {
    const resultScreen = document.createElement("div");
    resultScreen.id = "result";
    document.body.append(container);

    const resultHeading = document.createElement("h3");
    resultHeading.textContent = "Here is your result!";
    resultHeading.id = "result-heading";
    resultScreen.append(resultHeading);

    const resultText = document.createElement("p");
    resultText.id = "result-text"
    resultText.textContent = selections[2] + " " + selections[0] + " " + selections[1];
    resultScreen.append(resultText);

    const resetBtn = document.createElement("button");
    resetBtn.id = "reset-btn";
    resetBtn.textContent = "Reset";
    resetBtn.addEventListener("click", reset)
    resultScreen.append(resetBtn);

    container.append(resultScreen);

    // save to the sessionStorage with the choices
    for (let i = 0; i <= maxDepth; i++) {
        sessionStorage.setItem("result" + i, document.getElementById("select" + i).value);
        sessionStorage.setItem("heading" + i, document.getElementById("heading" + i).textContent);
    }
}

// remove the choices and result then start over
function reset() {
    for (let i = 0; i <= maxDepth; i++) {
        sessionStorage.removeItem("result" + i);
        document.getElementById("select" + i).remove();
        document.getElementById("heading" + i).remove();
    }

    document.getElementById("result").remove();

    depth = 0;
    currentChoice = selectInfo.choices[0];
    selections = [];
    displayCategory();
}

// display one heading + one select + multiple options
function displayCategory() {
    displayHeading();
    displayList();
}

// if the localStorage don't have username, the user is a guest
function displayHeadGuest() {
    const form = document.createElement("form");
    form.id = "loginForm";

    const nameLabel = document.createElement("p");
    nameLabel.id = "name-label";
    nameLabel.textContent = "Enter your name (not required)";

    const nameInput = document.createElement("input");
    nameInput.id = "name-input";
    nameInput.type = "text";
    nameInput.name = "username";

    const enterButton = document.createElement("input");
    enterButton.type = "submit";
    enterButton.value = "Enter";
    enterButton.id = "loginBtn";

    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(enterButton);

    head.append(form);

    //add the input to username in localStorage
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        localStorage.setItem("username", form.username.value.trim());
        checkLocalStorage();
    });
}

// if localStorage have username, the user is an old user
function displayHeadUser() {
    const welcomeMsg = document.createElement("h2");
    welcomeMsg.id = "welcome-message"
    welcomeMsg.textContent = "Welcome back, " + localStorage.username + "!";
    head.append(welcomeMsg);

    const logoutBtn = document.createElement("button");
    logoutBtn.id = "logout-btn";
    logoutBtn.textContent = "Log out";
    logoutBtn.addEventListener("click", logout)
    head.append(logoutBtn);
}

// remove the username from localStorage
function logout(event) {
    localStorage.removeItem("username");
    checkLocalStorage();
}

// display guest or user info depends on the local storage
function checkLocalStorage() {

    if (localStorage.getItem("username")) {
        if (!document.getElementById("loginForm") != null) {
            document.getElementById("loginForm").remove();
            displayHeadUser();
        }
    } else {
        if (document.getElementById("welcome-message") != null) {
            document.getElementById("welcome-message").remove();
            document.getElementById("logout-btn").remove();
            displayHeadGuest();
        }
    }
}

// check the local storage and session storage to show what info
function onStart() {
    if (localStorage.getItem("username")) {
        displayHeadUser();
    } else {
        displayHeadGuest();
    }

    if (sessionStorage.getItem("result1")) {
        for (let i = 0; i <= maxDepth; i++) {
            const listHeading = document.createElement("h2");
            listHeading.id = "heading" + i;
            listHeading.textContent = sessionStorage.getItem("heading" + i);
            container.append(listHeading);

            const select = document.createElement("select");
            select.id = "select" + i;
            container.append(select);

            let option = document.createElement("option");
            option.value = sessionStorage.getItem("result" + i);
            option.textContent = sessionStorage.getItem("result" + i);
            select.append(option);
            select.disabled = true;
        }

        selections[0] = sessionStorage.getItem("result0");
        selections[1] = sessionStorage.getItem("result1");
        selections[2] = sessionStorage.getItem("result2");
        displayResult();

    } else {
        displayCategory();
    }
}

onStart();