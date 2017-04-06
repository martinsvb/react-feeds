const ls = window.localStorage;

export const cache = {

    set(key, value) {
        let data = ls.getItem('data');
        
        data = data ? JSON.parse(data) : {};
        data[key] = value;

        ls.setItem('data', JSON.stringify(data));
    },

    get(key) {
        let result;
        let data = ls.getItem('data');

        if (data) {
            data = JSON.parse(data);
            if (data.hasOwnProperty(key)) {
                result = data[key];
            }
        }

        return result;
    }
}
