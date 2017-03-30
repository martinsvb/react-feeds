/** Logger */
export const loggerLog = (component, message) => {
    console.log(`log from ${component}`, message);
}
export const loggerInfo = (component, message) => {
    console.info(`info from ${component}`, message);
}
export const loggerErr = (component, message) => {
    console.error(`error in ${component}`, message);
}
