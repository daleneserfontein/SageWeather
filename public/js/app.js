const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const clearValues = () => {
  document.querySelector('#resultsFor').textContent = ''
  document.querySelector('#errMessage').textContent = ''
  document.querySelector('#placeName').textContent = ''
  document.querySelector('#highlow').textContent = ''
  document.querySelector('#latitude').textContent = ''
  document.querySelector('#longitude').textContent = ''
  document.querySelector('#summary').textContent = ''
  document.querySelector('#rain').textContent = ''  
}

clearValues()

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    clearValues()
    document.querySelector('#resultsFor').textContent = 'Searching...'
    
    const location = search.value
    
    fetch('/weather?location='+ encodeURIComponent(location)).then((response) => {               
          response.json().then((data) => {   
              if (data.placeName) {
                document.querySelector('#resultsFor').textContent = 'Results for "' + location + '"'
                document.querySelector('#placeName').textContent = 'Today in ' + data.placeName + ' it is ' + data.temperature
                document.querySelector('#highlow').textContent = 'Low ' + data.low + ' and High ' + data.high 
                document.querySelector('#latitude').textContent = 'Latitude: ' + data.latitude
                document.querySelector('#longitude').textContent = 'Longitude: ' + data.longitude
                document.querySelector('#summary').textContent = data.summary
                document.querySelector('#rain').textContent = data.rain
              } else {
                document.querySelector('#errMessage').textContent = data.description
                document.querySelector('#resultsFor').textContent = ''
              }
          })    
    })

})

