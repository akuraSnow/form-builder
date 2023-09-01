
import { Observer, Subject } from '../rx/subject'

class EmitObserver extends Observer {
    private renderFunctionList: any = [];
    constructor(fn?: any) {
        super()
    }

    update(self: any): void {
        console.log('self: ', self);
        const { value, viewModel } = self;
        const fn = this.renderFunctionList;
        for (let index = 0; index < fn.length; index++) {
            const element = fn[index];
            element({value, viewModel});
        }
    }

    callBack(fn: any) {
        this.renderFunctionList.push(fn);
    }



}



export class ComponentObserver {

    constructor() {}

    private state = {};
    private listeners: any[] = [];



    render(fn: any) {

        const emit = new EmitObserver();

        Publisher.add(emit);
        return fn(emit);
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

    private viewModel: any = {};
    private value: any = undefined;

	constructor() {
		super()
		this.observers = []
	}
	// 获取当前楼盘状态
	getViewModel() {
		return this.viewModel
	}
	getValue() {
		return this.value;
	}
	// 设置楼盘状态
	setState(state: any, value: any, path?: string) {
		this.viewModel = state;
        this.value = value;
		this.notify()
	}

}

export const Publisher = new ViewModelPublisher();
// export const Emit = new EmitObserver();
export const Component = new ComponentObserver();



