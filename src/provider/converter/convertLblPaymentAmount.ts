
export function convertLblPaymentAmount() {
    
    return {
        set: (value: any) => {return '$' + value},
        get: (value: any) => { return value}
    }
};