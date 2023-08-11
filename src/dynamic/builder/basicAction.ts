

import { getLayOut } from './layout';


export default class BasicAction{

    data: any;

    private cacheData: any = new Map();
    private viewModel: any = new Map();
    static instances: any = null;


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
    

    init(target: any, alias: any) {
        // console.log('target: ', target);
        // console.log('viewModel: ', viewModel);
        return new Proxy(this, this.handler);
    }
    

    async fetchData(jsonName: string) {

        let json = {fields: []};
        if (this.cacheData.get(jsonName)) {   
            json = this.cacheData.get(jsonName);
        } else {
            json = await fetch(jsonName).then(res => res.json());
            const viewModel = new Proxy(this.getViewModel(json.fields), this.handler);
            this.cacheData.set(jsonName, {
                json,
                viewModel
            });
        }

        console.log('this.cacheData: ', this.cacheData);
        // console.log('viewModel: ', viewModel);
        return Promise.resolve(getLayOut(json));
      
    }


    getViewModel(json: any) {
        console.log('json: ', json);

        let viewModel: any = {};


        json.forEach((item: any) => {  
            if (item.dataBinding) {
                const path = item.dataBinding.path.split('.');

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
        })

        return viewModel;
    }


    static getInstance() {
        if (!this.instances) {
            const action = new BasicAction();
            this.instances = action;
            return action;
        }

        return this.instances;
    }
}