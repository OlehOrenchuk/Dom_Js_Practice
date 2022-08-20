'use strict';


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header')
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')
const nav = document.querySelector('.nav')

/*
* Implementing open/close modal "Open account"
* */

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const modalForEach = el => (el.addEventListener('click',openModal))

const closeModalEsc = function (e){
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
}

btnsOpenModal.forEach(modalForEach)
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', closeModalEsc);

/*
* Implementing closing cookies
* */

const message = document.createElement('div')
message.classList.add('cookie-message')
message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'
header.insertAdjacentElement('beforeend',message)


// header.before(message) === header.insertAdjacentElement('beforebegin',message)
// header.prepend(message) === header.insertAdjacentElement('afterbegin',message)
// header.append(message) === header.insertAdjacentElement('beforeend',message)
// header.after(message) === header.insertAdjacentElement('afterend',message)

document.querySelector('.btn--close-cookie').addEventListener('click',function () {
  message.remove()
})

// Classes
// header.classList.add()
// header.classList.remove()
// header.classList.toggle()
// header.classList.contains()

/*
* Implementing scroll "Learn more"
* */

btnScrollTo.addEventListener('click',function (e) {
  const s1coords = section1.getBoundingClientRect()

  // Scrolling
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // })
  section1.scrollIntoView({behavior:'smooth'})
})

/*
* Bad Implementing page navigation
* */

// inefficient way to attach smoothly scrolling to every button in navbar

// document.querySelectorAll('.nav__link').forEach(function (el){
//   el.addEventListener('click',function (e){
//     e.preventDefault()
//     const id = this.getAttribute('href')
//     document.querySelector(id).scrollIntoView({behavior:'smooth'})
//   })
// })

/*
* Good Implementing page navigation
* */

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click',function (e){
  e.preventDefault()

  // Matching strategy to exclude outer class(.nav__links can also be pressed)
  if(e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({behavior:'smooth'})
  }
})

/*
* Implementing tabbed component
* */

tabsContainer.addEventListener('click',function (e){
  const clicked = e.target.closest('.operations__tab')

  // Guard clause
  if(!clicked) return

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  tabsContent.forEach(t => t.classList.remove('operations__content--active'))

  // Activate tab
  clicked.classList.add('operations__tab--active')

  // Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

/*
* Implementing menu fade animation
* */

const handleHover = function (e) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')

    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this
    })
    logo.style.opacity = this
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5))

nav.addEventListener('mouseout', handleHover.bind(1))

/*
* Bad Implementing sticky navbar
* */

// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords)
// window.addEventListener('scroll',function (){
//   if(window.scrollY > initialCoords.top) nav.classList.add('sticky')
//   else nav.classList.remove('sticky')
// })

/*
* Good Implementing sticky navbar(Intersection Observer API)
* */

/*
* Good Implementing revealing elements on scroll(Intersection Observer API)
* */

/*
* Good Implementing Lazy Loading(Intersection Observer API)
* */

/*
* Implementing Slider
* */

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
          'beforeend',
          `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
        .querySelectorAll('.dots__dot')
        .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
        (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();



///////////////////////////////////
////////// Some practice //////////
///////////////////////////////////


// const randomInt = (min,max) => Math.floor(Math.random() * (max - min + 1) + min)
// const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)}`
//
// document.querySelector('.nav__link').addEventListener('click',function (e){
//   e.stopPropagation()
//   this.style.backgroundColor = randomColor()
// })
//
// document.querySelector('.nav__links').addEventListener('click',function (e){
//   this.style.backgroundColor = randomColor()
// })
//
// document.querySelector('.nav').addEventListener('click',function (e){
//   // this.style.backgroundColor = randomColor()
// })