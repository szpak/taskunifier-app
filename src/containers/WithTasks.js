import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { addTask, updateTask, deleteTask } from '../actions/TaskActions';
import { getDefaultFields } from '../data/DataFields';
import { filterObjects } from '../utils/CategoryUtils';
import { applyFilter } from '../utils/FilterUtils';

function withTasks(Component, options = { applySelectedFilter: false, actionsOnly: false }) {
    function WithTasks(props) {
        return <Component {...props} />
    }

    const mapStateToProps = state => {
        if (options && options.actionsOnly === true) {
            return {};
        }

        let tasks = filterObjects(state.tasks);

        if (options && options.applySelectedFilter === true) {
            const fields = getDefaultFields(state.settings).concat(filterObjects(state.fields));

            tasks = tasks.filter(task => {
                if (!state.app.selectedFilterDate ||
                    moment(task.creationDate).isAfter(moment(state.app.selectedFilterDate))) {
                    return true;
                }

                return applyFilter(state.app.selectedFilter, task, fields);
            });
        }

        return {
            tasks: tasks
        };
    };

    const mapDispatchToProps = dispatch => ({
        addTask: task => dispatch(addTask(task)),
        updateTask: task => dispatch(updateTask(task)),
        deleteTask: taskId => dispatch(deleteTask(taskId))
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(WithTasks);
}

export default withTasks;