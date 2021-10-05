step = 0;

function createList(currentStep) {
    const select = document.createElement("select");
    select.id = "select" + currentStep;
    container.append(select);

    const option = document.createElement("option");
    option.value = selectInfo.choices[0].key;
    option.textContent = "Make a selection";
    select.append(option);

    selectInfo.choices[0].options.forEach(element => {
        let option1 = document.createElement("option");
        option1.value = element;
        option1.textContent = element;
        select.append(option1);

        select.addEventListener("change", () => {
            currentSelection = select.value;
            console.log(currentSelection);

            selectInfo.choices.forEach(element => {
                if (element.key == select.value) {
                    console.log(element);
                    createSelection(currentStep + 1);
                }
            }); //end of loop
        }); //end of event listener
    }); //end of loop
}//end of selectList

function createHeading(currentStep) {
    const listHeading = document.createElement("h2");
    listHeading.id = "listHeading";
    listHeading.textContent = selectInfo.choices[currentStep].description;
    container.append(listHeading);
}//end of createHeading

function createSelection(currentStep){
    createHeading(currentStep);
    createList(currentStep);
}

const container = document.createElement("div");
container.id = "container";
document.body.append(container);

createSelection(step);
