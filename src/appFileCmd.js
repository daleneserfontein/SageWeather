const yargs = require('yargs')
const fileCrud = require('./utils/fileCrud')


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
    handler(argv) { fileCrud.listJsonFromFile(argv.fileName, null) }
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
    handler(argv) { fileCrud.clearJsonFromFile(argv.fileName, null) }
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
    handler(argv) { fileCrud.getJsonFromFile(argv.id, argv.fileName, null) }
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
    handler(argv) { fileCrud.addJsonToFile(argv.id, argv.body, argv.fileName, null) }
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
    handler(argv) { fileCrud.editJsonFromFile(argv.id, argv.body, argv.fileName, null) }
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
    handler(argv) { fileCrud.removeJsonFromFile(argv.id, argv.fileName, null) }
})

yargs.parse()