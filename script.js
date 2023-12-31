// Practicing getting these elements with querySelector instead of getElementById
const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearBtn = document.querySelector("#clear");
const itemFilter = document.querySelector("#filter");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    checkUI();
}

// Adds li to ul
const addItemSubmit = e => {
    e.preventDefault();
    // Saving input value in variable.
    const newItem = itemInput.value;
    // Validating Input
    if (newItem === "") {
        alert("Please add an item");
        return;
    }

    // Checking for edit mode
    if (isEditMode) {
        // Getting item with edit-mode class
        const itemToEdit = itemList.querySelector(".edit-mode");
        // Removing item from storage.
        removeItemFromStorage(itemToEdit.textContent);
        // Removing edit-mode class from item to edit.
        itemToEdit.classList.remove("edit-mode");
        itemToEdit.remove();
        // Setting isEditMode back to false.
        isEditMode = false;
    } else {
        if (checkIfItemExists(newItem)) {
            alert("That Item already exists.");
            return;
        }
    }

    // Creating item DOM element
    addItemToDOM(newItem);
    // Adding item to local storage
    addItemToStorage(newItem);

    checkUI();

    itemInput.value = "";
}

function addItemToDOM(item) {
    // Creating a list item
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(item));
    const button = createButton("remove-item btn-link text-red");
    li.appendChild(button);
    // Appending new li to the DOM.
    itemList.appendChild(li);
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

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();
    // Adding new item to array.
    itemsFromStorage.push(item);
    // Converting back to JSON string and setting to local storage.
    localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
    let itemsFromStorage;
    if (localStorage.getItem("items") === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem("items"));
    }

    return itemsFromStorage;
}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains("remove-item")) {
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target);
    }
}

function checkIfItemExists(item) {
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
    isEditMode = true;

    itemList.querySelectorAll("li").forEach(i => i.classList.remove("edit-mode"));

    item.classList.add("edit-mode");
    formBtn.innerHTML = "<i class='fa-solid fa-pen'></i> Update Item";
    formBtn.style.backgroundColor = "#228B22"
    itemInput.value = item.textContent;
}

// Remove Item function using event Delegation.
function removeItem(item) {
    if (confirm("Are you sure?")) {
        // Removing item from DOM
        item.remove();

        // Remove item from storage
        removeItemFromStorage(item.textContent);

        checkUI();
    }
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();
    // Filtering out item to be removed.
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
    //Re setting filtered stringified array to storage.
    localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

// Clears list items.
function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
    // Clearing from local storage
    localStorage.removeItem('items');
    checkUI();
}

// Filters items
function filterItems(e) {
    const items = itemList.querySelectorAll("li");
    const text = e.target.value.toLowerCase();
    
    // Iterating over NodeList
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(text) != -1) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    })
}

// Checks if we should display filter and clear all UI elements.
function checkUI() {
    itemInput.value = "";

    const items = itemList.querySelectorAll("li");
    if (items.length === 0) {
        clearBtn.style.display = "none";
        itemFilter.style.display = "none";
    }else{
        clearBtn.style.display = "block";
        itemFilter.style.display = "block";
    }

    formBtn.innerHTML = "<i class='fa-solid fa-plus'></i>Add Item";
    formBtn.style.backgroundColor = "#333";

    isEditMode = false;
}

// Initialize app
function init() {
    // Event listeners
    itemForm.addEventListener("submit", addItemSubmit);
    itemList.addEventListener("click", onClickItem);
    clearBtn.addEventListener("click", clearItems);
    itemFilter.addEventListener("input", filterItems);
    document.addEventListener("DOMContentLoaded", displayItems);

    checkUI();
}

init();