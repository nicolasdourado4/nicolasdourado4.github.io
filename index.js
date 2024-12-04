document.addEventListener("DOMContentLoaded", () => {
    fetch('/api/getAll')
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
    fetch('/api/insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email})
    })
        .then(res => res.json())
})


fetch('/api/getCardData')
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

fetch('/api/getLinks')
    .then(res => res.json())
    .then(data => {
        changeLinks(data["data"])
    })

function changeLinks(data) {

    const links = document.querySelectorAll(".link-db")
    const qtdLinks = links.length

    console.log(data)

    for(let i = 0; i < links.length; i++){
        if(data[i]["href"] !== "") {
             if(data[i]["href"].includes("http")) {
                links[i].href = data[i]["href"]
            } else {
                links[i].href = "https://" + data[i]["href"]
            }
            links[i].target = "_blank"
        } else {
            links[i].href = "#"
        }
        console.log(links[i].href)
    }

}
