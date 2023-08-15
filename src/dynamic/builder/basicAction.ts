

import { getLayOut } from './layout';


export default class BasicAction{

    data: any;

    private cacheData: any = new Map();
    private viewModel: any = new Map();
    static instances: any = null;

    

    async fetchData(jsonName: string) {

        let json = {fields: []};
        if (this.cacheData.get(jsonName)) {   
            json = this.cacheData.get(jsonName);
        } else {
            json = await fetch(jsonName).then(res => res.json());
            this.cacheData.set(jsonName, json);
        }
        return Promise.resolve(getLayOut(json));
      
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