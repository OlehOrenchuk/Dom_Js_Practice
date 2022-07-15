'use strict';


function switchHidden(){
    const modal = document.querySelector('.modal')
    const overlay = document.querySelector('.overlay')
    modal.className.includes('hidden') ? modal.classList.remove('hidden') : modal.classList.add('hidden')
    overlay.className.includes('hidden') ? overlay.classList.remove('hidden') : overlay.classList.add('hidden')
}

const showModalList = document.querySelectorAll('.show-modal')

showModalList.forEach(function (el,i){
    showModalList[i].addEventListener('click',switchHidden)
})

document.querySelector('.close-modal').addEventListener('click',switchHidden)
document.querySelector('.overlay').addEventListener('click',switchHidden)

document.addEventListener('keydown',function (e){
    const modal = document.querySelector('.modal')
    if(e.key === 'Escape' && !modal.className.includes('hidden')) {
        switchHidden()
    }
})