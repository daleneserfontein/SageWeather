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

module.exports.listJsonFromFile = (fileName) => {
    const entries = loadEntries(fileName)
    if (entries.length > 0) {
        logging.log('List of entries')
        logging.log(entries)        
    } else {
        logging.log('No entries')
    }
    return entries
}

module.exports.clearJsonFromFile = (fileName) => {    
    const entries = loadEntries(fileName)
    if (entries.length > 0) {
        saveEntries([], fileName)
        logging.log('All entries have been removed.')    
        const entries = this.listJsonFromFile(fileName)        
    } else {
        logging.log('No json objects to clear from file')
    }
    return entries
}

module.exports.getJsonFromFile = (id, fileName) => {
    const entries = loadEntries(fileName)
    if (entries.length > 0) {
        const existEntry = entries.find((entr) => entr.id === id)

        if (existEntry) {
            return entry[0]
        } else {
            logging.err('Failed to get entry.  Entry does not exist.')
        }
    } else {
        logging.log('No json objects to get from file')
    }
}

module.exports.addJsonToFile = (id, body, fileName) => {
    const entries = loadEntries(fileName)
    const existEntry = entries.find((entr) => entr.id === id)
    
    if (!existEntry || typeof existEntry === typeof undefined) {
        entries.push({
            id: id,
            body: body
        })
        if (saveEntries(entries, fileName)) {
            logging.log('Entry added')
            logging.log(entries)
        } else {
            logging.err('Failed to write entries')
        }
    } else {
        logging.err('Failed to add entry.  Entry already exists.')
    }
}

module.exports.editJsonFromFile = (id, body, fileName) => {
    const entries = loadEntries(fileName)
    if (entries.length > 0) {
        const newEntries = []
        let entryFound = false

        entries.forEach(function (entry) {
            if (entry.id === id) {
                logging.log('Entry found and changed')
                entry.body = body
                entryFound = true
            }
            newEntries.push(entry)
        })

        if (!entryFound) {
            logging.err('Failed to edit entry.  Entry not found.')
        } else {
            if (saveEntries(entries, fileName)) {
                logging.log(entries)
            } else {
                logging.err('Failed to write entries')
            }
        }
    } else {
        logging.log('No json objects to get from file')
    }
}

module.exports.removeJsonFromFile = (id, fileName) => {
    const entries = loadEntries(fileName)
    if (entries.length > 0) {
        const idToRemove = entries.filter(function (entry) {
            return entry.id === id
        })
        if (idToRemove.length === 1) {
            const remainEntries = entries.filter(function (entry) {
                return entry.id !== id
            })

            if (saveEntries(remainEntries, fileName)) {
                logging.log('Entry removed.')
                logging.log(remainEntries)
            } else {
                logging.err('Failed to write entries.')
            }
        } else {
            logging.err('Failed to remove entry.  Entry not found.')
        }
    } else {
        logging.log('No json objects to get from file')
    }
}
   



