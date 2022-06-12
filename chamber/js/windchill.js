//input- 
let tempF = parseFloat(document.querySelector('tempF').value);
let speed = parseFloat(document.querySelector('speed').value);
//let windchill = 'N/A';
//processing

let windchill = 0;
if ((tempF <= 50) && speed >= 3) {               
    windchill = windChill(tempF, speed);
    windchill = windchill.toFixed(0);
    windchill = `${windchill}&#8457;`;
}else {
    windchill = 'N/A';
}
//output         
document.querySelector("#windchill").innerHTML = windchill;

function windChill(t, s) {
return (35.74 + 0.6215 * t - 35.75 * s ** 0.16 + 0.4275 * t * s ** 0.16);
}