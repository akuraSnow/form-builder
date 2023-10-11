
import { LayoutElement } from '../plugin/layout';

export class DataCenter {
    viewModel: any;

    _init_view_model(jsonList: any, viewModel: any = {}) {

        const newViewModel = this._get_init_view_model(jsonList.fields, viewModel);
        const content = LayoutElement.loadSource(jsonList.fields, newViewModel);
        return {content, viewModel: newViewModel};
    }

    _handle_view_model(viewModel: any = {}, handler: any, path: string = '') {

        for (const key in viewModel) {
            if (Object.prototype.hasOwnProperty.call(viewModel, key)) {
                const element = viewModel[key];
                if (Object.prototype.toString.call(element) === '[object Object]') {
                    viewModel[key] = this._handle_view_model(viewModel[key], handler, path + `${path ? '.' : ''}` + key );
                }
            }
        }

        viewModel.__path__ = path;
        return new Proxy(viewModel, handler);
    }

    _get_init_view_model(json: any = [], viewModel: any = {}) {

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


