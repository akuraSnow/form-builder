

export class DataCenter {

    
    static viewModel: any;
    private handler = {
        get(target: any, prop: any) {
            if (prop in target) { //如果词典中有该短语
                return target[prop]; // 返回其翻译
              } else {
                // 否则返回未翻译的短语
                return prop;
              }
        },
        set(target: any, prop: any, val: any) {
            target[prop] = val;
            return true;
        }
    }

    static init(json: any) {
        console.log('json: ', json);

        return this.mapPathValue(json, {});
    }

    static mapPathValue(json: any, viewModel: any) {

        let newViewModel: any = viewModel;

        json.forEach((item: any) => {  
            if (Array.isArray(item) ) {
                newViewModel = this.mapPathValue(item, viewModel);
            } else {
                if (item.field.dataBinding) {
                    const path = item.field.dataBinding.path.split('.');
    
                    if (path.length === 1) {
                        viewModel[path[0]] = undefined;
                    } else if(path.length > 1) {
                        path.reduce((pre: string, nex: string) => {
                            if (!viewModel[pre]) {
                                viewModel[pre] = {[nex]: undefined};
                            } else {
                                viewModel[pre][nex] = undefined;
                            }
                        })
                    }
                }
            }
        })
        return newViewModel;
    }
}