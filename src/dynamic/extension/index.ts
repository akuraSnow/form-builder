


export class Extend {

    viewModel: any;
    content: any;
    target: any;

    constructor(content: any, viewModel: any, target: any) {
        this.viewModel = viewModel;
        this.content = content;
        this.target = target
    }

    async invoke(content: any){  
        const newContent = await Promise.all( content.map(async(contentField: any) => {
            return await Promise.all(contentField.map(async(field: any) => {
                return await this.execute(field);
            }))
        })) 

        return Promise.resolve(newContent);
    }

    executeAction(actionName: string, params?: any) {
        try {
          if (this.target.__proto__[actionName]) {
            return this.target.__proto__[actionName].call(this, params);
          }
    
          const action = new Function('target', 'params', actionName + ';return main(params, target);');
          return action(this.target, params);
        
        } catch (error) {
          console.error(`未注册对应的函数${actionName}, ${error}`);
        }
    }

    execute(content: any){
        return content;
    }
}