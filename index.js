import { data } from "./data.js";
let allPoints = 36;
let memberingPercentage = 0.5;
let tajweedPercentage = 0.5;
let membering = 5;
let tajweed = 8;

let tr = document.createElement("tr");
for (let i = -1; i <= Object.entries(data[0].tasmeaa).length; i++) {
   let td = document.createElement("td");
   let tem = 4;
   if (i == -1) {
      tem = "الاسم التاريخ";
   } else if (i > -1 && i != 10) {
      tem = Object.entries(data[0].tasmeaa)[i][0].slice(5);
   } else if (i == 10) {
      tem = "المجموع";
   }
   let textnode = document.createTextNode(tem);
   td.appendChild(textnode);
   tr.appendChild(td);
   var test = document.getElementsByTagName("thead")[0].appendChild(tr);
}

for (let id = 0; id < data.length; id++) {
   let tr = document.createElement("tr");
   let td = document.createElement("td");
   let textnode = document.createTextNode(data[id].name);
   td.appendChild(textnode);
   tr.appendChild(td);
   var test = document.getElementsByTagName("tbody")[0].appendChild(tr);

   let sumPoints = 0;
   let dataOfStudenet = `${data[id].name}\n`;
   dataOfStudenet += data[id].class;
   let completDegree = 0;
   for (let i = 0; i < Object.entries(data[id].tasmeaa).length; i++) {
      let ex = Object.entries(data[id].tasmeaa)[i][1].pages;
      let memberingDegree = 0;
      let tajweedDegree = 0;
      let pointsOfQuite = Object.entries(data[id].tasmeaa)[i][1].pointsOfQuite;
      let minutesLate = Object.entries(data[id].tasmeaa)[i][1].minutesLate;
      console.log("🚀 ==> minutesLate:", minutesLate);

      let pointsOfNoLate = ((minutesLate = 0) ? 10 : 0);
      console.log("🚀 ==> pointsOfNoLate:", pointsOfNoLate);
      completDegree += ex.filter((el) => {
         return el[1] + el[2] == 13;
      }).length;

      for (let i = 0; i < ex.length; i++) {
         const element = ex[i];
         memberingDegree += element[1];
         tajweedDegree += element[2];
      }
      dataOfStudenet += "\n";
      dataOfStudenet += Object.entries(data[id].tasmeaa)[i][0];
      dataOfStudenet += " => ";
      let pointsPerDay = calcPointsPerDay(
         calcDailyWard(data[id].class),
         ex.length,
         memberingDegree,
         tajweedDegree
      );
      dataOfStudenet += pointsPerDay;
      sumPoints += pointsPerDay;
      sumPoints = Math.ceil(sumPoints);

      let td = document.createElement("td");
      let textnode = document.createTextNode(
         `${Math.ceil(pointsPerDay)} + ${pointsOfQuite} + ${pointsOfNoLate}`
      );
      td.appendChild(textnode);
      tr.appendChild(td);
      var test = document.getElementsByTagName("tbody")[0].appendChild(tr);
   }

   let td2 = document.createElement("td");
   let textnode2 = document.createTextNode(sumPoints);
   td2.appendChild(textnode2);
   tr.appendChild(td2);

   dataOfStudenet += `\n مجموع نقاط الطالب ${sumPoints}`;
   dataOfStudenet += `\n عدد العلامات الكاملة ${completDegree}`;
   console.log(dataOfStudenet);
}

// var btn = document.getElementById("btn");
// btn.addEventListener("click", () => {
//    var dailyWard = document.getElementById("dailyWard").value;
//    var memberingPerDay = document.getElementById("membering").value;
//    var tajweedPerDay = document.getElementById("tjweed").value;
//    var numPagesPerDay = document.getElementById("page").value;
//    document.getElementsByTagName("tbody")[0].innerText = calcPointsPerDay(
//       dailyWard,
//       numPagesPerDay,
//       memberingPerDay,
//       tajweedPerDay
//    );
// });

function calcPointsPerDay(
   dailyWard,
   numPagesPerDay,
   memberingPerDay,
   tajweedPerDay
) {
   var memberingPoints =
      ((allPoints / dailyWard) * memberingPercentage) / membering;
   var tajweedPoints = ((allPoints / dailyWard) * tajweedPercentage) / tajweed;
   var memberingPointsPerDay = memberingPerDay * memberingPoints;
   var tajweedPointsPerDay = tajweedPerDay * tajweedPoints;
   var x = Math.round(memberingPointsPerDay + tajweedPointsPerDay);
   // return `
   // الورد اليومي للطالب ${dailyWard}
   // الصفحات التي سمّعها الطالب على المدرس اليوم ${numPagesPerDay}
   // نقاط الحفظ التي حصل عليها الطالب اليوم ${memberingPointsPerDay}
   // نقاط التجويد التي حصل عليها الطالب اليوم ${tajweedPointsPerDay}
   // مجموع النقاط اليوم ${memberingPointsPerDay + tajweedPointsPerDay}
   // مجموع النقاط اليوم ${x}
   // `;
   // return x;
   // return Number((memberingPointsPerDay + tajweedPointsPerDay).toFixed(1));
   return memberingPointsPerDay + tajweedPointsPerDay;
}
function calcDailyWard(classStudent) {
   if (classStudent == 4) {
      return 3;
   } else if (classStudent == 5) {
      return 3;
   } else if (classStudent == 6) {
      return 3;
   } else if (classStudent == 7) {
      return 4;
   } else if (classStudent == 8) {
      return 6;
   } else if (classStudent == 9) {
      return 6;
   } else if (classStudent == 10) {
      return 6;
   } else if (classStudent == 11) {
      return 8;
   }
}

// Add Points to Document

// let t2 = document.createElement("td");
// t2.appendChild(textnode);
// tr.appendChild(t2);
// tr.appendChild(td);
console.log("🚀 ==> test:", test);
