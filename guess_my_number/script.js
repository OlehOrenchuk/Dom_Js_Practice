'use strict';

function generateRandom(min = +(document.querySelector('.first_boundary').value),
                        max = +(document.querySelector('.second_boundary').value)) {
  let rand = (Math.round(Math.random() * (max - min))) + min

  if(rand !== 0) {
    return rand
  }
  else {
    return generateRandom()
  }
}

document.querySelector('.confirm').addEventListener('click', function(){
  const first_boundary = (document.querySelector('.first_boundary').value)
  const second_boundary = (document.querySelector('.second_boundary').value)
  if(first_boundary && second_boundary) {
    document.querySelector('nav').style.visibility = 'hidden'
    document.querySelector('.between').textContent = `(Between ${first_boundary} and ${second_boundary})`
    document.body.style.backgroundColor = '#222'
    document.querySelector('.again').style.visibility = 'visible'
    document.querySelector('main').style.visibility = 'visible'
    document.querySelector('.reset').style.visibility = 'visible'
    globalThis.value = generateRandom()
  }
  else {
    alert("Error! Enter first and second boundaries!")
  }
})

document.querySelector('.check').addEventListener('click', function(){
  const guess = +(document.querySelector('.guess').value)
  if(!guess) {
    document.querySelector('.message').textContent = 'Enter not null number!'
  }

  else if(guess === value) {
    document.querySelector('.message').textContent = 'Correct Number!'
    document.body.style.backgroundColor = 'darkgreen'
    document.querySelector('.guess').value = ''
    document.querySelector('.number').textContent = value

    if(+(document.querySelector('.highscore').textContent) < +(document.querySelector('.score').textContent)) {
      document.querySelector('.highscore').textContent = document.querySelector('.score').textContent
    }

  }
  else if(guess > value) {
    document.body.style.backgroundColor = 'darkred'
    document.querySelector('.message').textContent = `Oops! ${document.querySelector('.guess').value} is too high!`
    document.querySelector('.guess').value = ''
    document.querySelector('.score').textContent -= '3'
  }
  else if(guess < value) {
    document.body.style.backgroundColor = 'darkred'
    document.querySelector('.message').textContent = `Oops! ${document.querySelector('.guess').value} is too low!`
    document.querySelector('.guess').value = ''
    document.querySelector('.score').textContent -= '3'
  }

  if(document.querySelector('.score').textContent < 0) {
    document.querySelector('main').style.visibility = 'hidden'

    let newDiv = document.createElement("div")
    newDiv.className = 'help_main'
    document.body.insertBefore(newDiv, document.querySelector('main'))
    document.querySelector('.help_main').textContent = 'YOU LOSE!'
    document.querySelector('h1').textContent = 'Correct Number Was'
    document.querySelector('.number').textContent = value
    }
})

document.querySelector('.again').addEventListener('click', function(){
  globalThis.value = generateRandom()
  document.body.style.backgroundColor = '#222'
  document.querySelector('.number').textContent = "?"
  document.querySelector('.score').textContent = '20'
  document.querySelector('main').style.visibility = 'visible'
  document.querySelector('.message').textContent = 'Start guessing...'
  document.querySelector('h1').textContent = 'Guess My Number!'

  if(document.querySelector('.help_main')) {
    document.querySelector('.help_main').remove()
  }

})

document.querySelector('.reset').addEventListener('click', function(){
  window.location.reload();
})
