export const applyTaskTemplate = (taskTemplate, task) => {
    Object.keys(taskTemplate.properties).forEach(key => {
        const value = taskTemplate.properties[key];
        if (typeof value !== 'undefined' && value !== null) {
            task[key] = value;
        }
    });
}