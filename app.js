const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");
const inquirer = require("inquirer");

yargs.version("1.1.0");

inquirer
  .prompt([
    {
      type: "list",
      name: "operation",
      message: "What do you want to do?",
      choices: [
        "1. Create a note",
        "2. Read all notes",
        "3. Update a note",
        "4. Delete a note",
      ],
    },
  ])
  .then((answers) => {
    const choice = answers.operation.substring(0, 1);
    switch (choice) {
      case "1":
        inquirer
          .prompt([
            {
              type: "input",
              name: "title",
              message: "Enter the title of note",
            },
            {
              type: "input",
              name: "body",
              message: "Enter the body of note",
            },
          ])
          .then((answers) => {
            notes.addNotes(answers.title, answers.body);
          });
        break;
      case "2":
        notes.listNotes();
        break;
      case "3":
        inquirer
          .prompt([
            {
              type: "input",
              name: "title",
              message: "Enter the title of note",
            },
            {
              type: "input",
              name: "body",
              message: "Enter the body of note",
            },
          ])
          .then((answers) => {
            notes.updateNotes(answers.title, answers.body);
          });
        break;
      case "4":
        inquirer
          .prompt([
            {
              type: "input",
              name: "title",
              message: "Enter the title of note",
            },
          ])
          .then((answers) => {
            notes.removeNotes(answers.title);
          });
        break;
      default:
        console.log("Invalid choice");
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

yargs.command({
  command: "add",
  describe: "add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "The actual note",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNotes(argv.title, argv.body);
  },
});
yargs.command({
  command: "remove",
  describe: "delete a note",
  builder: {
    title: {
      describe: "notes title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNotes(argv.title);
  },
});
yargs.command({
  command: "list",
  describe: "List all of your notes",
  handler() {
    notes.listNotes();
  },
});

yargs.command({
  command: "read",
  describe: "this is going to read your notes",
  builder: {
    title: {
      describe: "Give the title of note you want to read",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.readNotes(argv.title);
  },
});
