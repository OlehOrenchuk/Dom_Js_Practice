'use strict';

// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/*
  implementing displaying history of income and outcome movements
*/

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a,b) => a - b) : movements

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit': 'withdrawal'

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
}

/*
  implementing converting user`s names to username briefly
*/

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
        .toLowerCase()
        .split(' ')
        .reduce((acc,curr) => {
          return acc + curr[0]
        },'')
  })

}

createUserNames(accounts);

/*
  implementing current balance
*/

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc,curr) => {
    return acc + curr
  },0)
  labelBalance.textContent = `${acc.balance} €`
}

/*
  implementing in out interest summary calculation
*/

const calcDisplaySummary = function (acc) {

  labelSumIn.textContent = `${acc.movements
      .filter(el => el > 0)
      .reduce((acc, curr) => acc + curr)}€`

  labelSumOut.textContent = `${Math.abs(acc.movements
      .filter(el => el < 0)
      .reduce((acc, curr) => acc + curr))}€`

  labelSumInterest.textContent = `${acc.movements
      .filter(mov => mov >0)
      .map(deposit => (deposit * acc.interestRate)/100)
      .filter((int, i, arr)=> int >= 1)
      .reduce((acc, int) => acc + int)}`

}
/*
 implementing updating UI
*/

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

/*
  implementing login
*/

let currentAccount;

btnLogin.addEventListener('click',function (e) {
  // Prevent form from submitting
  e.preventDefault()

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)

  if(currentAccount?.pin === +(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = ''
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
})
/*
 implementing loan
*/

btnLoan.addEventListener('click',function (e){
  e.preventDefault()

  const amount = +(inputLoanAmount.value)

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount)

    //Update UI
    updateUI(currentAccount)
  }
})
/*
 implementing transfer
*/

btnTransfer.addEventListener('click',function (e){
  e.preventDefault()
  const amount = +(inputTransferAmount.value)
  const receiverAcc = accounts.find(
      acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
  if(
      amount > 0 &&
      receiverAcc &&
      currentAccount.balance >= amount &&
      receiverAcc?.username !== currentAccount.username) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
})

/*
  Implementing deleting current account
*/

btnClose.addEventListener('click',function (e) {
  e.preventDefault()
  if(inputCloseUsername.value === currentAccount.username &&
  +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(el => el.username === inputCloseUsername.value)
    accounts.splice(index,1)
    inputCloseUsername.value = inputClosePin.value = '';
    inputClosePin.blur();

    // Hide UI and welcome message
    labelWelcome.textContent = `Log in to get started`
    containerApp.style.opacity = 0;
  }
})

let sorted = false
btnSort.addEventListener('click',function (e) {
  e.preventDefault()
  displayMovements(currentAccount.movements, !sorted)
  sorted = !sorted
})
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
//
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//
// console.log(movements);
// const result = Math.max(...movements)
// console.log(result);
/////////////////////////////////////////////////


///////////////////////////////////////
// Coding Challenge #1

/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age,
and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy.
 A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs!
 So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// function checkDogs(dogsJulia,dogsKate) {
//   const juliaKate = dogsJulia.slice(1,-2).concat(dogsKate)
//   console.log(juliaKate)
//   juliaKate.forEach(function (el,i){
//     el > 3 ? (console.log(`Dog number ${i+1} is an adult, and is ${el} years old`)) : (console.log(`Dog number ${i+1} is still a puppy 🐶`))
//   })
// }
//
// checkDogs([3, 5, 2, 12, 7],[4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// const eurToUsd = 1.1
//
// const movementsUSD = movements.map((mov) => ((mov*eurToUsd).toFixed(2)))
// console.log(movements);
// console.log(movementsUSD);

///////////////////////////////////////
// Coding Challenge #2

/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages
and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge.
If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// function calcAverageHumanAge(ages){
//   return ages
//       .map((el) => (el <= 2) ? (el * 2) : (16 + el * 4))
//       .filter(el => el>=18)
//       .reduce((acc,curr,i,arr) => {
//         return acc + curr / arr.length
//       },0)
// }
//
// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
//
// const firstWithdrawal = movements.find(mov => mov < 0)
// console.log(firstWithdrawal);
//
// console.log(accounts)
//
// const account = accounts.find(acc => acc.owner === 'Jessica Davis')
// console.log(account)

// const result = movements.find(el => el < 200)
// console.log(result)
// const result2 = movements.findIndex(el => el < 200)
// console.log(result2)
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const overalBalance = accounts
//     .map(acc => acc.movements)
//     .flat()
//     .reduce((acc,mov) => acc + mov,0)
// console.log(overalBalance)
//
// const overalBalance2 = accounts
//     .flatMap(acc => acc.movements)
//     .reduce((acc,mov) => acc + mov,0)
// console.log(overalBalance2)