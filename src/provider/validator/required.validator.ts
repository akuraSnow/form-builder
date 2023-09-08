


export default function required(value: any, target: any) {
    
    if (!value || value.toString().trim().length === 0) {
        return { mes: '请输入' };
    }
    return null;
};