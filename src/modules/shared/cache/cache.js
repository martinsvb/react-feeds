import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class cache {
    
    constructor() {
        this.ls = window.localStorage;
        this.subject = new BehaviorSubject(0);
        this.dataAdded$ = this.subject.asObservable();
    }

    setItem(key, value) {
        let data = this.ls.getItem('data');
        
        data = data ? JSON.parse(data) : {};
        data[key] = value;

        this.ls.setItem('data', JSON.stringify(data));
        this.subject.next(data);
    }

    getItem(key) {
        let result;
        let data = this.ls.getItem('data');

        if (data) {
            data = JSON.parse(data);
            if (data.hasOwnProperty(key)) {
                result = data[key];
            }
        }

        return result;
    }
}
