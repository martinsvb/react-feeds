export const baseURL = "https://inloop-webproject.herokuapp.com/api/feeds";

const http = {

    get: (url, headers) => {
        return http.proccess("GET", url, headers);
    },
    post: (url, body, headers) => {
        return http.proccess("POST", url, headers, body);
    },
    put: (url, body, headers) => {
        return http.proccess("PUT", url, headers, body);
    },
    delete: (url, headers) => {
        return http.proccess("DELETE", url, headers);
    },

    proccess: (method, url, headers, body) => {
        if (method && url) {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                
                xhr.open(method, url);

                if (headers && !headers.hasOwnProperty('content')) {
                    headers["content-type"] = "application/json";
                }                
                if (!headers) {
                    headers = {"content-type": "application/json"};
                }

                Object.keys(headers).forEach(key => {
                    xhr.setRequestHeader(key, headers[key]);
                });
                
                xhr.onload = () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        console.log(xhr);
                        xhr.response
                            ? resolve(JSON.parse(xhr.response))
                            : resolve();
                    } else {
                        reject(xhr.statusText);
                    }
                };
                
                xhr.onerror = () => reject(xhr.statusText);
                
                xhr.send(body ? JSON.stringify(body) : null);
            });
        }
    }
};

export default http;