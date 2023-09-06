import { iocContainer } from "../builder";


export class BasicExtension{ 

    
    static _bind_extension_foreach(content: any, viewModel: any, target: any) {
        const extensions = iocContainer.extension;
        const extensionFnList = [];
        for (const key of extensions) {
            const el = iocContainer.extension.get(key[0]);
            extensionFnList.push(new el(content, viewModel, target));
        }


        return extensionFnList.reduce(async(pre: any, nex: any) => {
            try {
                if (pre.invoke.then) {
                    return nex.invoke(await pre.invoke);
                } else if (pre.invoke.subscript) {
                    return pre.invoke.subscript((res: any) => {
                        nex.invoke(res);
                    })
                }
             
            } catch (error) {
                return nex.invoke(content);
            }

        }, Promise.resolve(content));
    }

}
