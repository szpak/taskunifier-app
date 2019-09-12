import moment from 'moment';
import { createSelector } from 'reselect';
import { getSelectedNoteFilter, getSelectedNoteFilterDate, getSelectedNoteIds } from 'selectors/AppSelectors';
import { getNoteFieldsIncludingDefaults } from 'selectors/NoteFieldSelectors';
import { isBusy } from 'selectors/ThreadSelectors';
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

/**
 * WARNING: This selector returns an empty array as long as the busy flag is set to true.
 */
export const getNotesFilteredBySelectedFilter = createSelector(
    getNotesFilteredByVisibleState,
    getSelectedNoteFilter,
    getSelectedNoteFilterDate,
    getNoteFieldsIncludingDefaults,
    isBusy,
    (notes, selectedNoteFilter, selectedNoteFilterDate, noteFields, busy) => {
        if (busy) {
            return [];
        }

        const filteredNotes = notes.filter(note => {
            if (moment(note.creationDate).isAfter(moment(selectedNoteFilterDate))) {
                return true;
            }

            return applyFilter(selectedNoteFilter, note, noteFields);
        });

        return sortObjects(filteredNotes, noteFields, selectedNoteFilter, store.getState(), null, false);
    }
);

export const getVisibleNoteSelector = () => createSelector(
    getNotesFilteredByVisibleState,
    (state, id) => id,
    (notes, id) => {
        return notes.find(note => note.id === id);
    }
);

export const getSelectedNotes = createSelector(
    getNotes,
    getSelectedNoteIds,
    (notes, selectedNoteIds) => {
        return notes.filter(note => selectedNoteIds.includes(note.id));
    }
);