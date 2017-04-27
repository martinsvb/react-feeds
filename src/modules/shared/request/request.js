import { Observable } from 'rxjs/Rx';

import { cache } from '../index';

export const baseURL = "https://inloop-webproject.herokuapp.com/api/feeds";

const stringBody = (body) => body ? JSON.stringify(body) : null;

export const http = {

    get: (url, headers) => {
        return http.proccess("GET", url, headers);
    },
    post: (url, body, headers) => {
        return http.proccess("POST", url, headers, stringBody(body));
    },
    put: (url, body, headers) => {
        return http.proccess("PUT", url, headers, stringBody(body));
    },
    delete: (url, headers) => {
        return http.proccess("DELETE", url, headers);
    },
    uploadFile: (url, data, headers) => {
        let body = new FormData();
        
        for (const key of Object.keys(data)) {
            body.append(key, data[key]);
        }

        return http.proccess("POST", url, headers, body, true);
    },

    proccess: (method, url, headers, body, noHeaders) => {
        if (method && url) {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                
                xhr.open(method, url, true);

                if (!noHeaders) {
                    let mergedHeaders = {
                        'Content-Type': 'application/json',
                        ...headers
                    };

                    let token = cache.get('token');
                    if (token) {
                        mergedHeaders['Authorization'] = `Bearer ${token}`;
                    }

                    for (const key of Object.keys(mergedHeaders)) {
                        xhr.setRequestHeader(key, mergedHeaders[key]);
                    }
                }
                
                xhr.onload = () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        let data = null;
                        if (xhr.response) {
                            let resBody = JSON.parse(xhr.response);
                            data = resBody.data || resBody || {};
                        }
                        resolve(data);
                    } else {
                        reject(xhr.statusText);
                    }
                };
                
                xhr.onerror = () => reject(xhr.statusText);
                
                xhr.send(body);
            });
        }
    }
};

export const rxHttp = {

    get: (url, headers) => Observable.fromPromise(http.proccess("GET", url, headers)),
    
    post: (url, body, headers) => Observable.fromPromise(http.proccess("POST", url, headers, stringBody(body))),
    
    put: (url, body, headers) => Observable.fromPromise(http.proccess("PUT", url, headers, stringBody(body))),
    
    delete: (url, headers) => Observable.fromPromise(http.proccess("DELETE", url, headers)),

    uploadFile: (url, data, headers) => {
        let body = new FormData();
        
        for (const key of Object.keys(data)) {
            body.append(key, data[key]);
        }

        return Observable.fromPromise(http.proccess("POST", url, headers, body, true));
    },
};
