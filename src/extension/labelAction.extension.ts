import { Extend } from "../dynamic/extension";

export default class labelAction extends Extend{

    async execute(content: any): Promise<any>{   

        try {
            if (content.field.labelAction) {
                const list =  await this.target.__proto__[content.field.labelAction].call(this);
                content.field.label = list;
            }
    
            return Promise.resolve(content);
        } catch (error) {
            console.error(`未注册对应的函数${content.field.labelAction}, ${error}`);
        }


    }
    
    
}