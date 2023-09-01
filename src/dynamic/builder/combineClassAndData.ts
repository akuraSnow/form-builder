import BasicAction from "./basicAction";
import "reflect-metadata";
import { DataCenter } from "./dataCenter";
import { HandleLifeCycle } from "./handleLifeCycle";
import { Publisher } from "./subscribe";


export function createClassForStatus(target: any, alias: any, observer: any) {
  class test extends Mixin(target, HandleLifeCycle, DataCenter) {
    [x: string]: any;

    private handler: any = {
      get(target: any, prop: any) {
        if (prop in target) {
          //如果词典中有该短语
          return target[prop]; // 返回其翻译
        } else {
          // 否则返回未翻译的短语
          return prop;
        }
      },
      set(target: any, prop: any, val: any) {
        Publisher.setState(target, val, prop)
        target[prop] = val;
        return true;
      },
    };;

    constructor(...args: any[]) {
      super();

      this.viewModel = this.handleViewModel(this.viewModel, this.handler);
      this.handleLifeCycleForJson(args);
    }



    private async handleLifeCycleForJson(args: any) {
      const jsonList = await this._ready_handle_load_json(...args);

      this.handleDataCenter(jsonList);
    }

    private handleDataCenter(jsonList: any) {

      const content = this._init_view_model(jsonList, this.viewModel);

      this._setStatus("componentDidMount", content);
    }
  }

  const app: any = new test(alias, observer);
  // return app;
}

function Mixin<T extends any[]>(target: any, ...mixins: T) {
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
