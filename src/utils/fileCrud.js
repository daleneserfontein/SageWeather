const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../../output/')

const fileExists = (fileName) => {
    return fs.existsSync(path.join(filePath, fileName))    
}

const loadEntries = (fileName, callback) => {
    try {
        if (fileExists(fileName))
        {            
            const fileJSONBUFFER = fs.readFileSync(path.join(filePath, fileName))
            const fileJSON = fileJSONBUFFER.toString()
            // console.log(fileJSON)
            callback(null, JSON.parse(fileJSON))
        } else {
            callback(null, [])
        }
    }
    catch (e) {
        callback(e.toString())
    }
}

const saveEntries = (jsonArray, fileName, callback) => {
    try {
        const jsonString = JSON.stringify(jsonArray)
        fs.writeFile(path.join(filePath, fileName), jsonString, (error) => {
            if (error) {
                return callback(error)
            }
            callback(null)
        })  
    }
    catch (e) {
        callback(e.toString())
    }
}

module.exports.listJsonFromFile = (fileName, callback) => {
    loadEntries(fileName, (error, data) => {
        if (error) {
            return callback(error)
        }
        //console.log(data.length)
        if (data.length > 0) {
            callback(null, data)
        } else {
            callback('No entries')
        }
    })
}

module.exports.clearJsonFromFile = (fileName, callback) => {
    loadEntries(fileName, (error, data) => {
        if (error) {
            return callback(error)
        }
        
        if (data.length > 0) {
            saveEntries([], fileName, (serror) => {
                if (serror) {
                    return callback(serror)
                }

                this.listJsonFromFile(fileName, (aerror, adata) => {
                    if (aerror) {
                        return callback(aerror)
                    }
                    callback(null, adata)
                })
            })
        } else {
            callback('No json objects to clear from file')
        }
    })
}

module.exports.getJsonFromFile = (id, fileName, callback) => {
    loadEntries(fileName, (error, data) => {
        if (error) {
            return callback(error)
        }
        if (data.length > 0) {
            const existEntry = data.find((entr) => entr.id === id)
            if (existEntry) {
                callback(null, existEntry)
            } else {
                callback('Failed to get entry.  Entry does not exist.')
            }
        } else {
            callback('No json objects to get from file')
        }
    })
}

module.exports.addJsonToFile = (id, body, fileName, callback) => {
    loadEntries(fileName, (error, data) => {
        if (error) {
            return callback(error)
        }

        const existEntry = data.find((entr) => entr.id === id)

        if (!existEntry || typeof existEntry === typeof undefined) {
            data.push({
                id: id,
                body: body
            })
            saveEntries(data, fileName, (serror) => {
                if (serror) {
                    return callback(serror)
                }
                callback(null, JSON.stringify(data))
            })
        } else {
            callback('Could not add new entry, entry exist')
        }
    })
}

module.exports.editJsonFromFile = (id, body, fileName, callback) => {
    loadEntries(fileName, (error, data) => {
        if (error) {
            return callback(error)
        }
        
        if (data.length > 0) {
            const newEntries = []
            let entryFound = false
    
            data.forEach((entry) => {
                if (entry.id === id) {
                    entry.body = body
                    entryFound = true
                }
                newEntries.push(entry)
            })
    
            if (!entryFound) {
                return callback('Failed to edit entry.  Entry not found.')
                
            } 
            saveEntries(newEntries, fileName, (serror) => {
                if (serror) {
                    return callback(serror)
                }
            }) 
            callback(null, newEntries)                       
        } else {
            callback('No json objects to get from file')                
        }
    })    
}

module.exports.removeJsonFromFile = (id, fileName, callback) => {
    loadEntries(fileName, (error, data) => {
        if (error) {
            return callback(error)
        }


        if (data.length > 0) {
            const idToRemove = data.filter((entry) => {
                return entry.id === id
            })
            if (idToRemove.length === 1) {
                const remainEntries = data.filter((entry) => {
                    return entry.id !== id
                })
    
                saveEntries(remainEntries, fileName, (serror) => {
                    if (serror) {
                        return callback(serror)
                    }
                })
                
                callback(null, remainEntries)                
            } else {
                callback('Failed to remove entry.  Entry not found.')                
    
            }
        } else {
            callback('No json objects to get from file')            
        }
    })    
}




