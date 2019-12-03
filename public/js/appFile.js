const fileForm = document.querySelector('form')

const fleName = document.querySelector('#fleName')
const idProp = document.querySelector('#idProp')
const bodyProp = document.querySelector('#bodyProp')
const msg = document.querySelector('#msg')
const errMsg = document.querySelector('#errMsg')

const listFile = document.querySelector('#listFile')
const clearFile = document.querySelector('#clearFile')
const getItem = document.querySelector('#getItem')
const addItem = document.querySelector('#addItem')
const editItem = document.querySelector('#editItem')
const removeItem = document.querySelector('#removeItem')

const resultFileDiv = document.querySelector('#resultFileDiv')

const idVal = idProp.value
const bodyVal = bodyProp.value
const fleVal = fleName.value

const clearValues = () => {
  resultFileDiv.textContent = ''  
  msg.textContent = ''
  errMsg.textContent = ''
}

clearValues()

listFile.addEventListener('submit', (e) => {
    e.preventDefault()
    clearValues()
    fetch('/file/main?a=l&f=' + encodeURIComponent(fleVal.Value)).then((response) => {               
      response.json().then((data) => { 
        if (data.errMessage) {
          errMsg.textContent = data.errMessage          
        } else {
          msg.textContent = 'List file contents'
          resultFileDiv.textContent = JSON.stringify(data)
        }    
      })
    })
})

clearFile.addEventListener('submit', (e) => {
  e.preventDefault()
  clearValues()
  
  fetch('/file/main?a=c&f=' + encodeURIComponent(fleVal.Value)).then((response) => {               
    response.json().then((data) => { 
      if (data.errMessage) {
        errMsg.textContent = data.errMessage          
      } else {
        msg.textContent = 'Clear file contents'
        resultFileDiv.textContent = JSON.stringify(data)
      }    
    })
  })
})

getItem.addEventListener('submit', (e) => {
  e.preventDefault()
  clearValues()
  
  fetch('/file/main?a=g&f=' + encodeURIComponent(fleVal.Value) + '&id=' + idVal).then((response) => {               
    response.json().then((data) => { 
      if (data.errMessage) {
        errMsg.textContent = data.errMessage          
      } else {
        msg.textContent = 'Get item from file'
        resultFileDiv.textContent = JSON.stringify(data)
      }
    })
  })  
})

addItem.addEventListener('submit', (e) => {
  e.preventDefault()
  clearValues()
  
  fetch('/file/main?a=a&f=' + encodeURIComponent(fleVal.Value) + '&id=' + idVal + '&body=' + encodeURIComponent(bodyVal)).then((response) => {               
    response.json().then((data) => { 
      if (data.errMessage) {
        errMsg.textContent = data.errMessage          
      } else {
        msg.textContent = 'Add item to file'
        resultFileDiv.textContent = JSON.stringify(data)
      }   
    })
  })    
})

editItem.addEventListener('submit', (e) => {
  e.preventDefault()
  clearValues()
  
  fetch('/file/main?a=e&f=' + encodeURIComponent(fleVal.Value) + '&id=' + idVal + '&body=' + encodeURIComponent(bodyVal)).then((response) => {               
    response.json().then((data) => { 
      if (data.errMessage) {
        errMsg.textContent = data.errMessage          
      } else {
        msg.textContent = 'Edit item in file'
        resultFileDiv.textContent = JSON.stringify(data)
      }   
    })
  })      
})

removeItem.addEventListener('submit', (e) => {
  e.preventDefault()
  clearValues()
  
  fetch('/file/main?a=r&f=' + encodeURIComponent(fleVal.Value) + '&id=' + idVal).then((response) => {               
    response.json().then((data) => { 
      if (data.errMessage) {
        errMsg.textContent = data.errMessage          
      } else {
        msg.textContent = 'Remove item from file'
        resultFileDiv.textContent = JSON.stringify(data)
      }   
    })
  })     
})
