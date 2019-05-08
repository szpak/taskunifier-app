import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { StatusPropType } from 'proptypes/StatusPropTypes';
import withStatuses from 'containers/WithStatuses';
import withSettings from 'containers/WithSettings';
import Icon from 'components/common/Icon';
import { getStatusColor } from 'utils/SettingUtils';

function StatusSelect(props, ref) {
    const { statuses, ...restProps } = props;

    return (
        <Select ref={ref} allowClear={true} {...restProps}>
            {statuses.map(status => (
                <Select.Option key={status.id} value={status.id}>
                    <Icon icon="circle" color={getStatusColor(status.id, props.settings)} text={status.title} />
                </Select.Option>
            ))}
        </Select>
    );
};

StatusSelect.propTypes = {
    statuses: PropTypes.arrayOf(StatusPropType.isRequired).isRequired,
    settings: PropTypes.object.isRequired
};

const FRStatusSelect = React.forwardRef(StatusSelect);

export { FRStatusSelect as StatusSelect };
export default withSettings(withStatuses(FRStatusSelect));