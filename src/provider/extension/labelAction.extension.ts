import { Extend } from "../../dynamic/extension";

export default class labelAction extends Extend{

    async execute(content: any): Promise<any>{   

        try {
            if (content.field.labelAction) {
                const label =  await this.executeAction(content.field.labelAction, this);
                content.field.label = label;
            }
    
            return Promise.resolve(content);
        } catch (error) {
            console.error(`未注册对应的函数${content.field.labelAction}, ${error}`);
        }
    }
}