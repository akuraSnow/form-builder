import { Component, useEffect, useState } from "react";
import { DataHandle } from './dataHandle';




function DisplayItem(props: any) {
    console.log('props: ', props);

    useEffect(() => {

        const handleData = new DataHandle();

        const { config } = props[0];
        // const data = await handleData.catchData(config);
        // console.log('data: ', data);
        
        console.log('333')
    })

    return <div>ddd</div>
}


// export function FormBuilder<T>(...args: any[]): any {
  

//     return function (_constructor: any)  {
//         console.log('args: ', args);

//         return DisplayItem.bind(_constructor, args);
//     };
// }


export class FormBuilder extends Component{
  

    // return function (_constructor: any)  {
    //     console.log('args: ', args);

    //     return DisplayItem.bind(_constructor, args);
    // };
}