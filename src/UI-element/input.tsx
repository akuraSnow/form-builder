import { useEffect, useState, useRef } from "react";
import { Button, Checkbox, Form, Input as FormInput} from 'antd';

export default function Input(props: any) {

    const { control, instance, field: { id, label, dataBinding: { path } } } = props;
    console.log('control: ', path, control.value);

    // const [value, setValue] = useState(control.value);

    // useEffect(() => {
    //     setValue(control.value);
    //     console.log('control.value: ', control.value);
    // }, [control.value])

     
    return (
        <div>
            <Form>
                <Form.Item
                    label={label}
                >
                    <FormInput
                        // defaultValue={control.value}
                        value={control.value}
                        // {...attribute}
                        {...control.event}
                    />
                </Form.Item>
            </Form>
    </div>);
}