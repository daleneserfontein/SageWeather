const fs = require('fs')
const chalk = require('chalk')
const path = require('path')
const logging = require('../logging')

const filePath = path.join(__dirname, '../../ouput/')

const fileExists = (fileName) => {
    return fs.existsSync(path.join(filePath, fileName))    
}

const loadEntries = (fileName) => {    
    try
    {
        if (fileExists(fileName)) {
            const fileJSONBUFFER = fs.readFileSync(path.join(filePath, fileName))
            const fileJSON = fileJSONBUFFER.toString()
            return JSON.parse(fileJSON)
        } else {
            logging.err('File does not exist!')
            return []
        }
    }
    catch(e) {
        logging.err(e.toString())
        return []
    }
}

const saveEntries = (jsonArray, fileName) => {
    try
    {
        const jsonString = JSON.stringify(jsonArray)
        fs.writeFileSync(path.join(filePath, fileName), jsonString)
        return true
    }
    catch(e) {
        logging.err(e.toString())
        return false
    }
}

module.exports.listJsonFromFile = (fileName, callback) => {    
    const entries = loadEntries(fileName)
    if (entries.length > 0) {
        if (callback === null) {
            logging.log('List of entries')
            logging.log(entries)  
            return entries  
        } else {
            callback(null, JSON.stringify(entries))
        } 
    } else {
        if (callback === null) {
            logging.log('No entries')
            return entries
        } else {
            callback(null, 'No entries')
        }
    }        
}

module.exports.clearJsonFromFile = (fileName, callback) => {    
    const entries = loadEntries(fileName)
    if (entries.length > 0) {
        saveEntries([], fileName)
        if (callback === null) {
            logging.log('All entries have been removed.')    
        }
        const entries = this.listJsonFromFile(fileName)        
        if (callback === null) {
            return entries
        } else {
            callback(null, JSON.stringify(entries))
        }
    } else {
        if (callback === null) {
            logging.log('No json objects to clear from file')
            return entries
        } else {
            callback(null, 'No json objects to clear from file')
        }        
    }    
}

module.exports.getJsonFromFile = (id, fileName, callback) => {
    const entries = loadEntries(fileName)
    if (entries.length > 0) {
        const existEntry = entries.find((entr) => entr.id === id)

        if (existEntry) {
            if (callback === null) {
                return entry[0]
            } else {
                callback(null, JSON.stringify(entry[0]))
            }
        } else {
            if (callback === null) {
                logging.err('Failed to get entry.  Entry does not exist.')
            } else {
                callback('Failed to get entry.  Entry does not exist.')
            }            
        }
    } else {
        if (callback === null) {
            logging.log('No json objects to get from file')
        } else {
            callback(null, 'No json objects to get from file')
        }
    }
}

module.exports.addJsonToFile = (id, body, fileName, callback) => {
    const entries = loadEntries(fileName)
    const existEntry = entries.find((entr) => entr.id === id)
    
    if (!existEntry || typeof existEntry === typeof undefined) {
        entries.push({
            id: id,
            body: body
        })
        if (saveEntries(entries, fileName)) {
            if (callback === null) {
                logging.log('Entry added')
                logging.log(entries)
            } else {
                callback(null, JSON.stringify(entries))
            }
        } else {
            if (callback === null) {
                logging.err('Failed to write entries')
            } else {
                callback('Failed to write entries')
            }
        }
    } else {
        if (callback === null) {
            logging.err('Failed to add entry.  Entry already exists.')
        } else {
            callback('Failed to add entry.  Entry already exists.')
        }        
    }
}

module.exports.editJsonFromFile = (id, body, fileName, callback) => {
    const entries = loadEntries(fileName)
    if (entries.length > 0) {
        const newEntries = []
        let entryFound = false

        entries.forEach(function (entry) {
            if (entry.id === id) {
                if (callback === null) {
                    logging.log('Entry found and changed')
                }
                entry.body = body
                entryFound = true
            }
            newEntries.push(entry)
        })

        if (!entryFound) {
            if (callback === null) {
                logging.err('Failed to edit entry.  Entry not found.')
            } else {
               callback('Failed to edit entry.  Entry not found.') 
            }
        } else {
            if (saveEntries(entries, fileName)) {
                if (callback === null) {
                    logging.log(entries)
                } else {
                    callback(null, JSON.stringify(entries))
                }                
            } else {
                if (callback === null) {
                    logging.err('Failed to write entries')
                } else {
                    callback('Failed to write entries')
                }                
            }
        }
    } else {
        if (callback === null) {
            logging.log('No json objects to get from file')
        } else {
            callback(null, 'No json objects to get from file')
        }
        
    }
}

module.exports.removeJsonFromFile = (id, fileName, callback) => {
    const entries = loadEntries(fileName)
    if (entries.length > 0) {
        const idToRemove = entries.filter((entry) => {
            return entry.id === id
        })
        if (idToRemove.length === 1) {
            const remainEntries = entries.filter((entry) => {
                return entry.id !== id
            })

            if (saveEntries(remainEntries, fileName)) {
                if (callback === null) {
                    logging.log('Entry removed.')
                    logging.log(remainEntries)
                } else {
                    callback(null, JSON.stringify(remainEntries))
                }
            } else {
                if (callback === null) {
                    logging.err('Failed to write entries.')
                } else {
                    callback('Failed to write entries.')
                }                
            }
        } else {
            if (callback === null) {
                logging.err('Failed to remove entry.  Entry not found.')
            } else {
                callback('Failed to remove entry.  Entry not found.')
            }
            
        }
    } else {
        if (callback === null) {
            logging.log('No json objects to get from file')
        } else {
            callback(null, 'No json objects to get from file')
        }        
    }
}
   



