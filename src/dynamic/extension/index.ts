


export class Extend {

    viewModel: any;
    content: any;

    constructor(content: any, viewModel: any) {
        this.viewModel = viewModel;
        this.content = content;
    }

    invoke(content: any){  
        const newContent = content.map((contentField: any) => {

            if (Array.isArray(contentField)) {
                contentField = this.invoke(contentField);
            } else {
                contentField = this.execute(content);
            }
            return contentField;
        })
        console.log('newContent: ', newContent);
        return Promise.resolve(newContent);
    }

    execute(content: any){
        return content;
    }
}