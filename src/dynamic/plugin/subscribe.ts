import _ from "lodash";
import { Observer, Subject } from "../utility/rx";


class EmitObserver extends Observer {
    private renderFunctionList: any = [];
    private field: any;
    constructor(field: any,fn?: any) {
        super();
        this.field = field;
        this.renderFunctionList.push(fn);
    }

    update(self: any): void {
        const fn = this.renderFunctionList;
        for (let index = 0; index < fn.length; index++) {
            const el = fn[index];
            if (this.shouldBeChange(self)) {
                el({field:  this.field, viewModel: self.state.viewModel}); 
            }
            
        }
    }

    shouldBeChange(self: any) {

        const { value, viewModel, path } = self.getState();
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

	setState(viewModel: any, value: any, path?: string) {
        this.state = { viewModel, value, path };
        this.notify()
	}

}

export const Publisher = new ViewModelPublisher();
// export const Emit = new EmitObserver();
export const Component = new ComponentObserver();



