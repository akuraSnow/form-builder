import BasicAction from "../plugin/basicAction";
import "reflect-metadata";
import { DataCenter } from "./dataCenter";
import { HandleLifeCycle } from "./handleLifeCycle";
import { Publisher } from "../plugin/subscribe";
import util from "../utility/until";
import { BasicExtension } from "../extension/bindExtension";
import _ from "lodash";



export function createClassForStatus(target: any, alias: any, observer: any) {
  class test extends util.Mixin(target, HandleLifeCycle, DataCenter) {
    [x: string]: any;

    private handler: any = {
      get(target: any, prop: any) {
        if (prop in target) {
          return target[prop]; // 返回其翻译
        } else {
          return prop;
        }
      },
      set(target: any, prop: any, val: any) {

        if (Object.prototype.toString.call(val) === '[object Object]' && Object.keys(val).toString() !== Object.keys(target[prop]).toString()) {
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
      },
    };;

    constructor(...args: any[]) {
      super();
      this.handleLifeCycleForJson(args);
    }

    private async handleLifeCycleForJson(args: any) {
      const jsonList = await this._ready_handle_load_json(...args);

      this.handleDataCenter(jsonList);
    }

    private async  handleDataCenter(jsonList: any) {

      const { content, viewModel} = this._init_view_model(jsonList, this.viewModel);
      this.viewModel = this.handleViewModel(viewModel, this.handler);
      console.log('this.viewModel: ', this.viewModel);

      const newContent = await BasicExtension._bind_extension_foreach(content, this.viewModel, this);
      this._setStatus("componentDidMount", newContent);
    }
  }

  return new test(alias, observer);
}


