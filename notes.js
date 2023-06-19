const { default: chalk } = require("chalk");
const fs = require("fs");
const { uid } = require("uid");

const getNotes = () => {
  return "your notes...";
};

const addNotes = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.find((note) => {
    note.title === title;
  });

  if (!duplicateNotes) {
    notes.push({
      uid: uid(16),
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log(
      chalk.green.bold("Note added with ", "Title: ", title, "Body: ", body)
    );
  } else {
    console.log("Title is already taken");
  }
};

const removeNotes = (title) => {
  const notes = loadNotes();

  const updatedNotes = notes.filter((note) => {
    return note.title != title;
  });
  if (updatedNotes.length != notes.length) {
    saveNotes(updatedNotes);
    console.log("Note deleted successfully");
  } else {
    console.log("There is no such title in Notes file");
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (e) {
    return [];
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.bgCyan.bold("Title"), chalk.bgGreen("Body"));
  notes.forEach((note) => {
    console.log(chalk.cyan.bold(note.title), chalk.green(note.body));
  });
};

const readNotes = (title) => {
  const notes = loadNotes();
  const readNote = notes.find((note) => note.title == title);
  if (!readNote) {
    console.log(chalk.red.inverse("No note found"));
  } else {
    console.log(title, readNote.body);
  }
};

module.exports = {
  getNotes: getNotes,
  addNotes: addNotes,
  removeNotes: removeNotes,
  listNotes: listNotes,
  readNotes: readNotes,
};
