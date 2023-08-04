

export default class util {


    quickSort(arr: any[] = [], cb: Function = () => {}): any[] {

        if (arr.length <= 1) {
            return arr;
        } else {
            const pivot = cb(arr[0], 0);
            const left = [];
            const right = [];
            let point = pivot;
            for (let i = 1; i < arr.length; i++) {
                point = cb(arr[i], point++)
                if (point < pivot) {
                    left.push(arr[i]);
                } else {
                    right.push(arr[i]);
                }
            }
            return this.quickSort(left, cb).concat(arr[0], this.quickSort(right, cb));
        }
    }
}