export const responseHandler = (data, tr, info, warning) => {
    let type = '';
    let text = '';
    
    if (data.hasOwnProperty("warning")) {
        type = "danger";
        text = warning && Object.keys(warning).includes(data.warning)
            ? tr[data.warning](warning[data.warning])
            : tr[data.warning];
    }

    if (data.hasOwnProperty("info")) {
        type = data.info ? "success" : "danger";
        text = tr[info[data.info]];
    }
    
    return {type, text};
}
