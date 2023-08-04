
export default function Input(props: any) {
    console.log('props: ', props);

    const { children, viewModel, field: { id, label, dataBinding: {path} } } = props;
    // console.log('field: ', dataBinding);
    const value = viewModel[path]
    // console.log('dataBinding: ', dataBinding);
    console.log('viewModel: ', viewModel);
    console.log('value: ', value);

    

    return (
        <div className="input">
            <label htmlFor={id}>{label}</label>
            <input id={id} defaultValue={value || ''} type="text" placeholder="Enter your name" />
        </div>
    )
}