import React from 'react';
import { Checkbox, DatePicker, Input, InputNumber, Select } from 'antd';
import moment from 'moment';
import ContextTitle from '../components/contexts/ContextTitle';
import ContextSelect from '../components/contexts/ContextSelect';
import FolderTitle from '../components/folders/FolderTitle';
import FolderSelect from '../components/folders/FolderSelect';
import GoalTitle from '../components/goals/GoalTitle';
import GoalSelect from '../components/goals/GoalSelect';
import LocationTitle from '../components/locations/LocationTitle';
import LocationSelect from '../components/locations/LocationSelect';
import PriorityTitle from '../components/priorities/PriorityTitle';
import PrioritySelect from '../components/priorities/PrioritySelect';
import { escape } from '../utils/RegexUtils';

function defaultGetValueFromEvent(e) {
    if (!e || !e.target) {
        return e;
    }
    const { target } = e;
    return target.type === 'checkbox' ? target.checked : target.value;
}

export function getFieldTypes() {
    return [
        'checkbox',
        'context',
        'date',
        'datetime',
        'folder',
        'goal',
        'importance',
        'location',
        'money_dollar',
        'money_euro',
        'priority',
        'number',
        'text'
    ];
}

export function getFieldConfiguration(type, options) {
    let configuration = null;

    switch (type) {
        case 'checkbox': {
            configuration = {
                title: 'Boolean',
                width: 100,
                alwaysInEdition: true,
                commitOnChange: false,
                normalize: value => value,
                valuePropName: 'checked',
                getValueFromEvent: defaultGetValueFromEvent,
                render: value => <Checkbox checked={!!value} />,
                input: props => (
                    <Checkbox {...props} />
                ),
                conditions: [
                    {
                        type: 'equals',
                        title: 'Equals',
                        apply: (conditionValue, taskValue) => {
                            return conditionValue === taskValue;
                        }
                    },
                    {
                        type: 'not_equals',
                        title: 'Does not equal',
                        apply: (conditionValue, taskValue) => {
                            return conditionValue !== taskValue;
                        }
                    }
                ],
                options: []
            };

            break;
        }
        case 'context': {
            configuration = {
                title: 'Context',
                width: 200,
                alwaysInEdition: false,
                commitOnChange: false,
                normalize: value => value,
                valuePropName: 'value',
                getValueFromEvent: defaultGetValueFromEvent,
                render: value => (
                    <ContextTitle contextId={value} />
                ),
                input: props => (
                    <ContextSelect {...props} />
                ),
                conditions: [
                    {
                        type: 'equals',
                        title: 'Equals',
                        apply: (conditionValue, taskValue) => {
                            return conditionValue === taskValue;
                        }
                    },
                    {
                        type: 'not_equals',
                        title: 'Does not equal',
                        apply: (conditionValue, taskValue) => {
                            return conditionValue !== taskValue;
                        }
                    }
                ],
                options: []
            };

            break;
        }
        case 'date': {
            configuration = {
                title: 'Date',
                width: 250,
                alwaysInEdition: false,
                commitOnChange: true,
                normalize: value => value ? moment(value) : null,
                valuePropName: 'value',
                getValueFromEvent: defaultGetValueFromEvent,
                render: value => value ? moment(value).format('DD-MM-YYYY') : <span>&nbsp;</span>,
                input: props => (
                    <DatePicker format="DD-MM-YYYY" {...props} />
                ),
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        apply: (conditionValue, taskValue) => {
                            if (!conditionValue || !taskValue) {
                                return false;
                            }

                            return moment(conditionValue).isSame(moment(taskValue), 'day');
                        }
                    },
                    {
                        type: 'not_equal',
                        title: 'Does not equal',
                        apply: (conditionValue, taskValue) => {
                            if (!conditionValue || !taskValue) {
                                return false;
                            }

                            return !moment(conditionValue).isSame(moment(taskValue), 'day');
                        }
                    },
                    {
                        type: 'before',
                        title: 'Before',
                        apply: (conditionValue, taskValue) => {
                            if (!conditionValue || !taskValue) {
                                return false;
                            }

                            return moment(taskValue).isBefore(moment(conditionValue), 'day');
                        }
                    },
                    {
                        type: 'before_or_equal',
                        title: 'Before or equals',
                        apply: (conditionValue, taskValue) => {
                            if (!conditionValue || !taskValue) {
                                return false;
                            }

                            return moment(taskValue).isSameOrBefore(moment(conditionValue), 'day');
                        }
                    },
                    {
                        type: 'after',
                        title: 'After',
                        apply: (conditionValue, taskValue) => {
                            if (!conditionValue || !taskValue) {
                                return false;
                            }

                            return moment(taskValue).isAfter(moment(conditionValue), 'day');
                        }
                    },
                    {
                        type: 'after_or_equal',
                        title: 'After or equals',
                        apply: (conditionValue, taskValue) => {
                            if (!conditionValue || !taskValue) {
                                return false;
                            }

                            return moment(taskValue).isSameOrAfter(moment(conditionValue), 'day');
                        }
                    }
                ],
                options: []
            };

            break;
        }
        case 'datetime': {
            configuration = {
                title: 'Date time',
                width: 250,
                alwaysInEdition: false,
                commitOnChange: true,
                normalize: value => value ? moment(value) : null,
                valuePropName: 'value',
                getValueFromEvent: defaultGetValueFromEvent,
                render: value => value ? moment(value).format('DD-MM-YYYY HH:mm') : <span>&nbsp;</span>,
                input: props => (
                    <DatePicker showTime={{ format: 'HH:mm' }} format="DD-MM-YYYY HH:mm" {...props} />
                ),
                conditions: [
                    {
                        type: 'equal',
                        title: 'Equals',
                        apply: (conditionValue, taskValue) => {
                            if (!conditionValue || !taskValue) {
                                return false;
                            }

                            return moment(conditionValue).isSame(moment(taskValue), 'minute');
                        }
                    },
                    {
                        type: 'not_equal',
                        title: 'Does not equal',
                        apply: (conditionValue, taskValue) => {
                            if (!conditionValue || !taskValue) {
                                return false;
                            }

                            return !moment(conditionValue).isSame(moment(taskValue), 'minute');
                        }
                    },
                    {
                        type: 'before',
                        title: 'Before',
                        apply: (conditionValue, taskValue) => {
                            if (!conditionValue || !taskValue) {
                                return false;
                            }

                            return moment(taskValue).isBefore(moment(conditionValue), 'minute');
                        }
                    },
                    {
                        type: 'before_or_equal',
                        title: 'Before or equals',
                        apply: (conditionValue, taskValue) => {
                            if (!conditionValue || !taskValue) {
                                return false;
                            }

                            return moment(taskValue).isSameOrBefore(moment(conditionValue), 'minute');
                        }
                    },
                    {
                        type: 'after',
                        title: 'After',
                        apply: (conditionValue, taskValue) => {
                            if (!conditionValue || !taskValue) {
                                return false;
                            }

                            return moment(taskValue).isAfter(moment(conditionValue), 'minute');
                        }
                    },
                    {
                        type: 'after_or_equal',
                        title: 'After or equals',
                        apply: (conditionValue, taskValue) => {
                            if (!conditionValue || !taskValue) {
                                return false;
                            }

                            return moment(taskValue).isSameOrAfter(moment(conditionValue), 'minute');
                        }
                    }
                ],
                options: []
            };

            break;
        }
        case 'folder': {
            configuration = {
                title: 'Folder',
                width: 200,
                alwaysInEdition: false,
                commitOnChange: false,
                normalize: value => value,
                valuePropName: 'value',
                getValueFromEvent: defaultGetValueFromEvent,
                render: value => (
                    <FolderTitle folderId={value} />
                ),
                input: props => (
                    <FolderSelect {...props} />
                ),
                conditions: [
                    {
                        type: 'equals',
                        title: 'Equals',
                        apply: (conditionValue, taskValue) => {
                            return conditionValue === taskValue;
                        }
                    },
                    {
                        type: 'not_equals',
                        title: 'Does not equal',
                        apply: (conditionValue, taskValue) => {
                            return conditionValue !== taskValue;
                        }
                    }
                ],
                options: []
            };

            break;
        }
        case 'goal': {
            configuration = {
                title: 'Goal',
                width: 200,
                alwaysInEdition: false,
                commitOnChange: false,
                normalize: value => value,
                valuePropName: 'value',
                getValueFromEvent: defaultGetValueFromEvent,
                render: value => (
                    <GoalTitle goalId={value} />
                ),
                input: props => (
                    <GoalSelect {...props} />
                ),
                conditions: [
                    {
                        type: 'equals',
                        title: 'Equals',
                        apply: (conditionValue, taskValue) => {
                            return conditionValue === taskValue;
                        }
                    },
                    {
                        type: 'not_equals',
                        title: 'Does not equal',
                        apply: (conditionValue, taskValue) => {
                            return conditionValue !== taskValue;
                        }
                    }
                ],
                options: []
            };

            break;
        }
        case 'importance': {
            configuration = {
                title: 'Importance',
                width: 150,
                alwaysInEdition: false,
                commitOnChange: false,
                normalize: value => value,
                valuePropName: 'value',
                getValueFromEvent: defaultGetValueFromEvent,
                render: value => value ? value : <span>&nbsp;</span>,
                input: props => (
                    <InputNumber min={0} max={12} {...props} />
                ),
                conditions: [
                    {
                        type: 'equals',
                        title: 'Equals',
                        apply: (conditionValue, taskValue) => {
                            return conditionValue === taskValue;
                        }
                    },
                    {
                        type: 'not_equals',
                        title: 'Does not equal',
                        apply: (conditionValue, taskValue) => {
                            return conditionValue !== taskValue;
                        }
                    }
                ],
                options: []
            };

            break;
        }
        case 'location': {
            configuration = {
                title: 'Location',
                width: 200,
                alwaysInEdition: false,
                commitOnChange: false,
                normalize: value => value,
                valuePropName: 'value',
                getValueFromEvent: defaultGetValueFromEvent,
                render: value => (
                    <LocationTitle locationId={value} />
                ),
                input: props => (
                    <LocationSelect {...props} />
                ),
                conditions: [
                    {
                        type: 'equals',
                        title: 'Equals',
                        apply: (conditionValue, taskValue) => {
                            return conditionValue === taskValue;
                        }
                    },
                    {
                        type: 'not_equals',
                        title: 'Does not equal',
                        apply: (conditionValue, taskValue) => {
                            return conditionValue !== taskValue;
                        }
                    }
                ],
                options: []
            };

            break;
        }
        case 'money': {
            const currency = options && options.currency ? options.currency : '€';

            configuration = {
                title: 'Money Dollar',
                width: 150,
                alwaysInEdition: false,
                commitOnChange: false,
                normalize: value => value,
                valuePropName: 'value',
                getValueFromEvent: defaultGetValueFromEvent,
                render: value => value ? value : <span>&nbsp;</span>,
                input: props => (
                    <InputNumber
                        formatter={value => `${currency} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace('/(' + escape(currency) + ')\\s?|(,*)/g', '')}
                        {...props} />
                ),
                conditions: [
                    {
                        type: 'equals',
                        title: 'Equals',
                        apply: (conditionValue, taskValue) => {
                            return conditionValue === taskValue;
                        }
                    },
                    {
                        type: 'not_equals',
                        title: 'Does not equal',
                        apply: (conditionValue, taskValue) => {
                            return conditionValue !== taskValue;
                        }
                    }
                ],
                options: [
                    {
                        id: 'currency',
                        title: 'Currency',
                        type: 'text'
                    }
                ]
            };

            break;
        }
        case 'number': {
            configuration = {
                title: 'Number',
                width: 150,
                alwaysInEdition: false,
                commitOnChange: false,
                normalize: value => value,
                valuePropName: 'value',
                getValueFromEvent: defaultGetValueFromEvent,
                render: value => value ? value : <span>&nbsp;</span>,
                input: props => (
                    <InputNumber {...props} />
                ),
                conditions: [
                    {
                        type: 'equals',
                        title: 'Equals',
                        apply: (conditionValue, taskValue) => {
                            return conditionValue === taskValue;
                        }
                    },
                    {
                        type: 'not_equals',
                        title: 'Does not equal',
                        apply: (conditionValue, taskValue) => {
                            return conditionValue !== taskValue;
                        }
                    }
                ],
                options: []
            };

            break;
        }
        case 'priority': {
            configuration = {
                title: 'Priority',
                width: 200,
                alwaysInEdition: false,
                commitOnChange: false,
                normalize: value => value,
                valuePropName: 'value',
                getValueFromEvent: defaultGetValueFromEvent,
                render: value => (
                    <PriorityTitle priorityId={value} />
                ),
                input: props => (
                    <PrioritySelect {...props} />
                ),
                conditions: [
                    {
                        type: 'equals',
                        title: 'Equals',
                        apply: (conditionValue, taskValue) => {
                            return conditionValue === taskValue;
                        }
                    },
                    {
                        type: 'not_equals',
                        title: 'Does not equal',
                        apply: (conditionValue, taskValue) => {
                            return conditionValue !== taskValue;
                        }
                    }
                ],
                options: []
            };

            break;
        }
        case 'textarea': {
            configuration = {
                title: 'Text Area',
                width: 250,
                alwaysInEdition: false,
                commitOnChange: false,
                normalize: value => value,
                valuePropName: 'value',
                getValueFromEvent: defaultGetValueFromEvent,
                render: value => value ? value : <span>&nbsp;</span>,
                input: props => (
                    <Input.TextArea autosize={true} {...props} />
                ),
                conditions: [
                    {
                        type: 'equals',
                        title: 'Equals',
                        apply: (conditionValue, taskValue) => {
                            return conditionValue === taskValue;
                        }
                    },
                    {
                        type: 'not_equals',
                        title: 'Does not equal',
                        apply: (conditionValue, taskValue) => {
                            return conditionValue !== taskValue;
                        }
                    },
                    {
                        type: 'contains',
                        title: 'Contains',
                        apply: (conditionValue, taskValue) => {
                            return (taskValue || '').includes(conditionValue);
                        }
                    },
                    {
                        type: 'not_contains',
                        title: 'Does not contain',
                        apply: (conditionValue, taskValue) => {
                            return !(taskValue || '').includes(conditionValue);
                        }
                    }
                ],
                options: []
            };

            break;
        }
        case 'text':
        default: {
            configuration = {
                title: 'Text',
                width: 250,
                alwaysInEdition: false,
                commitOnChange: false,
                normalize: value => value,
                valuePropName: 'value',
                getValueFromEvent: defaultGetValueFromEvent,
                render: value => value ? value : <span>&nbsp;</span>,
                input: props => (
                    <Input {...props} />
                ),
                conditions: [
                    {
                        type: 'equals',
                        title: 'Equals',
                        apply: (conditionValue, taskValue) => {
                            return conditionValue === taskValue;
                        }
                    },
                    {
                        type: 'not_equals',
                        title: 'Does not equal',
                        apply: (conditionValue, taskValue) => {
                            return conditionValue !== taskValue;
                        }
                    },
                    {
                        type: 'contains',
                        title: 'Contains',
                        apply: (conditionValue, taskValue) => {
                            return (taskValue || '').includes(conditionValue);
                        }
                    },
                    {
                        type: 'not_contains',
                        title: 'Does not contain',
                        apply: (conditionValue, taskValue) => {
                            return !(taskValue || '').includes(conditionValue);
                        }
                    }
                ],
                options: []
            };

            break;
        }
    }

    configuration.select = () => (
        <Select>
            {configuration.conditions.map(condition => (
                <Select.Option key={condition.type} value={condition.type}>
                    {condition.title}
                </Select.Option>
            ))}
        </Select>
    );

    return configuration;
}