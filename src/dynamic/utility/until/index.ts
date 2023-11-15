import { isArray, isObject, forOwn, omit } from 'lodash';

export default class util {


    static quickSort(arr: any[] = [], cb: Function = () => {}): any[] {

        if (arr.length <= 1) {
            return arr;
        } else {
            const pivot = cb(arr[0], 0);
            const left: any = [];
            const right: any = [];
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

    static omitDeepLodash(input: any, props: string[] = ['__path__']): any {

      let p = props;
      function omitDeepOnOwnProps(obj: any) {
          if (!isArray(obj) && !isObject(obj)) {return obj; }
          if (isArray(obj)) {return util.omitDeepLodash(obj, p); }
  
          const o: any = {};
          forOwn(obj, (value: any, key: any) => {
              o[key] = util.omitDeepLodash(value, p);
          });

          return omit(o, p);
      }
  
      if (arguments.length > 2) {p = Array.prototype.slice.call(arguments).slice(1); }
  
      if (typeof input === 'undefined') {return {}; }
  
      if (isArray(input)) { return input.map(omitDeepOnOwnProps);}
  
      return omitDeepOnOwnProps(input);
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
            writable: false,
            value(...args: any) {
              const context = this;
              fns.forEach(function (fn: any) {
                fn.call(context, ...args);
              });
            },
          });
        }
      
        for (let mixin of mixins) {
          copyProperties(target.target, mixin); // 拷贝静态属性
          copyProperties(target.prototype.target, mixin.prototype); // 拷贝原型属性
          copyProperties(target.prototype.target, mixin.prototype.__proto__); // 拷贝继承的原型属性
        }
      
        return target;
    }
}