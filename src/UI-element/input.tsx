import { useEffect, useState, useRef } from "react";
import { Input as FormInput } from 'antd';

export default function Input(props: any) {

    const { control, listener, instance, field: { id, label, dataBinding: { path } } } = props;

    const [value, setValue] = useState(control.value);

    useEffect(() => {

        listener.callBack(({value}: any) => {
            setValue(value)
        })
    }, [])


     
    return (
    <FormInput
        // ref={childRef}
        // res={instance}
        value={value}
        // {...attribute}
        // {...event}
    />);
}