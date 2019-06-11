const fs = require('fs');
const chalk = require('chalk');

//Добавляем заметку в файл
const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'));
    } else {
        console.log(chalk.red.inverse('Note title taken!'));
    }
}

//Удаляем заметку из файла
const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'));
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.red.inverse('No note found!'));
    }    
}

//Выводим все заметки
const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.inverse('Your notes: '));

    notes.forEach(note => {
        console.log('title: ' + note.title);
    });
}

//Выводим всю заметку по заголовку
const readNote = (title) => {
    const notes = loadNotes();

    const findNote = notes.find((note) => note.title === title);

    if(findNote) {
        console.log('Your note: ');
        console.log(chalk.green.inverse('title: ' + findNote.title));
        console.log(chalk.green.inverse('body: ' + findNote.body));
    } else {
        console.log(chalk.red.inverse('Note not found!'));
    }
}

//Сохранение заметки в файл
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

//Получение заметок из файла
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

//Экспортируем нужные нам модули
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}