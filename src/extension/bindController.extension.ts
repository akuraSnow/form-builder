import { get } from "lodash";
import { Extend } from "../dynamic/extension";


export default class BindController extends Extend{

    execute(contentField: any): Promise<any>{   


        contentField.control = new Control(contentField.field, this.viewModel);

        return contentField;
    }



    
}


class Control {
    private viewModel: any = undefined;
    private _value: any = 111;
    private field: any = {};
    private _eventList: any = {}

    constructor(field: string, viewModel: any) {
        this.viewModel = viewModel;
        this.field = field;
        this.initEvent();
    }

    initEvent() {
        this._eventList = {
            onChange: (val: any) => {
                this.viewModel[this.field.dataBinding.path] = val.target.value;
            },
            onClick: (res: any) => {
                console.log('res: ', res);
                console.log('res: ', this.viewModel);

            },
            onBlur: () => {},
            onFocus: () => {},
            onKeyUp: () => {},
            onKeyDown: () => {},
            onDrag: () => {},
        }
    }

    getBindValue(): any {
        const path = this.field.dataBinding.path.split('.');

        return path.reduce( (pre: { [x: string]: any }, nex: string | number) => pre[nex],
            this.viewModel
        );
    }

    get
    value() {
        return this.getBindValue();
    }

    get
    event() {
        return this._eventList;
    }


}
