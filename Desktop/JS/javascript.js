//controlintructions 
/* 
1) Decision control
2) iterative control 
3) Switch case control

1)
Decision  control 

1, if
2, if else 
3, if else if 
4, ?:

switch case control 



Iterative control  (loop)
1, while 
2, do while 
3, for 
4, for in 
5, for of  */
 
/*
let x=87;
if(x>0){ console.log("positive");}
if(x<=0){console.log("negetive");
}


let x=87;
if(x>0){ console.log("positive");}
else(x<=0){console.log("negetive");
}



let marks=87;
if(marks>=90){console.log("outstanding");}
else if(marks>=80){console.log("excellent");}
else if(marks>=70){console.log("very good " );}
else if(marks>=60){ console.log("good");}
else if (marks>=50){console.log("satisfactory");}
else if (marks>=40){console.log("bach gye");}
else {
   console.log("padhai chhod de");
} 
   
  // conditional (ternary) operator
 //condition?expression1:expression2;
 let x=17;
   x>0?console.log("positive"):console.log("negative"); */

   let x=1;
   let y=1;
   switch(x)
   {
      case y>0:
         console.log(" sunday");
      case 2: 
         console.log("monday");
      case 3:
         console.log("tuesday");
      case 4:
         console.log("wednesday");
      case 5:
         console.log("thursday");
      case 6:
         console.log("friday");
      case 7:
         console.log("saturday");
      default:
         console.log("invalid value");
   
      
   }






// conersion
//let x="72";
//x=Number(x);
//console.log(typeof x,x);

//let x="37.738";

//x=parseFloat(x);
//console.log(typeof x,x);



/*console.log("hello world");
// comment 
/* multi line comment 


let a = 5;
let b = 10;
let c = a + b;
console.log(c);


variable  [var, let, const]   
var a=7;// function scoped variable=
let b=10; // block scoped variable
const c=15; */


/* 
 function test(){

    y=50;// global variable
    
  { 
    var x=20;// local variable
    let z=30; // block scoped variable
    const w=40; // block scoped constant variable cannot be changed
    // w=w+2; // error cannot reassign constant variable
    console.log(z);
    console.log(w);
  }

    
    console.log(x);
    //console.log(z);
    //console.log(w);
    console.log(y);



}
test();


/*   first type variable  

a=20;
b=30;
console.log(a+b); */    


//                                      data types in javascript
/*
1. primitive data types
   a. number = 1,2,3,4,5,6,7,8,9
   b. string = "hello"
   c. boolean = true/false
   d. null = null
   e. undefined = undefined
   f. symbol = Symbol() // unique identifier
   g. bigint = 1234567890123456789012345678901234567890n

2. reference data types

   a. object = { key: "value" }
   b. array = [1, 2, 3]
   c. function = function() {}
   // in syllabus 
typeof operator return type of data/variable


   d. date = new Date()
   e. regex = /ab+c/
   f. map = new Map()
   g. set = new Set()
   h. weakmap = new WeakMap()
   i. weakset = new WeakSet()
*/

/*

let a = true; // boolean
let b=54.67; // number
console.log(typeof a, typeof b);

//instance object /reference data type

let student={
    name:"RAZA KHAN",
    age:20,
    address:"jaunpur",
}
console.log(student);
console.log(typeof student);
console.log(student.name);
console.log(student.age);
console.log(student.address);

// array object 

let arr=[1,2,3,4,5,"hello",true];
console.log(arr);
console.log(typeof arr);
console.log(arr[0]);
console.log(arr[5]);
console.log(arr[6]);

// function object
console.log(test instanceof Object);                      */



//                                OPERATORS IN JAVASCRIPT
/* 1. arithmetic operators + - * / % ++ --
  2.assignments operators = += -= *= /= %=
  3.comparison operators = == === != !== > < >= <=
  4.logical operators = && || !
  5.bitwise operators = & | ^ ~ << >> >>>
  6.string operators = + +=
  7. typeof operator = typeof variable
  8. delete operator = delete object.property
*/
/*
let x=10;
let y=5;
let z=6%7;
console.log(z);
console.log(x+y);
console.log(x-y);
console.log(x*y);
console.log(x/y);
x++; //post increment
y--; //post decrement
console.log(x);
console.log(y);
++x; // pre increment
--y;    // pre decrement
console.log(x);
console.log(y);
 // match floor value
console.log(Math.floor(1224/10));

// decrement assignment operator
let a=10;
a=--a; // a=a-1
console.log(a);   */



// java script date and time
/*
let d1=new Date();
let d2=new Date("2025-05-10");
let d3=new Date(2025,4); // year, month (0-11)
let d4=new Date(2025,4,5); // year, month, date
let d5=new Date(2025,4,5,10); // year, month, date, hours
let d6=new Date(2025,4,5,10,20); // year, month, date, hours, minutes
let d7=new Date(2025,4,5,10,20,30); // year, month, date, hours, minutes, seconds
let d8=new Date(12341315); // milliseconds from 1 jan 1970
/* 
console.log (d1);
console.log(d2);
console.log(d3);
console.log(d4);
console.log(d5);
console.log(d6);
console.log(d7);
console.log(d8); */


//console.log(d1.toDateString());
//console.log(d1.toTimeString());
//console.log(d1.toString());
 /*  
console.log(d1.getDate());
console.log(d1.getDay());
console.log(d1.getMonth());
console.log(d1.getFullYear());
console.log(d1.getHours());
console.log(d1.getMinutes());
console.log(d1.getSeconds());
console.log(d1.getMilliseconds());
console.log(d1.getTime());
console.log(Date.now());
console.log(d1.getTimezoneOffset());
console.log(d1.toLocaleDateString());
console.log(d1.toLocaleTimeString());
console.log(d1.toLocaleString()); */
/*
d3.setDate(25);
//d3.setDay(5);
d3.setMonth(11);
d3.setFullYear(2025);
console.log(d3.toDateString());
*/