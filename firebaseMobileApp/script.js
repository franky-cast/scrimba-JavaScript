// Add to cart app

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


// App init
const appSettings = {
    databaseURL: "https://add-to-cart-8adaf-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingList = ref(database, "shoppingList");

// DOM
const buttonEl = document.getElementById("add-button");
const inputEl = document.getElementById("input-field");
const listEl = document.getElementById("shopping-list");


// CREATE (adds item to firebase)
buttonEl.addEventListener("click", () => {
    let inputValue = inputEl.value;
    if (inputValue.length > 0 && inputValue != " ") {
        inputEl.value = "";
        push(shoppingList, inputValue);
        console.log(`${inputValue} added to database`);
    } else
        alert("Enter item before adding")
})

// READ (retrieves data from firebase and updates list html)
onValue(shoppingList, (snapshot) => {
    if (snapshot.exists()) {
        let data = Object.entries(snapshot.val());
        updateList(data);
    } else
        listEl.innerHTML = "";
})

// DELETE (deletes specific item from firebase)
function removeItem(key) {
    let itemLocation = ref(database, `shoppingList/${key}`)
    remove(itemLocation)
    console.log("Item removed")
}

// updates list html
function updateList(data) {
    listEl.innerHTML = "";
    for (let item of data) {
        let newItem = document.createElement("li");
        newItem.textContent = item[1];
        newItem.classList.add("shopping-list__item");
        newItem.addEventListener("click", () => removeItem(item[0]))
        listEl.append(newItem);
    }
}