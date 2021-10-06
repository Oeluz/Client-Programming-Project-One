let currentChoice = selectInfo.choices[0];
var currentKey = currentChoice.key;
var maxDepth = depth;
var depth = 0;
let selections = [];


const container = document.createElement("div");
container.id = "container";
document.body.append(container);

function getNextChoice(){
    selectInfo.choices.forEach(element => {

        if(element.key.match(currentKey)){
            currentChoice = element;
            depth++;
            console.log(currentChoice.key);
        }
    });
}

function displayHeading(){
    const listHeading = document.createElement("h2");
    listHeading.id = "heading" + depth;
    listHeading.textContent = currentChoice.description;
    container.append(listHeading);
}

function displayList(){
    const select = document.createElement("select");
    select.id = "select" + depth;
    container.append(select);
    
    select.addEventListener("change", () => {
        if(depth == maxDepth)
        {
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
    })

    addDefaultOption(select);
    currentChoice.options.forEach(element => {
        let option = document.createElement("option");
        option.value = element;
        option.textContent = element;
        select.append(option);        
    });

}

function addDefaultOption(select){
    let option = document.createElement("option");
    option.value = "default";
    option.textContent = "Please make a selection";
    select.append(option);
}

function displayResult(){
    const resultHeading = document.createElement("h3");
    resultHeading.textContent = "Here is your result!";
    container.append(resultHeading);

    const resultText = document.createElement("p");
    resultText.textContent = selections[2] + " " + selections[0] + " " + selections[1];
    container.append(resultText);
}

function displayCategory(){
    displayHeading();
    displayList();
}


displayCategory();