const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

document.querySelector('#resultsFor').textContent = ''
document.querySelector('#errMessage').textContent = ''
document.querySelector('#placeName').textContent = ''
document.querySelector('#latitude').textContent = ''
document.querySelector('#longitude').textContent = ''
document.querySelector('#summary').textContent = ''
document.querySelector('#rain').textContent = ''
document.querySelector('#temperature').textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    document.querySelector('#resultsFor').textContent = 'Searching...'
    document.querySelector('#errMessage').textContent = ''
    document.querySelector('#placeName').textContent = ''
    document.querySelector('#latitude').textContent = ''
    document.querySelector('#longitude').textContent = ''
    document.querySelector('#summary').textContent = ''
    document.querySelector('#rain').textContent = ''
    document.querySelector('#temperature').textContent = ''

    const location = search.value
    
    fetch('/weather?location='+ encodeURIComponent(location)).then((response) => {               
          response.json().then((data) => {   
              if (data.placeName) {
                document.querySelector('#resultsFor').textContent = 'Results for "' + location + '"'
                document.querySelector('#placeName').textContent = 'Location:' + data.placeName
                document.querySelector('#latitude').textContent = 'Latitude:' + data.latitude
                document.querySelector('#longitude').textContent = 'Longitude:' + data.longitude
                document.querySelector('#summary').textContent = data.summary
                document.querySelector('#rain').textContent = data.rain
                document.querySelector('#temperature').textContent = data.temperature
              } else {
                document.querySelector('#errMessage').textContent = data.description
                document.querySelector('#resultsFor').textContent = ''
              }
          })    
    })

})