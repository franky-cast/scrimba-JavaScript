// State variables
//----------------
let homeScore = 0
let awayScore = 0
let value
let element

// DOM variables
//--------------
const homeScoreEl = document.getElementById("home-score-el")
const awayScoreEl = document.getElementById("away-score-el")
const buttons = document.querySelectorAll(".btn")
const newGameButton = document.getElementById("new-game-button")


// event listener for all button elements with the class "btn"
buttons.forEach(button => {
    button.addEventListener("click", function() {
        value = Number(event.target.getAttribute('data-amount'))
        element = event.target.getAttribute('data-location')
        increment(element, value)
    })
})
// incremenets scores on UI
function increment(location, amount) {
    if (location === "home") {
        homeScore = homeScore + amount
        homeScoreEl.innerText = homeScore
    }
    if (location === "away") {
        awayScore = awayScore + amount
        awayScoreEl.innerText = awayScore
    }
    determineWinner()
}
// Sets scores back to zero & renders UI
newGameButton.addEventListener("click", function() {
    homeScore = 0
    awayScore = 0

    homeScoreEl.innerText = homeScore
    awayScoreEl.innerText = awayScore
    highlight(awayScoreEl, "remove")
    highlight(homeScoreEl, "remove")
})
// keeps track of who is currently leading in points
function determineWinner () {
    if (homeScore > awayScore) {
        highlight(awayScoreEl, "remove")
        highlight(homeScoreEl, "add")
    } else if (awayScore > homeScore) {
        highlight(homeScoreEl, "remove")
        highlight(awayScoreEl, "add")
    } else {
        highlight(homeScoreEl, "remove")
        highlight(awayScoreEl, "remove")
    }
}
// highlights the score of the team that is currently leading
function highlight (el, action) {
    el.classList[action]("winning")
}
