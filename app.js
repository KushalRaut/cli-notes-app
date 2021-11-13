
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

yargs.version('1.1.0')

yargs.command({
    command:'add',
    describe:'add a new note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'The actual note',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.addNotes(argv.title,argv.body)
    }
})
yargs.command({
    command:'remove',
    describe:'delete a note',
    builder:{
        title:{
            describe:'notes title',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.removeNotes(argv.title);
    }

})
yargs.command({

    command:'list',
    describe:'List all of your notes',
    handler(){
        notes.listNotes();
    }

})
    
yargs.command({
    command:'read',
    describe:'this is going to read your notes',
    builder:{
        title:
        {   
            describe:'Give the title of note you want to read',
            demandOption: true,
            type:'string'

        }
    },
    handler(argv){
        notes.readNotes(argv.title);
    }
    
})

console.log(yargs.argv)

