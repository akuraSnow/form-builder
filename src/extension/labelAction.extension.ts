import { Extend } from "../dynamic/extension";

export default class labelAction extends Extend{

    execute(content: any): Promise<any>{   
        console.log('content: ', content);

        return content
    }
    
    
}