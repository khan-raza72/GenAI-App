 // Default Parameters in Functions

// Example 1: Function with default parameter
function f5(username="unknown") {
    console.log("Hello, " + username);
}
//f5("RAZA"); // Hello, RAZA
//f5(); // Hello, unknown

//  anonymous function 
let f6 = function(username="guest") {
    console.log("Welcome, " + username);
}
//f6("RAZA"); // Welcome, RAZA
//f6(); // Welcome, guest

// arrow function
let f7 = (username="member") => {
    console.log("Hi, " + username);
}
//f7("RAZA"); // Hi, RAZA
//f7(); // Hi, member

//IIFE FUNCTION with default parameter

(function(username="IIFE") {
    console.log("Hello, " + username);
})();
// Hello, IIFE


// constructor 
function Person(name,age,gender,country="Unknown") {
    console.log(this);
    this.name=name;

    this.age=age;
    this.gender=gender;
    this.country=country;
}
let Person1 = new Person("RAZA", 25, "Male", "Pakistan");
let Person2 = new Person("Aisha", 22, "Female");
console.log(Person1, Person2);

// Output:
// Person1: { name: 'RAZA', age: 25, gender: 'Male', country: 'Pakistan' }
// Person2: { name: 'Aisha', age: 22, gender: 'Female', country: 'Unknown' }


// generator function
function* counter() {
    yield 1;
    yield 2;
    yield 3;
}           
const a=counter();
//console.log(a.next().value); // 1
//console.log(a.next().value); // 2
//console.log(a.next().value); // 3 