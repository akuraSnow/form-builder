

export default function Html(props: any) {
    const { children, field } = props;
    return <span dangerouslySetInnerHTML={{ __html: field.label}}></span>;
}