
import { iocContainer } from '../builder';
import _ from 'lodash';
class Layout{ 

    loadSource(json: any, viewModel: any) {

        let newJson = [];
        if (json && Object.keys(json).length !== 0) {
            newJson = json.map((item: any) => {
                try {
                    return {
                        Element: iocContainer.components.get(item.type),    
                        field: item,
                        instance: null,
                        Event: null,
                        data: {}
                    };
        
                } catch (error) {
                    console.log('error: ', error);
                } 
            })
        }

        return this.normalizeFormConfig(newJson);
    
    }


    update() {
        console.log(222);
        // this._value = 222;
    }
    
    normalizeFormConfig(fields: any) {
    
        const contentList: any = [];
        const result = _.groupBy(fields, (item: any, index: number) => {
            return item.field.layoutDefinition.row;
        });
    
        for (const key in result) {
            if (Object.prototype.hasOwnProperty.call(result, key)) {
                const element = result[key];
                contentList.push(_.sortBy(element, (item: any) => {
                    return item.field.layoutDefinition.column;
                }))
            }
        }
        return contentList;
    }
}

export const LayoutElement =  new Layout();



