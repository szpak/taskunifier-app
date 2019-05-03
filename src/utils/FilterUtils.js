import { getValue } from 'utils/ObjectUtils';
import { getFieldConditions } from 'data/DataFieldConditions';

export const getConditionsForType = type => {
    return getFieldConditions(type);
};

export const applyFilter = (objectFilter, object, fields) => {
    if (!objectFilter || !objectFilter.condition) {
        return true;
    }

    return applyCondition(objectFilter.condition, object, fields);
};

const applyCondition = (condition, object, fields) => {
    if (condition.operator) {
        if (!condition.conditions || condition.conditions.length === 0) {
            return true;
        }

        switch (condition.operator) {
            case 'AND': {
                let result = true;

                for (let i = 0; i < condition.conditions.length; i++) {
                    result = result && applyCondition(condition.conditions[i], object, fields);

                    if (!result) {
                        return false;
                    }
                }

                return result;
            }
            case 'OR': {
                let result = false;

                for (let i = 0; i < condition.conditions.length; i++) {
                    result = result || applyCondition(condition.conditions[i], object, fields);

                    if (result) {
                        return true;
                    }
                }

                return result;
            }
            case 'NOT': {
                return !applyCondition(condition.conditions[0], object, fields);
            }
            default: {
                return true;
            }
        }
    } else {
        const field = fields.find(field => field.id === condition.field);

        if (!condition || !field) {
            return true;
        }

        const c = getConditionsForType(field.type).find(c => c.type === condition.type);

        if (!c) {
            return true;
        }

        return c.apply(condition.value, getValue(object, field.id));
    }
};

export const sortObjects = (filter, a, b) => {
    if (!filter || !filter.sortBy) {
        return 0;
    }

    // TODO implement
    return 0;
}