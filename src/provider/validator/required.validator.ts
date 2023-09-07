


export default function required(control: any, target: any) {
    
    if (!control.value || control.value.toString().trim().length === 0) {
        return { required: true };
    }
    return null;
};