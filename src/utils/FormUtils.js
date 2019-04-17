import { merge, setValue } from './ObjectUtils';
import moment from 'moment';

export const getDefaultFormItemLayout = () => {
    return {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 10 },
            xl: { span: 8 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
            xl: { span: 10 }
        }
    };
};

export const getDefaultTailFormItemLayout = () => {
    return {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0
            },
            sm: {
                span: 14,
                offset: 10
            },
            xl: {
                span: 10,
                offset: 8
            }
        }
    };
};

export const onFieldChangeForObjectUpdates = (fields, object, updateObject, assign = false) => {
    const values = {};
    const errors = [];
    let validating = false;

    flattenFields(null, fields).forEach(field => {
        setValue(values, field.name, moment.isMoment(field.value) ? field.value.toString() : field.value);
        errors.push(...(field.errors || []));

        if (field.validating) {
            validating = true;
        }
    });

    if (errors.length === 0 && !validating) {
        const updatedObject = merge({ ...object }, values);

        if (assign) {
            Object.assign(object, updateObject);
            updateObject(object);
        } else {
            updateObject(updatedObject);
        }
    }
}

const flattenFields = (path, object) => {
    if (typeof object !== 'object') {
        return [];
    }

    if ('name' in object && 'value' in object && object.name === path) {
        return [object];
    }

    const array = [];

    Object.keys(object).forEach(key => {
        array.push(...flattenFields((path ? path + '.' : '') + key, object[key]));
    });

    return array;
}