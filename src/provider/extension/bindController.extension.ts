
import { get, set } from "lodash";
import { Extend } from "../../dynamic/extension";
import { iocContainer } from "../../dynamic/builder";


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

                const value = val.target ? val.target.value : val;

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
        const newValue = this.converterExtension(converter, value, 'set');

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

    converterExtension(convertName: string, value: any, operator: string) {
        if (!convertName) {
            return value;
        }
        
        const result = this.findExecuteFunction({
            name: convertName,
            value,
            extensionName: 'converter'
        }, value);
        return result === value ? value : result[operator](value);
    }

    validatorExtension(validatorName: string, value: any) {
        if (!validatorName) {
            return null;
        }
        return this.findExecuteFunction({
            name: validatorName,
            value,
            extensionName: 'validator'
        }, null);
    }

    findExecuteFunction({name, value, extensionName}: any, defaultReturn?: any) {
        try {
            if (this.target[name]){
                return this.executeAction(name, this);
            } else if (iocContainer[extensionName].has(name)) {
                return iocContainer[extensionName].get(name).call(this, value);
            }
            return defaultReturn;
        } catch (error) {
            console.error(`未注册对应的函数${name}, ${error}`);
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
        const { dataBinding: { converter },  validator} = this.field;
        const value = get(this._viewModel, this.field.dataBinding.path);
        this._errorList =  (validator || []).map((item: any) => {

            return this.validatorExtension(item.name, value);
        }).filter((e: any) => e);
        console.log('this._errorList: ', this._errorList);
        return  this.converterExtension(converter, value, 'get');
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
    errorList() {
        return this._errorList
    }


}
