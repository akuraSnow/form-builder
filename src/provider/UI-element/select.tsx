import { Input as FormInput } from 'antd';
import { Select as FromSelect, Space } from 'antd';

const { Option } = FromSelect;

export default function Select(props: any) {

    const { control, field: { dataSource } } = props;


    return  (<FromSelect
        defaultValue={control.value}
        style={{ width: '100% '}}
        {...control.event}
        options={dataSource}
    />)
}