import { compareObjectsHierarchy } from 'utils/CompareUtils';

export function sortObjects(objects, fields, filter, state, indented = true) {
    let sorters = [];

    if (filter && filter.sorters) {
        sorters = filter.sorters;
    }

    return objects.sort((a, b) => {
        let result = 0;

        for (let sorter of sorters) {
            const field = fields.find(field => field.id === sorter.field);
            const sortDirection = sorter.direction;

            if (!field || !sortDirection) {
                continue;
            }

            result = compareObjectsHierarchy(field, a, b, state, indented);

            if (sortDirection === 'descending') {
                result *= -1;
            }

            if (result !== 0) {
                break;
            }
        }

        if (result === 0) {
            result = compareObjectsHierarchy(fields.find(field => field.id = 'id'), a, b, state, indented);
        }

        return result;
    });
}