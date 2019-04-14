import { getFieldConfiguration } from '../data/DataFieldConfigurations';

export const getWidthForType = type => {
    return getFieldConfiguration(type).width;
}

export const isAlwaysInEditionForType = type => {
    return getFieldConfiguration(type).alwaysInEdition;
}

export const isCommitOnChangeForType = type => {
    return getFieldConfiguration(type).commitOnChange;
}

export const getNormalizeForType = type => {
    return getFieldConfiguration(type).normalize;
}

export const getValuePropNameForType = type => {
    return getFieldConfiguration(type).valuePropName;
}

export const getValueFromEventForType = type => {
    return getFieldConfiguration(type).getValueFromEvent;
}

export const getRenderForType = type => (text, record, index) => {
    return getFieldConfiguration(type).render(text, record, index);
}

export const getInputForType = (type, props) => {
    return getFieldConfiguration(type).input(props);
}

export const getSelectForType = type => {
    return getFieldConfiguration(type).select();
}

export const getConditionsForType = type => {
    return getFieldConfiguration(type).conditions;
}