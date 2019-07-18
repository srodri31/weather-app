console.log("Client side javascript");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#forecast-message");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const location = search.value;

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    const url = `http://localhost:3000/weather?address=${location}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            if(data.error) {
                console.log(data.error);
                messageOne.textContent = `Error: ${data.error}`;
            } else {
                console.log(data);
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
        .catch((err) => console.log(err.message));
})

