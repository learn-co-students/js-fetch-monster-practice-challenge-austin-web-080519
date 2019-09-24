document.addEventListener('DOMContentLoaded', event => {
    const monsterList = document.getElementById('monster-container');
    const monsterForm = document.getElementById('monster-form');
    const backButton = document.getElementById('back');
    const forwardButton = document.getElementById('forward');
    let page = 1

    function thePage(page) {
        while (monsterList.firstChild) {
            monsterList.removeChild(monsterList.firstChild);
          }


    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`) 
        .then(response => 
            response.json())
        .then(monsterData => {
            
            for(let i = 0; i < monsterData.length; i++) {
                const monsterName = monsterData[i].name;
                const monsterAge = monsterData[i].age;
                const monsterBio = monsterData[i].description;
            
                let monsterDiv = document.createElement("div")
                let monsterH2 = document.createElement("h2")
                let monsterH4 = document.createElement("h4")
                let monsterP = document.createElement("p")
            
                monsterDiv.setAttribute('id', monsterName);
                monsterH2.innerText = monsterName;
                monsterH4.innerText = `Age: ${monsterAge}`;
                monsterP.innerText = `Description: ${monsterBio}`;
    
                monsterDiv.appendChild(monsterH2);
                monsterDiv.appendChild(monsterH4);
                monsterDiv.appendChild(monsterP);
    
                monsterList.appendChild(monsterDiv);
            }
        });    
    }
            
    monsterForm.addEventListener('submit', event => {
        let nameField = document.getElementById('name-field');
        let ageField = document.getElementById('age-field');
        let descriptionField = document.getElementById('description-field');
        let monsterForm = document.getElementById('monster-form')

        monsterForm.addEventListener('submit', event => {
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
                    'description': descriptionField.value
                }
            })
        })
    })

    
            backButton.addEventListener('click', event => {
                if(page > 1) {
                    page--
                }
                thePage(page);
            })
        
            forwardButton.addEventListener('click', event => {
                page++
                thePage(page);
            })
        
            thePage(page);
    

});