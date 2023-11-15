import _ from "lodash";
import { iocContainer } from "../builder";

export class BasicExtension{ 

    
    static _bind_extension_foreach(content: any, viewModel: any, target: any) {
        const extensions = iocContainer.extension;
        const extensionFnList:any = [];
        for (const key of extensions) {
            const el = iocContainer.extension.get(key[0]);
            extensionFnList.push(new el(content, viewModel, target));

        }

        return extensionFnList.reduce(async(pre: any, nex: any) => {
            try {

                if (pre.then) {
                    return nex.invoke(await pre);
                } else if (pre.invoke.then) {
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

    static _add_content_event_listener(content, { updateField }: any) {

        const newContent = this.flat(_.cloneDeep(content));

        for (let index = 0; index < newContent.length; index++) {
            const { field, control } = newContent[index];
            let actionExecute: any[] = [];
            for (const key in field) {
                if (Object.prototype.hasOwnProperty.call(field, key)) {
                    const el: string = field[key];
      
                    if (key.includes('Action')) {
                        actionExecute.push({
                            name: key.replace('Action', ''),
                            value: control.target.executeAction(el, control),
                        });
                    }
                }
            }

            if (actionExecute && actionExecute.length > 0) {
                const fields: any = {};
                Promise.all(actionExecute.map((res) => res.value)).then((res: any) => {
                    res.forEach((item: any, index: number) => {
                        fields[actionExecute[index].name] = item
                    });

                    updateField([{...field, ...fields}]);
                });
            }

        }
    }

    static flat(arr){
        if(Object.prototype.toString.call(arr) != "[object Array]"){return false};
        
        let res = arr.reduce((prev,cur)=>{
            return prev.concat(Array.isArray(cur) ? this.flat(cur) : cur)
        },[])
        return res;
    };

}
