import { get } from "lodash";
import { Extend } from "../dynamic/extension";
import _ from "lodash";
import { Publisher } from "../dynamic/plugin";


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
    private _eventList: any = {}

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

                _.set(this._viewModel, this.field.dataBinding.path, value);
                console.log('value: ', value);
                console.log('this.field.dataBinding.path: ', this.field.dataBinding.path);
                // Publisher.notifyById(this._viewModel, val.target.value, this.field.id);
                this.publishEvent('onchange')
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

    publishEvent(eventType: string) {
        
        const { action } = this.field;

        for (const key in action) {
            if (Object.prototype.hasOwnProperty.call(action, key)) {
                const element = action[key];
                if (eventType === key) {
                    this.target.__proto__[element.name].call(this, element.params);
                }
            }
        }
    }



    get
    value() {
        return  _.get(this._viewModel, this.field.dataBinding.path);
    }

    get
    viewModel() {
        return  this._viewModel;
    }

    get
    event() {
        return this._eventList;
    }


}
