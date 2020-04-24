const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const weatherIcon = document.querySelector('#weather_icon')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (!data) {
                messageOne.textContent = 'Error fetching content from the server.'
            } else if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                weatherIcon.setAttribute('src', data.icon)
                messageTwo.textContent = data.report
            }
        })
    })
})