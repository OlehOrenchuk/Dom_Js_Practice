'use strict';


function randomIntFromInterval(min, max) {
    return Math.floor(Math.random()* (max - min + 1) + min)
}

function playDice() {
    let score = document.querySelector('.player--active .score')
    let currentScore = document.querySelector('.player--active .current-score')
    let activeName = document.querySelector('.player--active .name').textContent
    let opponentName = document.querySelector('section:not(.player--active) .name').textContent
    const randomDice = randomIntFromInterval(1,6)
    console.log(randomDice)
    activeName = activeName.toUpperCase()
    opponentName = opponentName.toUpperCase()
    image.style.visibility = 'visible'
    score.textContent = ''+randomDice
    currentScore.textContent = ''+(+(currentScore.textContent) + randomDice)

    switch (randomDice){
        case 1:
            image.src = 'dice-1.png'
            currentScore.textContent = '0'
            score.textContent = '0'
            holdButton.click()
            swal(`${activeName} LOSE! ${opponentName} YOUR MOVE!`)
            break
        case 2:
            image.src = 'dice-2.png'
            break
        case 3:
            image.src = 'dice-3.png'
            break
        case 4:
            image.src = 'dice-4.png'
            break
        case 5:
            image.src = 'dice-5.png'
            break
        case 6:
            image.src = 'dice-6.png'
            break
    }
    if(+currentScore.textContent >=50) {
        document.querySelector('.player--active').classList.add('player--winner')
        swal(`${activeName} WIN!`)
        document.querySelector('.btn--roll').classList.add('hidden')
        document.querySelector('.btn--hold').classList.add('hidden')
    }
}

function confirmNames() {
    document.querySelector('main').classList.remove('hidden')
    document.querySelector('.input-name').classList.add('hidden')
    const firstName = document.querySelector('#name--0')
    const secondName = document.querySelector('#name--1')
    const firstNameInput = document.querySelector('.first_player_name')
    const secondNameInput = document.querySelector('.second_player_name')

    if(!firstNameInput.value && !secondNameInput.value){
        firstName.textContent = 'Player 1'
        secondName.textContent = 'Player 2'
    }
    else if(!firstNameInput.value && secondNameInput.value){
        firstName.textContent = 'Player 1'
        secondName.textContent = secondNameInput.value
    }
    else if(firstNameInput.value && !secondNameInput.value){
        firstName.textContent = firstNameInput.value
        secondName.textContent = 'Player 2'
    }
    else{
        firstName.textContent = firstNameInput.value
        secondName.textContent = secondNameInput.value
    }
}

function switchPlayer(){
    let active = document.querySelector('.player--active')
    active.classList.remove('player--active')

    document.querySelector(`.${active === document.querySelector('.player--0') ? 'player--1' : 'player--0'}`).classList.add('player--active')
}

function resetGame(){
    let active = document.querySelector('.player--active')
    document.querySelectorAll('.player--winner').forEach(function (el){
        el.classList.remove('player--winner')
    })

    image.style.visibility = 'hidden'
    document.querySelectorAll('.score, .current-score').forEach(function (el){
        el.textContent = '0'
    })

    if(!active.classList.contains('player--0')) {
        active.classList.remove('player--active')
        document.querySelector('.player--0').classList.add('player--active')
    }

    document.querySelector('.btn--roll').classList.remove('hidden')
    document.querySelector('.btn--hold').classList.remove('hidden')
}

function resetPage(){
    window.location.reload()
}

function openRulesPage(){
    document.querySelector('.rules_modal').classList.remove('hidden')
    document.querySelector('.overlay').classList.remove('hidden')
}

function closeRulesPage(){
    document.querySelector('.rules_modal').classList.add('hidden')
    document.querySelector('.overlay').classList.add('hidden')
}
const rollButton = document.querySelector('.btn--roll')
const holdButton = document.querySelector('.btn--hold')
const resetButton = document.querySelector('.btn--new')
const confirmButton = document.querySelector('.confirm')
const resetNamesButton = document.querySelector('.resetNames')
const openRulesButton = document.querySelector('.rules')
const closeRulesButton = document.querySelector('.close_modal')

let image = document.querySelector('.dice')

// rollButton.addEventListener('click',playDice)
holdButton.addEventListener('click',switchPlayer)
resetButton.addEventListener('click',resetGame)
confirmButton.addEventListener('click',confirmNames)
resetNamesButton.addEventListener('click',resetPage)
openRulesButton.addEventListener('click',openRulesPage)
closeRulesButton.addEventListener('click',closeRulesPage)

