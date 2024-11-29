document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:5000/getAll')
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
})

const form = document.querySelector('#newsletter-form')
form.addEventListener('submit', (event) => {
    event.preventDefault()

    const emailInput = document.querySelector("#newsletter-email")
    const email = emailInput.value
    emailInput.value = ""
    fetch('http://localhost:5000/insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email})
    })
        .then(res => res.json())
})


fetch('http://localhost:5000/getCardData')
    .then(res => res.json())
    .then(data => {
        generateCards(data["data"])
    })


function generateCards(data) {
    const galleryContainer = document.querySelector(".gallery-content")
    const templateCard = document.querySelector("#template-card")

    for(let i = 0; i < data.length; i++) {
        const cloneCard = document.importNode(templateCard.content, true)

        const cardTitle = cloneCard.querySelector(".card-title")
        const cardDescription = cloneCard.querySelector(".card-description")

        cardTitle.innerText = data[i].title
        cardDescription.innerText = data[i].description

        galleryContainer.appendChild(cloneCard)
    }
}