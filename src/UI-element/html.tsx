

export default function Html(props: any) {
    console.log('props: ', props);
    const { instance, field= { label: ''} } = props;

    function initial() {
        console.log('initial------------------>');
    }

    
    return <span dangerouslySetInnerHTML={{ __html: field.label}} ></span>;
}