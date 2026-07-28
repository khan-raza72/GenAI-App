// ========================================
// BASIC ARITHMETIC OPERATIONS
// ========================================
// let a = 33;
// let b = 44;
// console.log(a + b + '  is the sum of a and b');

// ========================================
// STRING CONCATENATION EXAMPLES
// ========================================
// console.log("10" + 10);           // 1010
// console.log("10" + 10 + 10);      // 101010

// ========================================
// TYPE COERCION EXAMPLES
// ========================================
// console.log(10 + "10");           // 1010
// console.log("1" - 1);             // 0
// console.log("1" * 1);             // 1
// console.log("1" / 1);             // 1
// console.log("1" % 1);             // 0

// ========================================
// USER INPUT AND GREETING
// ========================================
// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("What is your age? ", (userAge) => {
//   console.log("Hello " + userAge + " welcome to the world of programming");
//   rl.close();
// });
// let age= Number(prompt("What is your age?"));
// console.log("Hello " + age + " welcome to the world of programming");

// TYPE CASTING EXAMPLES
// console.log(Number("123"));        // 123
// console.log(String(123));        // "123"

//  SWAPPING

// let x = 5;
// let y = 10;

// // Using a temporary variable
// let temp = x;
// x = y;
// y = temp;
// console.log("After swapping using a temporary variable: x =", x, "y =", y);

// // Using destructuring assignment
// [x, y] = [y, x];

// vote checker

// let ans = Number(prompt("what is your age ?"));

// if (isNaN(ans)) {
//     console.log("you can vote ")

// } else {
//     console.log("you can not vote")
// }

//  shop payable discount

// let amount = Number(prompt(" what is the final amount ?"));
// let dis = 0;
// if (amount > 0 && amount <= 5000) {
//   dis = 0;
// } else if (amount > 5001 && amount < 7000) {
//   dis = 5;
// } else if (amount > 7001 && amount < 9000) {
//   dis = 10;
// } else if (amount > 9000) {
//   dis = 20;
// }
// console.log(amount - Math.floor((dis * amount) / 100));

//  bijli unit to rs converter

// let unit = prompt("enter electricity unit"); // 700
// let amount = 0;

// if (unit > 400) {
//   amount = (unit - 400) * 13; //3900
//   unit = 400;
// }
// if (unit > 200 && unit <= 400) {
//   amount += (unit - 200) * 8; //1600
//   unit = 200;
// }
// if (unit > 100 && unit <= 200) {
//   amount += (unit - 100) * 6; //
//   unit = 100;
// }

// amount += unit * 4;

//console.log("Total amount is:  ", amount);

// INR DOMINATION

// let amount = prompt("enter the amount");
// if (amount >= 500) {
//   console.log("500rs NOTE :" + Math.floor(amount / 500));
//   amount = amount % 500;
// }
// if (amount >= 200) {
//   console.log("200rs note :", +Math.floor(amount / 200));
//   amount = amount % 200;
// }

// if (amount >= 100) {
//   console.log("100rs note :" + Math.floor(amount / 100));
//   amount = amount % 100;
// }

// if (amount >= 50) {
//   console.log("50rs note :" + Math.floor(amount / 50));
//   amount = amount % 50;
// }
// if (amount >= 20) {
//   console.log("20rs note :" + Math.floor(amount / 20));
//   amount = amount % 20;
// }
// if (amount >= 10) {
//   console.log("10rs note :" + Math.floor(amount / 10));
//   amount = amount % 10;
// }
// if (amount >= 5) {
//   console.log("5rs note :" + Math.floor(amount / 5));
//   amount = amount % 5;
// }

// if (amount >= 2) {
//   console.log("2rs note :" + Math.floor(amount / 2));
//   amount = amount % 2;
// }

// if (amount === 1) {
//   console.log("1rs note :" + amount);
// }

// nested ternary operator

// let num=prompt("enter the number ");

// console.log(num>0?"positive": num<0?"negetive":"zero")

// switch case

// let day = prompt("enter the day of the week");

// switch (day.toLowerCase()) {
//     case "monday":
//         console.log("monday");
//         break;
//     case "tuesday":
//         console.log("tuesday");
//         break;
//     case "wednesday":
//         console.log("wednesday");
//         break;
//     case "thursday":
//         console.log("thursday");
//         break;
//     case "friday":
//         console.log("friday");
//         break;
//     case "saturday":
//         console.log("saturday");
//         break;
//     case "sunday":
//         console.log("sunday");
//         break;
//     default:
//         console.log("invalid day");
// }

// lecture part 3  everything about loops | DSA using JS

// whithout using loops cant be build whatsapp instagram facebook etc

//FOR

//for(srart; end;change){
//     //code to be executed
// }

// for (let i = 0; i < 10; i++) {
//     console.log("hello world");
// }

// sum of n natural numbers
// var ans = Number(prompt("enter the number"));
// if (isNaN(ans)) {
//   console.log("invalid input");
// } else {
//   if (ans > 0) {
//    var sum = 0;
//     for (let i = 1; i <= ans; i++) {
//       sum = sum + i;
//     }
//     console.log("the sum of first " + ans + " natural numbers is: " + sum);
//   } else {
//     console.log("should be a positive number and more than zero");
//   }
// }


// --------------factorial of a number-------------------------------------





// let num = Number(prompt("enter the number"));
// if (isNaN(num)) {
//   console.log("invalid input");
// } else {
//   if (num > 0) {
//     let fact = 1;
//     for (let i = 1; i <= num; i++) {
//       fact = fact * i;
//     }
//     console.log("the factorial of " + num + " is: " + fact);
//   } else {
//     console.log("should be a positive number and more than zero");
//   }
// }


//------------------------------factor of number

// let num = Number(prompt("enter the number"));
// if (isNaN(num)) {
//   console.log("invalid input");
// } else {
//   if (num > 0) {
//     for (let i = 1; i <=Math.floor(num / 2); i++) {
//       if (num % i === 0) {
//         console.log(i);
//       }
//     }
 // console.log(num);
//   } else {
//     console.log("should be a positive number and more than zero");
//   }
// }




//-----------------prime number ----------------------

