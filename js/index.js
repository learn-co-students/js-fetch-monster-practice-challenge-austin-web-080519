const monstersUrl = 'http://localhost:3000/monsters';
const monsterContainer = document.getElementById("monster-container");
const createMonster = document.getElementById("create-monster");

function fetchMonsters() {

    fetch(`${monstersUrl}/?_limit=50`)
    .then(response => response.json())
    .then(monstersData => {
        for (const monster of monstersData) {
            listMonster(monster);
        }

    })
}

function postMonster(name, age, description) {
    let data = {
        name: name,
        age: parseInt(age),
        description: description
    }

    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    }

    fetch(monstersUrl, configObj)
    .then(response => response.json())
    .then(monsterData => {
        console.log(monsterData);
        listMonster(monsterData);
    })
}

function listMonster(monster) {
    // create new elements
    const newDiv = document.createElement("div");
    const monsterName = document.createElement("h2");
    const monsterAge = document.createElement("h4");
    const monsterDescription = document.createElement("p");

    monsterName.innerText = monster['name'];
    monsterAge.innerText = monster['age'];
    monsterDescription.innerText = monster['description'];

    newDiv.appendChild(monsterName);
    newDiv.appendChild(monsterAge);
    newDiv.appendChild(monsterDescription);

    monsterContainer.appendChild(newDiv);
}

function createForm() {
    const monsterForm = document.createElement("form")
    monsterForm.id = "monster-form";

    const nameInput = document.createElement("input");
    nameInput.id = "name";
    nameInput.setAttribute("placeholder", "name...");
    monsterForm.appendChild(nameInput);

    const ageInput = document.createElement("input");
    ageInput.id = "age";
    ageInput.setAttribute("placeholder", "age...");
    monsterForm.appendChild(ageInput);

    const descriptionInput = document.createElement("input");
    descriptionInput.id = "description";
    descriptionInput.setAttribute("placeholder", "description...");
    monsterForm.appendChild(descriptionInput);

    const createButton = document.createElement("button");
    createButton.innerText = "Create";
    monsterForm.appendChild(createButton);

    // Adding event listener to new button to create a monster
    createButton.addEventListener("click", event => {
        event.preventDefault();
        postMonster(nameInput.value, ageInput.value, descriptionInput.value);
        nameInput.value = "";
        ageInput.value = "";
        descriptionInput.value = "";
    });

    createMonster.appendChild(monsterForm);

}


document.addEventListener("DOMContentLoaded", (event) => {
    createForm();
    fetchMonsters();
})