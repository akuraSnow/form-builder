

export default class util {


    static quickSort(arr: any[] = [], cb: Function = () => {}): any[] {

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

    static Mixin<T extends any[]>(target: any, ...mixins: T) {
        const mergeDesc: any = {};
        const allowMergeKeys: any = ["init", "same"];
        function copyProperties(target: any, source: any) {
          for (let key of Object.getOwnPropertyNames(source)) {
            if (key !== "constructor" && key !== "prototype" && key !== "name") {
              let desc: any = Object.getOwnPropertyDescriptor(source, key);
              if (allowMergeKeys.includes(key as string)) {
                mergeDesc[key] = mergeDesc[key] || [];
                mergeDesc[key].push(desc.value);
              } else {
                Object.defineProperty(target, key, desc);
              }
            }
          }
        }
      
        for (const key in mergeDesc) {
          const fns = mergeDesc[key];
          Object.defineProperty(target.prototype, key, {
            configurable: true,
            enumerable: true,
            writable: true,
            value(...args: any) {
              const context = this;
              fns.forEach(function (fn: any) {
                fn.call(context, ...args);
              });
            },
          });
        }
      
        for (let mixin of mixins) {
          copyProperties(target, mixin); // 拷贝静态属性
          copyProperties(target.prototype, mixin.prototype); // 拷贝原型属性
          copyProperties(target.prototype, mixin.prototype.__proto__); // 拷贝继承的原型属性
        }
      
        return target;
    }
}