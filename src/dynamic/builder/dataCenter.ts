
import { LayoutElement } from '../plugin/layout';
import { iocContainer } from './index';

export class DataCenter {
    viewModel: any;

    _init_view_model(jsonList: any, viewModel: any = {}) {

        const newViewModel = this._get_init_view_model(jsonList.fields, {});
        const content = this._get_components_from_json(jsonList, newViewModel);
        // this._bind_control_in_field(content);
        return content;
    }

    handleViewModel(viewModel: any = {}, handler: any) {
        return new Proxy(viewModel, handler);
    }

    _get_components_from_json(json: any, viewModel: any) {

        const content = LayoutElement.loadSource(json.fields, viewModel);


        return content;
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


