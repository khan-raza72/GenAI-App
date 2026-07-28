let prompt=require("prompt-sync")();
let n=prompt("Enter the number : ");
// for (let i = 0; i <= n; i++) {// control the number of rows
//     for (let j = 0; j <= n; j++) { // control the number of columns
//         process.stdout.write("* "); // print the star and a space
//     }
//     process.stdout.write("\n");
// }
//                    ----------triangle pattern--------


// for(let i=0;i<=n;i++){
//     for(let j=0;j<=i;j++){
//         process.stdout.write("* ");
//     }
//     console.log();
// }





// number triangle pattern
// for(let i=1;i<=n;i++){
//     for(let j=1;j<=i;j++){
//         process.stdout.write(j+" ");
//     }    console.log();
// }


// alphabet triangle pattern with alphabet
// let charCode=65;
// for(let i=0;i<=n;i++){
//     for(let j=0;j<=i;j++){
//         process.stdout.write(String.fromCharCode(charCode+j)+" ");
//     }
//     console.log();
// }


//inverted right triangle pattern
// for(let i=1;i<=n;i++){
//     for(let j=n;j>=i;j--){
//         process.stdout.write("* ");
//     }    console.log();
// }



//mirrror right triangle pattern
// for(let i=1;i<=n;i++)   {
//     // print spaces by inverted loop
//     for(let j=1;j<=n-i;j++){
//         process.stdout.write("  ");
//     }

//     // print stars by normal loop
//     for(let j=1;j<=i;j++){
//         process.stdout.write("* ");
//     }
//     console.log();
//     }




//triangle center 60degree pattern with stars
//  for(let i=1;i<=n;i++){
//     // print spaces by inverted loop
//     for(let j=1;j<=n-i;j++){
//         process.stdout.write("  ");
//     }    

//     // print stars by normal loop
//     for(let j=1;j<=2*i-1;j++){
//         process.stdout.write("* ");
//     }
//     console.log();
//     }



//-----------------------------------------------------   X pattern


// outer loop = rows
for (let i = 1; i <= n; i++) {

    // inner loop = columns
    for (let j = 1; j <= n; j++) {

        // first diagonal: i == j
        // second diagonal: i + j == n + 1
        if (i == j || i + j == n + 1) {
            process.stdout.write("* ");
        } 
        else {
            process.stdout.write("  ");
        }
    }

    // row complete hone ke baad next line
    console.log();
}