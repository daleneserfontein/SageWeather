const fileForm = document.querySelector('form')

const fleName = document.querySelector('#fleName')
const infoMessage = document.querySelector('#infoMessage')
const errMessage = document.querySelector('#errMessage')

const listFile = document.querySelector('#listFile')
const clearFile = document.querySelector('#clearFile')
const getItem = document.querySelector('#getItem')
const addItem = document.querySelector('#addItem')
const editItem = document.querySelector('#editItem')
const removeItem = document.querySelector('#removeItem')

const idProp = document.querySelector('#idProp')
const bodyProp = document.querySelector('#bodyProp')

const resultDiv = document.querySelector('#resultDiv')

let idVal = 0
let bodyVal = ''
let fleVal = ''

const getValues = () => {
  idVal = idProp.value
  bodyVal = bodyProp.value
  fleVal = fleName.value
}

const clearValues = () => {
  document.querySelector('#infoMessage').textContent = ''
  document.querySelector('#errMessage').textContent = ''
  document.querySelector('#fileDiv').textContent = ''
}

clearValues()

listFile.addEventListener('click', (e) => {
  e.preventDefault()
  clearValues()
  getValues()
  fetch('/file/main?a=l&f=' + encodeURIComponent(fleVal)).then((response) => {
    response.json().then((data) => {

      if (data.errMessage) {
        errMessage.textContent = data.errMessage
      } else {
        infoMessage.textContent = 'List file contents'
      }
      fileDiv.innerHTML = '<tr><td>Id</td><td>Body</td></tr>'
      for (var i = 0; i < data.data.length; i++) {
        var obj = data.data[i];
        fileDiv.innerHTML += '<tr><td>' + obj.id + '</td><td>' + obj.body + '</td></tr>'
      }
    })
  })
})

clearFile.addEventListener('click', (e) => {
  e.preventDefault()
  clearValues()
  getValues()
  fetch('/file/main?a=c&f=' + encodeURIComponent(fleVal)).then((response) => {
    response.json().then((data) => {
      if (data.errMessage) {
        errMessage.textContent = data.errMessage
      } else {
        infoMessage.textContent = 'Clear file contents'
      }
    })
  })
})

getItem.addEventListener('click', (e) => {
  e.preventDefault()
  clearValues()
  getValues()
  fetch('/file/main?a=g&f=' + encodeURIComponent(fleVal) + '&id=' + idVal).then((response) => {
    response.json().then((data) => {
      if (data.errMessage) {
        errMessage.textContent = data.errMessage
      } else {
        infoMessage.textContent = 'Get item from file'
      }
      fileDiv.innerHTML = '<tr><td>Id</td><td>Body</td></tr>'
      var obj = data.data;
      if (typeof obj.id !== typeof undefined) {
        fileDiv.innerHTML += '<tr><td>' + obj.id + '</td><td>' + obj.body + '</td></tr>'
      }
    })
  })
})

addItem.addEventListener('click', (e) => {
  e.preventDefault()
  clearValues()
  getValues()
  fetch('/file/main?a=a&f=' + encodeURIComponent(fleVal) + '&id=' + idVal + '&body=' + encodeURIComponent(bodyVal)).then((response) => {
    response.json().then((data) => {
      if (data.errMessage) {
        errMessage.textContent = data.errMessage
      } else {
        infoMessage.textContent = 'Add item to file'
      }
    })
  })
})

editItem.addEventListener('click', (e) => {
  e.preventDefault()
  clearValues()
  getValues()
  fetch('/file/main?a=e&f=' + encodeURIComponent(fleVal) + '&id=' + idVal + '&body=' + encodeURIComponent(bodyVal)).then((response) => {
    response.json().then((data) => {
      if (data.errMessage) {
        errMessage.textContent = data.errMessage
      } else {
        infoMessage.textContent = 'Edit item in file'
      }
    })
  })
})

removeItem.addEventListener('click', (e) => {
  e.preventDefault()
  clearValues()
  getValues()
  fetch('/file/main?a=r&f=' + encodeURIComponent(fleVal) + '&id=' + idVal).then((response) => {
    response.json().then((data) => {
      if (data.errMessage) {
        errMessage.textContent = data.errMessage
      } else {
        infoMessage.textContent = 'Remove item from file'
      }
    })
  })
})
