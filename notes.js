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
      uid: uid(4),
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log(
      chalk.green.bold("Note added with ", "Title: ", title, "Body: ", body)
    );
  } else {
    console.log(chalk.red.bold("Could not create note, please try again"));
  }
};

const removeNotes = (noteId) => {
  const notes = loadNotes();

  const updatedNotes = notes.filter((note) => {
    return note.uid != noteId;
  });
  if (updatedNotes.length != notes.length) {
    saveNotes(updatedNotes);
    console.log("Note deleted successfully");
  } else {
    console.log("Operation could not be done");
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

const updateNotes = (id, title, body) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.uid == id);
  if (!note) {
    console.log(chalk.red.inverse("No note found"));
  }
  const updatedNote = notes.map((note) => {
    if (note.uid == id) {
      note.title = title;
      note.body = body;
    }
    return note;
  });
  saveNotes(updatedNote);
  console.log(chalk.green.inverse("Note updated successfully"));
};

module.exports = {
  getNotes: getNotes,
  addNotes: addNotes,
  removeNotes: removeNotes,
  listNotes: listNotes,
  readNotes: readNotes,
  loadNotes: loadNotes,
  updateNotes: updateNotes,
};
