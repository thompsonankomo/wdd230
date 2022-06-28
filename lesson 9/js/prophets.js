
    const requestURL = 'https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json';
    const cards = document.querySelector('.cards');
    
    function displayProphets(prophet) {
        // Create elements to add to the document
        let card = document.createElement('section');
        let h2 = document.createElement('h2');
        let portrait = document.createElement('img');
        let brithdate = document.createElement('p');
        let brithplace = document.createElement('p');
    
        // Change the textContent property of the h2 element to contain the prophet's full name
        h2.textContent = `${prophet.name} ${prophet.lastname}`;
    
        // Build the image attributes by using the setAttribute method for the src, alt, and loading attribute values. (Fill in the blank with the appropriate variable).
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portait of ${prophet.name} ${prophet.lastname} - ${prophet.order}th Latter-day President`);
        portrait.setAttribute('loading', 'lazy');
        
        // Add Date of Bith and Place of Birth as paragraphs
        brithdate.textContent = `Date of Birth: ${prophet.birthdate}`;
        brithplace.textContent = `Place of Birth: ${prophet.birthplace}`;
    
        // Add/append the section(card) with the h2 element
        card.appendChild(h2);
        card.appendChild(brithdate);
        card.appendChild(brithplace);
        card.appendChild(portrait);
    
        // Add/append the existing HTML div with the cards class with the section(card)
        cards.appendChild(card);
    }
    
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        
        .then(function (jsonObject) {
            const prophets = jsonObject['prophets'];
            prophets.forEach(displayProphets);
        });
    
