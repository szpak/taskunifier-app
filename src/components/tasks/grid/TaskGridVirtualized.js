import React from 'react';
import sortBy from 'lodash/sortBy';
import PropTypes from 'prop-types';
import { AutoSizer, Column, Table } from 'react-virtualized';
import withTaskFields from 'containers/WithTaskFields';
import withTasks from 'containers/WithTasks';
import withSettings from 'containers/WithSettings';
import withSize from 'containers/WithSize';
import CellRenderer from 'components/common/grid/CellRenderer';
import { multiSelectionHandler, moveHandler, resizableAndMovableColumn, resizeHandler } from 'components/common/grid/VirtualizedTable';
import { getValueFromEventForType, getWidthForType } from 'utils/FieldUtils';
import { FieldPropType } from 'proptypes/FieldPropTypes';
import { TaskFilterPropType } from 'proptypes/TaskFilterPropTypes';
import { TaskPropType } from 'proptypes/TaskPropTypes';
import { getTaskBackgroundColor } from 'utils/SettingUtils';
import 'components/common/grid/EditableCell.css';

function TaskGrid(props) {
    const onUpdateTask = task => {
        props.updateTask(task);
    };

    let tableWidth = 0;

    const onResize = resizeHandler('taskColumnWidth_', props.updateSettings);
    const onMove = moveHandler('taskColumnOrder_', props.taskFields, props.settings, props.updateSettings);

    const columns = sortBy(props.taskFields, field => props.settings['taskColumnOrder_' + field.id] || 0).map(field => {
        const settingKey = 'taskColumnWidth_' + field.id;
        let width = Number(props.settings[settingKey]);

        if (!width) {
            width = getWidthForType(field.type);
        }

        tableWidth += width;

        return (
            <Column
                key={field.id}
                label={field.title}
                dataKey={field.id}
                width={width}
                flexGrow={0}
                flexShrink={0}
                headerRenderer={data => resizableAndMovableColumn(
                    data,
                    ({ deltaX }) => onResize(field.id, width + deltaX),
                    (dragColumn, dropColumn) => onMove(dragColumn.dataKey, dropColumn.dataKey)
                )}
                cellRenderer={({ cellData, rowData }) => (
                    <CellRenderer
                        field={field}
                        value={cellData}
                        onChange={event => {
                            onUpdateTask({
                                ...rowData,
                                [field.id]: getValueFromEventForType(field.type)(event)
                            });
                        }} />
                )} />
        );
    });

    return (
        <div style={{ overflowY: 'hidden', height: 'calc(100% - 40px)' }}>
            <AutoSizer>
                {({ height }) => (
                    <Table
                        width={tableWidth}
                        height={height}
                        rowHeight={38}
                        headerHeight={20}
                        rowCount={props.tasks.length}
                        rowGetter={({ index }) => props.tasks[index]}
                        rowStyle={({ index }) => {
                            const task = props.tasks[index];

                            if (!task) {
                                return {};
                            }

                            let backgroundColor = getTaskBackgroundColor(task, index, props.settings);

                            if (props.selectedTaskIds.includes(task.id)) {
                                backgroundColor = '#b8ccbf';
                            }

                            return {
                                backgroundColor: backgroundColor,
                                textDecoration: task.completed ? 'line-through' : 'none'
                            };
                        }}
                        onRowClick={multiSelectionHandler(
                            rowData => rowData.id,
                            props.selectedTaskIds,
                            props.setSelectedTaskIds)} >
                        {columns}
                    </Table>
                )}
            </AutoSizer>
        </div>
    );
}

TaskGrid.propTypes = {
    taskFields: PropTypes.arrayOf(FieldPropType.isRequired).isRequired,
    tasks: PropTypes.arrayOf(TaskPropType.isRequired).isRequired,
    settings: PropTypes.object.isRequired,
    selectedTaskFilter: TaskFilterPropType,
    selectedTaskIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    setSelectedTaskIds: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
    size: PropTypes.object.isRequired
};

export default withSettings(withTaskFields(withTasks(withSize(TaskGrid), { applySelectedTaskFilter: true })));