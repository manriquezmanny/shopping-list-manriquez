// Practicing getting these elements with querySelector instead of getElementById
const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");

const addItem = e => {
    e.preventDefault();
    // Saving input value in variable.
    const newItem = itemInput.value;
    // Validating Input
    if (newItem === "") {
        alert("Please add an item");
        return;
    }
    // Creating a list item
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(newItem));
    const button = createButton("remove-item btn-link text-red");
    li.appendChild(button);
    // Appending new li to the DOM.
    itemList.appendChild(li);
    // Clearing the Item Input field.
    itemInput.value = "";
}

function createButton(classes) {
    const button = document.createElement("button");
    button.className = classes;
    const icon = createIcon("fa-solid fa-xmark");
    button.appendChild(icon);
    return button;
}

function createIcon(classes) {
    const icon = document.createElement("i");
    icon.className = classes;
    return icon;
}

// Event listeners
itemForm.addEventListener("submit", addItem);