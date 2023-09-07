
import { get, set } from "lodash";
import { Extend } from "../../dynamic/extension";


export default class BindController extends Extend{

    execute(contentField: any): Promise<any>{   
        contentField.control = new Control(contentField.field, this.viewModel, this.target);
        return contentField;
    }
}


class Control {
    private _viewModel: any = undefined;
    private target: any;
    private field: any = {};
    private _eventList: any = {};
    private _errorList: any[] = [];

    constructor(field: string, _viewModel: any, target: any) {
        this._viewModel = _viewModel;
        this.field = field;
        this.target = target;
        this.initEvent();
    }

    initEvent() {
        this._eventList = {
            onChange: (val: any) => {

                const value = (val.target && val.target.value) || val;

                this.publishEvent('onchange', value);
            },
            onClick: (res: any) => {
  
            },
            onBlur: () => {},
            onFocus: () => {},
            onKeyUp: () => {},
            onKeyDown: () => {},
            onDrag: () => {},
        }
    }

    publishEvent(eventType: string, value: any) {
        
        const { action, dataBinding: { path, converter } } = this.field;
        const newValue = this.converterValue(converter, value, 'set');

        set(this._viewModel, path, newValue);

        for (const key in action) {
            if (Object.prototype.hasOwnProperty.call(action, key)) {
                const { name, params} = action[key];
                if (eventType === key) {
                    this.executeAction(name, params);
                }
            }
        }
    }

    converterValue(convert: string, value: any, operator: string) {
        if (!convert) {
            return value;
        }
        try {
            if (!this.executeAction(convert)[operator]){
                return value;
            }
            return this.executeAction(convert)[operator](value);
        } catch (error) {
            console.error(`未注册对应的函数${convert}, ${error}`);
        }
    }

    executeAction(actionName: string, params?: any) {
        try {
            return this.target.__proto__[actionName].call(this, params);
        } catch (error) {
            console.error(`未注册对应的函数${actionName}, ${error}`);
        }
    }



    get
    value() {
        const { dataBinding: { converter } } = this.field;
        const value = get(this._viewModel, this.field.dataBinding.path);
        this._errorList = [];

        return  this.converterValue(converter, value, 'get');
    }

    get
    viewModel() {
        return  this._viewModel;
    }

    get
    event() {
        return this._eventList;
    }

    get
    error() {
        return []
    }


}
