let currentChoice = selectInfo.choices[0];
var currentKey = currentChoice.key;
var maxDepth = depth;
var depth = 0;
let selections = [];

const head = document.createElement("div");
head.id = "head";
document.body.append(head);

const container = document.createElement("div");
container.id = "container";
document.body.append(container);

const footer = document.createElement("div");
footer.id = "footer";
document.body.append(footer);

function getNextChoice() {
    selectInfo.choices.forEach(element => {

        if (element.key.match(currentKey)) {
            currentChoice = element;
            depth++;
            console.log(currentChoice.key);
        }
    });
}

function displayHeading() {
    const listHeading = document.createElement("h2");
    listHeading.id = "heading" + depth;
    listHeading.textContent = currentChoice.description;
    container.append(listHeading);
}

function displayList() {
    const select = document.createElement("select");
    select.id = "select" + depth;
    container.append(select);

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

function addDefaultOption(select) {
    let option = document.createElement("option");
    option.value = "default";
    option.textContent = "Please make a selection";
    select.append(option);
}

function displayResult() {
    const resultHeading = document.createElement("h3");
    resultHeading.textContent = "Here is your result!";
    resultHeading.id = "result-heading";
    container.append(resultHeading);

    const resultText = document.createElement("p");
    resultText.id = "result-text"
    resultText.textContent = selections[2] + " " + selections[0] + " " + selections[1];
    container.append(resultText);

    const resetBtn = document.createElement("button");
    resetBtn.id = "reset-btn";
    resetBtn.textContent = "Reset";
    resetBtn.addEventListener("click", reset)
    container.append(resetBtn);

    for (let i = 0; i <= maxDepth; i++) {
        sessionStorage.setItem("result" + i, document.getElementById("select" + i).value);
    }
}

function reset() {
    for (let i = 0; i <= maxDepth; i++) {
        sessionStorage.removeItem("result" + i);
        document.getElementById("select" + i).remove();
        document.getElementById("heading" + i).remove();
    }

    document.getElementById("reset-btn").remove();
    document.getElementById("result-text").remove();
    document.getElementById("result-heading").remove();

    depth = 0;
    currentChoice = selectInfo.choices[0];
    selections = [];
    displayCategory();
}

function displayCategory() {
    displayHeading();
    displayList();
}

function displayHeadGuest() {
    const form = document.createElement("form");
    form.id = "loginForm";

    const nameLabel = document.createElement("label");
    nameLabel.id = "name-label";
    nameLabel.textContent = "Enter your name (not required)";

    const nameInput = document.createElement("input");
    nameInput.id = "name-input";
    nameInput.type = "text";
    nameInput.name = "username";

    const enterButton = document.createElement("input");
    enterButton.type = "submit";
    enterButton.value = "Enter";

    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(enterButton);

    head.append(form);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        localStorage.setItem("username", form.username.value.trim());
        checkLocalStorage();
    });
}

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

function logout(event) {
    localStorage.removeItem("username");
    checkLocalStorage();
}

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
            listHeading.textContent = currentChoice.description;
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
    }
    else {
        displayCategory();
    }
}


onStart();