


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

    execute(content: any){
        return content;
    }
}