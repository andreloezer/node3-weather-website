const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const weatherIcon = document.querySelector('#weather_icon')
const messageTwo = document.querySelector('#message-2')
const searchButton = document.querySelector('#search-query')
const locationButton = document.querySelector('#search-current-location')

// Weather for current location
locationButton.addEventListener('click', (e) => {
    e.preventDefault()

    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    }
    forecastCurrentPosition()
})

// Weather for given location
searchButton.addEventListener('click', (e) => {
    e.preventDefault()
    weatherIcon.setAttribute('src', '')

    if (search.value.trim() === '') {
        messageOne.textContent = ''
        messageTwo.textContent = 'You must provide an address'
        return
    }

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    getForecast('/weather?address=' + encodeURIComponent(search.value))
})

const forecastCurrentPosition = () => {
    var query = ''
    navigator.geolocation.getCurrentPosition((position) => {
        query = '/location?latitude=' + position.coords.latitude + '&longitude=' +  position.coords.longitude
        getForecast(query)
    })
}

// Fetch and render forecast
const getForecast = (query) => {
    fetch(query).then((response) => {
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
}

// Display forecast for the user location on loading the page
forecastCurrentPosition()