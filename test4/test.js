'use strict';

// for (let i=1;i<6;i++){
//   setTimeout(() => {
//     console.log("i have wait"+i+"seconds!")
//   },1000*i);
// }

for (var j = 0; j < 6; j++){
  setTimeout(() => {
    console.log("i have wait" + j + "seconds")
  },1000*j);
}