document.addEventListener('DOMContentLoaded', (event) => {
    const monstersURL = `http://localhost:3000/monsters`
    const monsterCap = `http://localhost:3000/monsters/`
    const viewMonsters = document.getElementById('monster-container')
    const createMonsterSpace = document.getElementById('create-monster')

    createMonsterForm()

    fetch(monsterCap)
    .then(function(response) {
    // response.json()
    return response.json()
    })
    .then(function(data) {
        data.forEach (function(monster){
            showMonster(monster)
        })
    });


    function showMonster(monster) {
        const ul = document.createElement('ul')
        const li = document.createElement('li')
        let name = document.createTextNode(`${monster.name}`)
        let age = document.createTextNode(`${monster.age}`)
        let desc = document.createTextNode(`${monster.description}`)
        viewMonsters.appendChild(ul)
        ul.appendChild(li)
        li.appendChild(name)
        li.appendChild(age)
        li.appendChild(desc)
    };

    function createMonsterForm() {
        const divUnderTitle = document.createElement('div')
        const monsterForm = document.createElement('form');
        const nameField = document.createElement('input');
        nameField.setAttribute('type', 'text')
        nameField.setAttribute('value', '')
        const ageField = document.createElement('input');
        ageField.setAttribute('type', 'text')
        const descField = document.createElement('input');
        descField.setAttribute('type', 'text')
        const submitButton = document.createElement('input')
        submitButton.setAttribute('type', 'submit')
        createMonsterSpace.appendChild(divUnderTitle)
        divUnderTitle.appendChild(monsterForm)
        monsterForm.appendChild(nameField)
        monsterForm.appendChild(ageField)
        monsterForm.appendChild(descField)
        monsterForm.appendChild(submitButton)


        monsterForm.addEventListener("submit", function(event) {
            fetch(monstersURL, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                 name: `${nameField.value}`, 
                 age: `${ageField.value}`, 
                 description: `${descField.value}`
                    }) 
                })  
                .then(function(response){
                    console.log(response)
                })
            });
    

    };




});