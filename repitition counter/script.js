let count = 0

let countEl = document.getElementById("count-el").innerHTML
function increment() {
    count ++
    countEl ++
    document.getElementById("count-el").innerHTML = countEl
}


let saveEl = document.getElementById("save-el")
function save() {
    saveEl.innerHTML +=  count + " - "
    count = 0
    countEl = 0
    document.getElementById("count-el").innerHTML = countEl
}