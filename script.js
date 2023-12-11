// Practicing getting these elements with querySelector instead of getElementById
const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearBtn = document.querySelector("#clear");

// Adds li to ul
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

// Creates Button.
function createButton(classes) {
    const button = document.createElement("button");
    button.className = classes;
    const icon = createIcon("fa-solid fa-xmark");
    button.appendChild(icon);
    return button;
}

// Creates Icon
function createIcon(classes) {
    const icon = document.createElement("i");
    icon.className = classes;
    return icon;
}

// Remove Item function using event Delegation.
function removeItem(e) {
    // if clicked element's parent has a class of "remove-item"
    if (e.target.parentElement.classList.contains("remove-item")) {
        // Traversing DOM to get to li from icon and removing it.
        e.target.parentElement.parentElement.remove();
    }
}

// Clears list items.
function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
}

// Event listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);
