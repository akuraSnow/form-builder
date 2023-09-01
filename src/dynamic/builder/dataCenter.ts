
import { LayoutElement } from './layout';

export class DataCenter {


    private handler: any;
    viewModel: any;

    constructor() {

    }



    _init_view_model(jsonList: any, viewModel: any = {}) {


        const newViewModel = this._get_init_view_model(jsonList.fields, {});
        // this.initDataCenter();
  
        const content = this._get_components_from_json(jsonList, newViewModel);

        console.log(this);
        return content
    }

    handleViewModel(viewModel: any = {}, handler: any) {
        return new Proxy(viewModel, handler);
    }

    _get_components_from_json(json: any, viewModel: any) {

        const content = LayoutElement.loadSource(json.fields, viewModel);
        this._bindControlInField(content);

        return content;
    }

    _bindControlInField(content: any){

        return content.map((contentField: any) => {
            if (Array.isArray(contentField)) {
                contentField = this._bindControlInField(contentField);
            } else {
                // const control = new Control(contentField.field, this.viewModel);
                // Publisher.add(control);
                contentField.control = new Control(contentField.field, this.viewModel);
            }
            return contentField;
        })

    }


    _get_init_view_model(json: any, viewModel: any = {}) {

        let newViewModel: any = viewModel;

        json.forEach((item: any) => {

            if (item.dataBinding) {
                const path = item.dataBinding.path.split('.');
                path.reduce((pre: any, nex: string, index: number) => {
                    const initData = path.length === index + 1 ? undefined : {};
                    return pre[nex] = pre[nex] || initData;
                }, viewModel);
            }
            
        })
        return  newViewModel;
    }
    
}



class Control {
    private viewModel: any = undefined;
    private _value: any = 111;
    private field: any = {};
    private isFocus: boolean;
    private isShow: boolean;
    private isDisabled: boolean;
    private isReadOnly: boolean;
    private isRequired: boolean;
    private isError: boolean;
    private isValid: boolean;
    private isValidError: boolean;
    private isValidSuccess: boolean;
    private isValidWarning: boolean;

    constructor(field: string, viewModel: any) {
        // super()
        // console.log('viewModel: ', viewModel);
        this.viewModel = viewModel;
        this.field = field;

        this.isFocus = false;
        this.isShow = false;
        this.isDisabled = false;
        this.isReadOnly = false;
        this.isRequired = false;
        this.isError = false;
        this.isValid = false;
        this.isValidError = false;
        this.isValidSuccess = false;
        this.isValidWarning = false;
    }

    getBindValue(): any {
        const path = this.field.dataBinding.path.split('.');

        return path.reduce( (pre: { [x: string]: any }, nex: string | number) => pre[nex],
            this.viewModel
        );
    }

    update() {
        console.log(222);
        this._value = 222;
    }

    get
    value() {
        return this._value;
    }

    set
    value(value) {
        this.viewModel = value;
    }

    get
    getIsFocus() {
        return this.isFocus;
    }

    set
    setIsFocus(value: boolean) {
        this.isFocus = value;
    }

    get
    getIsShow() {
        return this.isShow;
    }


}
