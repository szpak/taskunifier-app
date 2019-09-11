import moment from 'moment';
import { createSelector } from 'reselect';
import { getSelectedNoteFilter, getSelectedNoteFilterDate } from 'selectors/AppSelectors';
import { getNoteFieldsIncludingDefaults } from 'selectors/NoteFieldSelectors';
import { store } from 'store/Store';
import { filterByVisibleState } from 'utils/CategoryUtils';
import { compareStrings } from 'utils/CompareUtils';
import { applyFilter } from 'utils/FilterUtils';
import { sortObjects } from 'utils/SorterUtils';

export const getNotes = state => state.notes;

export const getNotesFilteredByVisibleState = createSelector(
    getNotes,
    (notes) => {
        return filterByVisibleState(notes).sort((a, b) => compareStrings(a.title, b.title));
    }
);

export const getNotesFilteredBySelectedFilter = createSelector(
    getNotesFilteredByVisibleState,
    getSelectedNoteFilter,
    getSelectedNoteFilterDate,
    getNoteFieldsIncludingDefaults,
    (notes, selectedNoteFilter, selectedNoteFilterDate, noteFields) => {
        const filteredNotes = notes.filter(note => {
            if (moment(note.creationDate).isAfter(moment(selectedNoteFilterDate))) {
                return true;
            }

            return applyFilter(selectedNoteFilter, note, noteFields);
        });

        return sortObjects(filteredNotes, noteFields, selectedNoteFilter, store.getState(), null, false);
    }
);

export const getVisibleNote = createSelector(
    getNotesFilteredByVisibleState,
    (state, id) => id,
    (notes, id) => {
        return notes.find(note => note.id === id);
    }
);