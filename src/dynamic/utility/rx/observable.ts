// @ts-nocheck

function pipeFromArray(fns) {
    if (fns.length === 0) {
        return (x) => x;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return (input) => {
        return fns.reduce((prev, fn) => fn(prev), input);
    };
}
class Subscription {
    constructor() {
        this._teardown = [];
    }
    unsubscribe() {
        this._teardown.forEach((teardown) => {
            typeof teardown === 'function' ? teardown() : teardown.unsubscribe()
        });
    }
    add(teardown) {
        if (teardown) {
            this._teardown.push(teardown);
        }
    }
}
class Subscriber extends Subscription {
    constructor(observer) {
        super();
        this.observer = observer;
        this.isStopped = false;
    }
    next(value) {
        if (this.observer.next && !this.isStopped) {
            this.observer.next(value);
        }
    }
    error(value) {
        this.isStopped = true;
        if (this.observer.error) {
            this.observer.error(value);
        }
    }
    complete() {
        this.isStopped = true;
        if (this.observer.complete) {
            this.observer.complete();
        }
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
}


export class Observable {
    constructor(_subscribe) {
        this._subscribe = _subscribe;
    }
    subscribe(observer) {
        const subscriber = new Subscriber(observer);
        subscriber.add(this._subscribe(subscriber));
        return subscriber;
    }

    pipe(...operations) {
        return pipeFromArray(operations)(this);
    }
}


export function map(project) {
    return (observable) => new Observable((subscriber) => {
        const subscription = observable.subscribe({
            next(value) {
                return subscriber.next(project(value));
            },
            error(err) {
                subscriber.error(err);
            },
            complete() {
                subscriber.complete();
            },
        });
        return subscription;
    });
}

