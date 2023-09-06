import { Extend } from "../dynamic/extension";

export default class checkVisibility extends Extend{

    async execute(content: any): Promise<any>{   
        
        try {
            if (content.field.checkVisibility) {
                const list =  await this.target.__proto__[content.field.checkVisibility].call(this);
                content.field.visibility = list;
            }
    
            return Promise.resolve(content);
        } catch (error) {
            console.error(`未注册对应的函数${content.field.checkVisibility}, ${error}`);
        }

    }
    
    
}