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
      super(props, args);
      this.args = args;
      this.status = [];
      this.target.executionStatus.call(this, "readying");
      this.loadJson(args[0]);
    }

    async loadJson(alias: any) {
      this.target.executionStatus.call(this, "componentWillMount");
      if (!alias.jsonName) {
        this.target.executionStatus.call(this, "componentDidMount");
        return false;
      }

      // 从加载json文件
      const jsonList = await this.target._ready_handle_load_json(alias);
      // 在渲染页面之前
      this.viewModel = await this.target._ready_handle_actions(jsonList, this);
      await this.setJson(jsonList);
      
      this.target.executionStatus.call(this, "componentDidMount");
    }

    async setJson(json: any) {
      this.target.executionStatus.call(this, "componentWillUpdate");
      
      // 获取初始化viewModel
      const { content, viewModel} = this.target._init_view_model(json, this.viewModel);
      // 把初始化vieModel进行proxy代理
      this.viewModel = this.target._handle_view_model(viewModel, this.getHandler());
      // 把content文件进行扩展之后传出
      this.content = await BasicExtension._bind_extension_foreach(content, this.viewModel, this);
      // 异步获取数据
      BasicExtension._add_content_event_listener(content, this);

      this.target.executionStatus.call(this, "componentDidUpdate");
    }

    updateField(fields: any[]) {
      (fields || []).forEach((field) => {
        Publisher.notifyById(field.id, field);
      })
    }

    getFieldById(id: any[]) {
      return ((Publisher as any).observers || []).filter(({ field: { id: fieldId } }: any) => fieldId === id).map((e: any) => e.field);
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
          if (
            target[prop] &&
            Object.prototype.toString.call(val) === '[object Object]' && 
            Object.keys(val).toString() !== Object.keys(target[prop]).toString()
          ) {
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


