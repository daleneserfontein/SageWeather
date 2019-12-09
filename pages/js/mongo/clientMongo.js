const mongoForm = document.querySelector('form')
const search = document.querySelector('input')

const clearValues = () => {
  document.querySelector('#infoMessage').textContent = ''
  document.querySelector('#errMessage').textContent = ''
  document.querySelector('#idId').textContent = ''
  document.querySelector('#idDateAdded').textContent = ''
  document.querySelector('#idPlaceName').textContent = ''
  document.querySelector('#idTemperature').textContent = ''
  document.querySelector('#idHigh').textContent = ''
  document.querySelector('#idLow').textContent = ''
  document.querySelector('#idLatitude').textContent = ''
  document.querySelector('#idLongitude').textContent = ''
  document.querySelector('#idSummary').textContent = ''
  document.querySelector('#idRain').textContent = ''
}

clearValues()

mongoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    clearValues()
    document.querySelector('#infoMessage').textContent = 'Searching...'
    document.querySelector('#errMessage').textContent = ''
    
    const location = search.value
    
    fetch('/mongo/findOne?location='+ encodeURIComponent(location)).then((response) => {               
          response.json().then((data) => {                
              if (typeof data.searchResult !== typeof undefined && data.searchResult !== null) {
                document.querySelector('#infoMessage').textContent = 'Results for "' + location + '"'
                document.querySelector('#errMessage').textContent = ''
                document.querySelector('#idId').textContent = data.searchResult._id
                document.querySelector('#idDateAdded').textContent = data.searchResult.dateAdded
                document.querySelector('#idPlaceName').textContent = data.searchResult.placeName
                document.querySelector('#idTemperature').textContent = data.searchResult.temperature
                document.querySelector('#idHigh').textContent = data.searchResult.high 
                document.querySelector('#idLow').textContent = data.searchResult.low 
                document.querySelector('#idLatitude').textContent = data.searchResult.latitude
                document.querySelector('#idLongitude').textContent = data.searchResult.longitude
                document.querySelector('#idSummary').textContent = data.searchResult.summary
                document.querySelector('#idRain').textContent = data.searchResult.rain
              } else {
                document.querySelector('#errMessage').textContent = data.description
                document.querySelector('#infoMessage').textContent = ''
              }
          })    
    })

})

