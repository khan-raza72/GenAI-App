/* function declaration (named function) */
// it works because function declaration is hoisted
function f1() {
    console.log("Function Declaration"); //it is hoisted
}   

/* function expression (anonymous function) */
const f2 = function() {
    console.log("Function Expression");// it is not hoisted
}

/* arrow function (lambda function) */
const f3 = (username) => {
    console.log("Arrow Function", username);// it is not hoisted
    console.log("another line of f3 function");
} 


/* default parameters */
function sayHello(name="unknown") {
    console.log("hi  " + name);
}
sayHello("RAZA"); // Hello, RAZA

/* ananonymous function with default parameter */
setTimeout(function(){
    console.log("i am ananymous function");
}, 2000);

/* IIFE - Immediately Invoked Function Expression */
(function() {
    console.log("IIFE - Immediately Invoked Function Expression");
})
/*ARGUMENTS OBJECT*/
function f5() {
    for (let arg of arguments) {
        console.log(arg);
    }
}
//f5("JAUNPUR", "INDIA", "UTTAR PRADESH"); // it will print all the arguments passed to the function


/* constructor function */
function Person(name, age) {

    this.name = name;
    this.age = age;
    console.log(this);
}   
const p1 = new Person("RAZA", 20);
console.log(p1.name, p1.age); // RAZA 20

/* generator function */
function* generatorFunction() {
    yield "First";
    yield "Second";
    yield "Third";
}
const gen = generatorFunction();
/*console.log(gen.next()); // First
console.log(gen.next()); // Second
console.log(gen.next()); // Third
console.log(gen.next()); // undefined (no more values to yield)
*/
let obj;
obj = gen.next();
while (!obj.done) {
    console.log(obj.value);
    obj = gen.next();
}

/* async function */
