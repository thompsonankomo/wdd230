const requestURL = 'https://thompsonankomo.github.io/wdd230/chamber/json/data.json';
const grid = document.querySelector('.grid');

function displaycompanies(companies) {
    // Create elements to add to the document
    let card = document.createElement('section');
    let img = document.createElement('img');
    let name = document.createElement('h3');
    let address = document.createElement('p');
    let phone = document.createElement('p');

    // Build the image attributes by using the setAttribute method for the src, alt, and loading attribute values. (Fill in the blank with the appropriate variable).
    img.setAttribute('src', company.imageurl);
    img.setAttribute('alt', `logo of ${company.name}`);
    img.setAttribute('loading', 'lazy');
    
    // name, address and url of the busniess
    name.textContent = `${company.name}`;
    address.textContent = `${company.address}`;
    phone.textContent = `${company.phone}`;
    var linkText = document.createTextNode("Website");
    url.appendChild(linkText);
    url.title = "Website";
    url.href = `${company.url}`;

    // Add/append the section(card) with the h2 element
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(address);
    card.appendChild(phone);

    card.appendChild(imageurl);
    card.appendChild(website)

    // Add/append the existing HTML div with the cards class with the section(card)
    grid.appendChild(card);
}

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    
    .then(function (jsonObject) {
        const company = jsonObject['company'];
        company.forEach(displaycompany);
    });