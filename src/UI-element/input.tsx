import { useEffect, useState } from "react";
import { Input as FormInput } from 'antd';

export default function Input(props: any) {
    // console.log('props: ', props);

    const { viewModel, field: { id, label, dataBinding: { path } } } = props;
    // console.log('viewModel: ', viewModel);


    // const { attribute, event, control: { instance, value } } = props;

    return (
    <FormInput
        // res={instance}
        // value={value}
        // {...attribute}
        // {...event}
    />);
}