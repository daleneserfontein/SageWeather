const yargs = require('yargs')
const fileCrud = require('./utils/fileCrud')
const logging = require('./logging')


yargs.command({
    command: 'list',
    describe: 'List all json entries from file',
    builder: {
        fileName: {
            describe: 'file name',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) { 
        fileCrud.listJsonFromFile(argv.fileName, (error, data) => {
            if (error) {
                return logging.err(error)
            }
            logging.log(data)
        }) 
    }
})

yargs.command({
    command: 'clear',
    describe: 'Clear all json entries from file',
    builder: {
        fileName: {
            describe: 'file name',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) { 
        fileCrud.clearJsonFromFile(argv.fileName, (error, data) => {
            if (error) {
                return logging.err(error)
            }
            logging.log(data)
        })
    }
})

yargs.command({
    command: 'get',
    describe: 'Get single Json entry from file',
    builder: {
        id: {
            describe: 'unique identifier',
            demandOption: true,
            type: 'string'
        },
        fileName: {
            describe: 'file name',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) { 
        fileCrud.getJsonFromFile(argv.id, argv.fileName, (error, data) => {
            if (error) {
                return logging.err(error)
            }
            logging.log(data)
        })
    }
})

yargs.command({
    command: 'add',
    describe: 'Add single json entry to file',
    builder: {
        id: {
            describe: 'unique identifier',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'body',
            demandOption: true,
            type: 'string'
        },
        fileName: {
            describe: 'file name',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) { 
        fileCrud.addJsonToFile(argv.id, argv.body, argv.fileName, (error, data) => {
            if (error) {
                return logging.err(error)
            }
            logging.log(data)
        })
    }
})

yargs.command({
    command: 'edit',
    describe: 'Edit single Json entry from file',
    builder: {
        id: {
            describe: 'unique identifier',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'body',
            demandOption: true,
            type: 'string'
        },
        fileName: {
            describe: 'file name',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) { 
        fileCrud.editJsonFromFile(argv.id, argv.body, argv.fileName, (error, data) => {
            if (error) {
                return logging.err(error)
            }
            logging.log(data)
        })
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove single Json entry from file',
    builder: {
        id: {
            describe: 'unique identifier',
            demandOption: true,
            type: 'string'
        },
        fileName: {
            describe: 'file name',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) { 
        fileCrud.removeJsonFromFile(argv.id, argv.fileName, (error, data) => {
            if (error) {
                return logging.err(error)
            }
            logging.log(data)
        })
    }
})

yargs.parse()