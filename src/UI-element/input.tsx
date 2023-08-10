import { useEffect } from "react";
import { Input as FormInput } from 'antd';

export default function Input(props: any) {
    console.log('props: ', props);

    const { children, field: { id, label, viewModel, dataBinding: {path} } } = props;
    console.log('viewModel: ', viewModel);
    // console.log('field: ', dataBinding);
    // const value = viewModel[path]
    // console.log('dataBinding: ', dataBinding);
    // console.log('viewModel: ', viewModel);
    // console.log('value: ', value);

    useEffect(() => {

    }, [viewModel[path]])

    

    return (  <FormInput defaultValue="26888888" />)
}