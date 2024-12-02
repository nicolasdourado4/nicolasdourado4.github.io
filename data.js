
window.onload = () => {
    const emailData = document.getElementById("emailData");

    fetch("http://localhost:5000/getAll")
        .then(res => res.json())
        .then(data => {
            data["data"].forEach(({"email": email}) => {
                console.log(email)
                const newEmail = document.createElement("p");
                newEmail.innerText = email;
                emailData.appendChild(newEmail);
            })
        })
}


const cardForm = document.querySelector("#card-form");
cardForm.addEventListener("submit", (e) => {

    const titleInput = document.querySelector("#card-input-title");
    const descriptionInput = document.querySelector("#card-input-text");

    const title = titleInput.value;
    const description = descriptionInput.value;

    titleInput.value = "";
    descriptionInput.value = "";

    fetch('http://localhost:5000/insertCard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({title: title, description: description}),
    })
        .then(res => res.json())
})

const linksForm = document.querySelector("#links-form");
linksForm.addEventListener("submit", (e) => {

    const linksInput = document.querySelectorAll(".links-input");

    const allLinks = []
    var j = 1;
    for(let i = 0; i < linksInput.length; i++) {
        // const idlinks = linksInput[i].id;
        const idlinks = j
        j++
        const href = linksInput[i].value;
        const linkInfo = {idlinks: idlinks, href: href}
        allLinks.push(linkInfo);
    }

    fetch('http://localhost:5000/insertLink', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(allLinks),
    })

})