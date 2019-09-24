document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed ... YAY!!!!!');
    /*
    monsters.json has 1000 monsters in following format:
    {
        "name": "Chronos",
        "age": 4005.302453418598,
        "description": "Effulgence eldritch shunned foetid. Ululate gibbering tenebrous foetid iridescence daemoniac. Stench nameless gambrel. Amorphous furtive iridescence noisome. Foetid mortal nameless.",
        "id": 1
    }

    display only 50 PER PAGE
    */

    //url with optional parameter to limit to 50 returned
    let page = 1

    //get monster container to put monster info in
    const monsterContainer = document.getElementById('monster-container')

    function fetchPage(page) {
        //if page is not 1, remove child of monsterContainer since it will contain the last fetched div amount
        if (page > 1) {
            //console.log('before ========', monsterContainer)
            monsterContainer.innerHTML = ''
            //console.log('after ========', monsterContainer)
        }
        
        //fetch monsters data to display        
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
            // return json response
            .then( response => response.json() )
            // iterate through each object to extract name, age, and description
            .then( monsterObject => {
                for (const monster of monsterObject) {
                    // check to make sure each monster hash is getting separated out
                    //console.log('Each monster iteration gives = ', monster)

                    //create new div for each monster
                    const div = document.createElement('div')

                    //create h2 tag for name
                    const h2 = document.createElement('h2')
                    //change innertext of h2 tag to monster name
                    h2.innerText = monster.name
                    //append to div
                    div.appendChild(h2)

                    //create h4 tag for age
                    const h4 = document.createElement('h4')
                    //change innertext of h4 tag to monster age
                    h4.innerText = monster.age
                    //append to div
                    div.appendChild(h4)
                    
                    //create p tag for bio
                    const p = document.createElement('p')
                    //change innertext of p tag to monster bio
                    p.innerText = monster.description
                    //append to div
                    div.appendChild(p)
                    
                    //check div to ensure everything is inside
                    //console.log('div contains = ', div)
                    
                    //append div to container
                    monsterContainer.appendChild(div)
                }
            })
    }

    //add click event to back button
    const backButton = document.getElementById('back')
    backButton.addEventListener('click', (event => {
        if(page > 1) {
            console.log("At page ", page)
            page--
            console.log("Going backkkkk to ", page)
            fetchPage(page)
        }
        //re - fetch page with new content on desired page
 
    }))

    //add click event to forward button
    const forwardButton = document.getElementById('forward')
    forwardButton.addEventListener('click', (event => {
            console.log("At page ", page)
            page++
            console.log("Going forwarddddd to ", page)
        //re - fetch page with new content on desired page
        fetchPage(page)
    }))

    //add form to send api new monster (and save to db)
    
    //attach this form to div id create-monster
    const createMonster = document.getElementById('create-monster')
    //attach form to div
    createMonster.innerHTML = `<form id='monster-form'><input type='text' id='name' placeholder="name..."><input type='number' id='age' placeholder="age..."><input type='text' id='description' placeholder="description..."><input type='submit' id='submit' value="Create"></form>`
    //select monster form
    const monsterForm = document.getElementById('monster-form')
    //add event listener
    //console.log("monster form =", monsterForm)
    monsterForm.addEventListener('submit', (event) => {
        //prevent default behavior
        event.preventDefault();
        //log submit button has been pressed
        console.log("createMonster form has been submitted")

        //post object
        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: 
            {
            "Content-Type": "application/json",
            Accept: "application/json"
            },
            body:
            JSON.stringify(
            { 
                name: document.getElementById('name').value, 
                age: document.getElementById('age').value, 
                description: document.getElementById('description').value
            }
            ) //json end
        })
            .then (response => console.log("fetch response", response))
    })

    //call fetch page function runs when page is set at 1 (first time)
    fetchPage(page)

});