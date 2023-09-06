import _ from "lodash";
import { Observer, Subject } from "../utility/rx";


class EmitObserver extends Observer {
    private renderFunctionList: any = [];
    private field: any;
    constructor(field: any,fn?: any) {
        super();
        this.field = field;
        this.renderFunctionList = fn;
    }

    update(self: any, path?: any): void {

        if (this.shouldBeChange(self, path)) {
            this.renderFunctionList({field:  this.field, viewModel: self.state.viewModel}); 
        }
    }

    updateById(self: any, id: string) {
        if (id === this.field.id) {
            this.renderFunctionList({field:  this.field, viewModel: self.state.viewModel}); 
        }
    }

    shouldBeChange(self: any, path?: any) {
        const { dataBinding: { path: filedPath = ''} = {} }= this.field;
        return path === filedPath;
    }
}



export class ComponentObserver {

    constructor() {}

    private state = {};
    private listeners: any[] = [];



    subscript(item: any, fn: any) {
        const emit = new EmitObserver(item, fn);
        Publisher.add(emit);
    }


    changeState(newState: any) {
        this.state = newState;
        /*通知*/
        for (let i = 0; i < this.listeners.length; i++) {
          const listener = this.listeners[i];
          listener();
        }
    }

    getState() {
        return this.state;
    }

}




class ViewModelPublisher extends Subject {

    private state: any = {};
    private value: any = undefined;

	constructor() {
		super()
		this.observers = [];
        // this.setState =  _.throttle(this.setState, 500);
	}

	getState() {
		return this.state
	}

	setState(viewModel: any, value: any, path: string) {

        const newPath = viewModel.__path__+ `${viewModel.__path__ && '.'}`+path
        this.state = { viewModel, value };
        this.publishState(value, newPath);

	}

    publishState(value: string | Object | any, path: string) {


        if (Object.prototype.toString.call(value) === '[object Object]'){
            for (const key in value) {
                if (Object.prototype.hasOwnProperty.call(value, key)) {
                    this.publishState(value[key], `${path}.${key}`);
                    
                }
            }
        }
        this.notify(path);
    }

    // 通知所有订阅者
    notify(path?: any) {
        this.observers.forEach((observer) => {
            observer.update(this, path);
        });
    }

    notifyById(viewModel: any, value: any, id?: any) {
        this.state = { viewModel, value };
        this.observers.forEach((observer) => {
            observer.updateById(this, id);
        });
    }

}

export const Publisher = new ViewModelPublisher();
// export const Emit = new EmitObserver();
export const Component = new ComponentObserver();



