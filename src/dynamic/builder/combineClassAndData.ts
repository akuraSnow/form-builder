import { DataCenter } from "./dataCenter";
import { HandleLifeCycle } from "./handleLifeCycle";
import { Publisher } from "../plugin/subscribe";
import { BasicExtension } from "../extension/bindExtension";
import util from "../utility/until";
import _ from "lodash";

export function createClassForStatus({target, alias, props}: any, observer: any) {
  target.target = {};
  target.prototype.target = {};
  class test extends util.Mixin(target, HandleLifeCycle, DataCenter) {
    [x: string]: any;

    constructor(...args: any[]) {
      super(args, props);
      this.loadJson(args[0], args[1]);
    }

    async loadJson(alias: any, observer: any) {
      // 从加载json文件
      const jsonList = await this.target._ready_handle_load_json(alias, observer);
      this.setJson(jsonList);
    }

    async setJson(json: any) {
      // 获取初始化viewModel
      const { content, viewModel} = this.target._init_view_model(json, this.viewModel);
      // 把初始化vieModel进行proxy代理
      this.viewModel = this.target._handle_view_model(viewModel, this.getHandler());
      // 把content文件进行扩展之后传出
      const newContent = await BasicExtension._bind_extension_foreach(content, this.viewModel, this);

      this.target._setStatus("componentDidMount", newContent);
    }

    updateField(field: any) {
      Publisher.notifyById(field.id, field);
    }

    getHandler(): any {
      return {
        get(target: any, prop: any) {
          if (prop in target) {
            return target[prop]; // 返回其翻译
          } else {
            return prop;
          }
        },
        set(target: any, prop: any, val: any) {
          if ((Object.prototype.toString.call(val) === '[object Object]' && Object.keys(val).toString() !== Object.keys(target[prop]).toString())) {
            for (const key in val) {
              if (Object.prototype.hasOwnProperty.call(val, key)) {
                target[prop][key] = val[key]
              }
            }
            
          } else {
            target[prop] = val;
          }
      
          Publisher.setState(target, val, prop);
          return true;
        }
      };
    } 
  }

  return new test(alias, observer);
}


