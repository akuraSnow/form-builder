import { Extend } from "../../dynamic/extension";


export default class loadDataSource extends Extend{

    async execute(content: any): Promise<any>{   

        try {
            if (content.field.dataSource) {
                const list =  await this.executeAction(content.field.dataSource, this);
                content.field.dataSourceList = list;
            }
            return Promise.resolve(content);
        } catch (error) {
            console.error(`未注册对应的函数${content.field.dataSource}, ${error}`);
        }
    }
}