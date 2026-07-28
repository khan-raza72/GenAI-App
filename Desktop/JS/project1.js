let targetColor="";
let score=0;
let time=30;
let timer;
let colors=["red","orange","green","black","blue","yellow","hotpink","brown","gray","maroon","purple","cyan","lime","navy","teal","olive"];
const grid=document.getElementById("grid");
const targetColorDisplay=document.getElementById("target-Color");
const scoreDisplay=document.getElementById("score");
const timeDisplay=document.getElementById("time");

function getRandomColor() {

}

function shuffleArray(array) {
    for(let i=color.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        colors[i],colors[j]=colors[j],colors[i];



}
    return array;}
function createGrid() {

   grid.innerHTML="";
   colors=shuffleArray(colors);
   targetColor=colors[Math.floor(Math.random()*16)];
   targetColorDisplay.textContent=targetColor;
   colors.forEach(color=>{
       const box=document.createElement("div");
       box.className="color-box";
       box.style.backgroundColor=color;
       box.addEventListener("click",()=>{handleClick(color)});
       gridd.appendChild(box);

    });

       grid.appendChild(box);

}

function handleClick(selectedColor) {
    if(selectedColor===targetColor){
        score++;
        scoreDisplay.textContent=score;
        createGrid();
    }
}

function startGame() {
    alert("hello");
    score=0;
    time=30;
    scoreDisplay.textContent=score;
    timeDisplay.textContent=time;
    createGrid();
    clearInterval(timer);
    timer=setInterval(()=>{
        time--;
        timeDisplay.textContent=time;
        if(time===0){
            clearInterval(timer);
            alert("⏱️Time Over! Your score is: "+score);


colorDiv
        }
    },1000);











}