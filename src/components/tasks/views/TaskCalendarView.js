import React from 'react';
import PropTypes from 'prop-types';
import SplitPane from 'react-split-pane';
import TaskSider from 'components/tasks/sider/TaskSider';
import TaskCalendar from 'components/tasks/calendar/TaskCalendar';
import withSettings from 'containers/WithSettings';
import TaskQuickAdd from 'components/tasks/quick/TaskQuickAdd';
import TaskTabs from 'components/tasks/tabs/TaskTabs';

function TaskCalendarView(props) {
    const onTaskCalendarViewSplitPaneSizeChange = size => {
        props.updateSettings({ taskCalendarViewSplitPaneSize: size });
        window.dispatchEvent(new Event('app-resize'));
    };

    const onTaskCalendarViewSubSplitPaneSizeChange = size => {
        props.updateSettings({ taskCalendarViewSubSplitPaneSize: size });
        window.dispatchEvent(new Event('app-resize'));
    };

    return (
        <SplitPane
            split="vertical"
            minSize={200}
            defaultSize={props.settings.taskCalendarViewSplitPaneSize}
            onChange={size => onTaskCalendarViewSplitPaneSizeChange(size)}
            paneStyle={{ overflowY: 'auto' }}>
            <TaskSider />
            <SplitPane
                split={props.settings.taskCalendarViewSubSplitPaneMode}
                minSize={200}
                defaultSize={props.settings.taskCalendarViewSubSplitPaneSize}
                onChange={size => onTaskCalendarViewSubSplitPaneSizeChange(size)}
                primary="second"
                paneStyle={{ overflowY: 'auto' }}>
                <div style={{ height: '100%' }}>
                    <TaskQuickAdd />
                    <div style={{ overflowY: 'auto', height: '100%', backgroundColor: '#ffffff' }}>
                        <TaskCalendar />
                    </div>
                </div>
                <div style={{ padding: 10, width: '100%' }}>
                    <TaskTabs />
                </div>
            </SplitPane>
        </SplitPane>
    );
}

TaskCalendarView.propTypes = {
    settings: PropTypes.object.isRequired,
    updateSettings: PropTypes.func.isRequired
};

export default withSettings(TaskCalendarView);