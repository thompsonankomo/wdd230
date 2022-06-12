//last modified
document.querySelector('#datemod').textContent = document.lastModified;

//get current time
document.querySelector('#year').textContent = new Date().getFullYear(); 

// select the elements to manipulate (output to)
const datefield = document.querySelector("#currentDate");

// derive the current date using a date object
const now = new Date();
const fulldate = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
	now
);
// long, medium, short options ... try them

datefield.innerHTML = `<em>${fulldate}</em>`;

//get week day

let day = now.getDay();
let events = '🤝🏼 Come join us for the chamber meet and greet Wednesday at 7:00 p.m.'

if (day == 1 || day == 2) {
	document.querySelector('#banner').innerHTML = events;
}

// initialize display elements
const visitsDisplay = document.querySelector(".today");
const todayDisplay = document.querySelector(".frequency");

todayDisplay.textContent = Date.now();
// get the stored value in localStorage
let numVisits = Number(window.localStorage.getItem("visits-ls"));

// determine if this is the first visit or display the number of visits.
if (numVisits !== 0) {
	visitsDisplay.textContent = numVisits;
} else {
	visitsDisplay.textContent = `This is your first visit!`;
}

// increment the number of visits.
numVisits++;
// store the new number of visits value
localStorage.setItem("visits-ls", numVisits);

// show todays date.