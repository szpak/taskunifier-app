import {
    addObject,
    cleanObjects,
    deleteObject,
    loadObjectsFromFile,
    loadObjectsFromServer,
    saveObjectsToFile, 
    saveObjectsToServer, 
    setObjects,
    updateObject
} from 'actions/ObjectActions';

export function loadNotesFromFile(file) {
    return loadObjectsFromFile('notes', file);
}

export function saveNotesToFile(file, data) {
    return saveObjectsToFile('notes', file, data);
}

export function loadNotesFromServer() {
    return loadObjectsFromServer('notes');
}

export function saveNotesToServer(data) {
    return saveObjectsToServer('notes', data);
}

export function setNotes(notes) {
    return setObjects('notes', notes);
}

export function addNote(note, options = {}) {
    return addObject('notes', note, options);
}

export function updateNote(note, options = {}) {
    return updateObject('notes', note, options);
}

export function deleteNote(noteId, options = {}) {
    return deleteObject('notes', noteId, options);
}

export function cleanNotes() {
    return cleanObjects('notes');
}