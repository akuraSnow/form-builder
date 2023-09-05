import BasicAction from "../plugin/basicAction";
import "reflect-metadata";
import { DataCenter } from "./dataCenter";
import { HandleLifeCycle } from "./handleLifeCycle";
import { Publisher } from "../plugin/subscribe";
import util from "../utility/until";
import { BasicExtension } from "../extension/bindExtension";



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

    private async  handleDataCenter(jsonList: any) {

      const content = this._init_view_model(jsonList, this.viewModel);

      const newContent = await BasicExtension._bind_extension_foreach(content, this.viewModel);
      this._setStatus("componentDidMount", newContent);
    }
  }

  const app: any = new test(alias, observer);
  // return app;
}


