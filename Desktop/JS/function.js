//DOM  document object model
//let a =document.querySelectorAll('h1');

//let h =document.getElementsByClassName('h1');
//let a =document.getElementById('h1');
//console.log(a); 
//console.log(a[0].tagName);
//console.log(a[0].textContent);
//a[0].textContent="RAZA KHAN";
/*
let h =document.getElementsByTagName('h1');
console.log(h[0],h[1]);
console.log(h[0].textContent);
console.log(h[0].innerHTML);
console.log(h[0].innerText);


let a =document.getElementById("heading 1");
a.style.color="purple";
a.style.textDecoration="underline";      



let p = document.createElement("p");
p.textContent = "This is a new paragraph.";
p.id = "paragraph 1";
p.style.color = "blue";
document.body.appendChild(p);

let a =document.getElementById("heading 1");
a.remove();
*/

            //Events in  handling JavaScript
 document.getElementById("myButton 1").addEventListener('click',function makeMeRed(){
    let a = document.getElementById("heading 1");
    a.style.color = "red";
});

document.getElementById("myButton 2").addEventListener('click',function makeMeRed(){
    let a = document.getElementById("heading 1");
    a.style.color = "green";
});

document.getElementById("myButton 3").addEventListener('click',function makeMeRed(){
    let a = document.getElementById("heading 1");
    a.style.color = "blue";
});

 