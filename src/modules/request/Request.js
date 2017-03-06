export default obj => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        
        ["GET", "POST", "PUT", "DELETE"].map((method) => {
            if (obj.hasOwnProperty(method)) {
                xhr.open(method, obj[method]);
            }
        })
        
        if (obj.headers) {
            Object.keys(obj.headers).forEach(key => {
                xhr.setRequestHeader(key, obj.headers[key]);
            });
        }
        
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(xhr.statusText);
            }
        };
        
        xhr.onerror = () => reject(xhr.statusText);
        
        xhr.send(obj.body);
    });
};