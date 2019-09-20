window.addEventListener('DOMContentLoaded', (event) => {
    const monsterContainer = document.getElementById('monster-container');
    const monsterForm = document.getElementById('monster-form');
    const backButton = document.getElementById('back');
    const forwardButton = document.getElementById('forward');
    let page = 1

    function getPage(page) {
        while (monsterContainer.firstChild) {
            monsterContainer.removeChild(monsterContainer.firstChild);
          }
        fetch(`http://localhost:3000/monsters/?_limit=5&_page=${page}`)
        .then(resp => resp.json())
        .then(json => {
            for(let i = 0; i < json.length; i++) {
                const monsterName = json[i].name;
                const monsterAge = json[i].age;
                const monsterDescription = json[i].description;
    
                const newDiv = document.createElement('div');
                const newName = document.createElement('h3');
                const newAge = document.createElement('h5');
                const newDescription = document.createElement('p');
    
                newDiv.setAttribute('id', monsterName);
                newName.innerText = monsterName;
                newAge.innerText = `Age: ${monsterAge}`;
                newDescription.innerText = `Description: ${monsterDescription}`;
    
                newDiv.appendChild(newName);
                newDiv.appendChild(newAge);
                newDiv.appendChild(newDescription);
    
                monsterContainer.appendChild(newDiv);
            }
        });    
    }

    monsterForm.addEventListener('submit', (event) => {
        nameField = document.getElementById('name-field');
        ageField = document.getElementById('age-field');
        descriptionField = document.getElementById('description-field');
        monsterForm = document.getElementById('monster-form')
        monsterForm.addEventListener('submit', (event) => {
            event.preventDefault();
            fetch('http://localhost:3000/monsters', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: {
                    'name': nameField.value,
                    'age': ageField.value,
                    'description': descriptionFields.value
                }
            })
        })
    })

    backButton.addEventListener('click', (event) => {
        if(page > 1) {
            page--
        }
        getPage(page);
    })

    forwardButton.addEventListener('click', (event) => {
        page++
        getPage(page);
    })

    getPage(page);
});