import BasicAction from "./basicAction";
import "reflect-metadata";
import { DataCenter } from "./dataCenter";
import { HandleLifeCycle } from "./handleLifeCycle";



export function createClassForStatus(target: any, alias: any, observer: any) {
  

  class B extends target{
    constructor() {
      super()
    }
  }

  // class test extends Mixin(HandleLifeCycle, DataCenter, target){
  //   [x: string]: any;
  //   constructor(...args: any[]) {
  //     super();

  //     this._ready_handle_view_model(...args).then((res: any) => {
  //       console.log('res: ', res);

  //       // this

  //     });

  //     // setTimeout(() => {
  //     //   this._setStatus("componentWillMount", []);
  //     // }, 3000)

  //   }



  // }

  const app1 = ClassMixin(B, HandleLifeCycle, DataCenter)
  console.log('app1: ', new app1());

  // console.log('111',  new B());
  console.log('111',  new DataCenter());

  // const app: any = new test(alias, observer);
  // console.log('target: ', app);

  // return app;
}

function ClassMixin(...mixins: any) {

  class Mix {

  }

  return mixins.reduce((prev: any, next: any) => {
    return prev;
  }, Mix)
}


function Mixin<T extends any[]>(...mixins: T) {
  console.log('mixins: ', mixins);

  class Mix{
    constructor(...args: any[]){
      // if (super) {
      //   super(...args)
      // }
      // super(...args)
    }
  }
  //...
  const mergeDesc: any = {};
  const allowMergeKeys: any = ['init', 'same'];
  function copyProperties(target: any, source: any) {
    for (let key of Object.getOwnPropertyNames(source)) {
      if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
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
  //...
  for (const key in mergeDesc) {
    const fns = mergeDesc[key];
    Object.defineProperty(Mix.prototype, key, {
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
    copyProperties(Mix, mixin); // 拷贝静态属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
    copyProperties(Mix.prototype, mixin.prototype.__proto__); // 拷贝继承的原型属性
    Mix.prototype.constructor = mixin.prototype.constructor;
  }
  return Mix;
}



const copyProperties = (target: any,source: any)=>{ //加一个拷贝函数，用来拷贝传入的所有class的静态，及其prototype。
  Object.getOwnPropertyNames(source).concat(Object.getOwnpropertySymbols(source)).forEach((prop: any)=>{
  // 过滤条件
      if(!prop.match(/^(?:constructor|protype|arguments|name))){
        Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop))
      }
  })
}


// 创建Mixins主体
const Mixins = (BaseClass: any, ...mixins: any)=>{
  // 创建一个基础Base。将其他mixin与其绑定
  class Base extends BaseClass{
      constructor(...props: any){
          super(...props)
      }
  }
  // 将其余需要被继承的class 与Base绑定。其类及其prototype
  mixins.forEach((mixin: any) => {
      copyProperties(Base, mixin)
      copyProperties(Base.prototype, mixin.prototype)
  })
  return Base
}