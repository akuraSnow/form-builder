
import BasicAction from "../plugin/basicAction";
import { Extend } from '../extension/index';


export class HandleLifeCycle {
  [x: string]: any;

  private alias: any;
  private data: any;
  private status: any;

  constructor() { }

  _ready_handle_load_json(alias: any) {

    this.alias = alias;
    const action = BasicAction.getInstance();

    if (this.alias.json) {
      return Promise.resolve(this.alias.json);
    }
    return action.fetchData(this.alias.jsonName).then((res: any) => {
      return res;
    });
  }

  _ready_handle_actions(jsonList: any, self: any) {
    const { actions: { load: { name ='', params=undefined } } = {load: {}}, fields } = jsonList;
    if (!name) {
      return {}
    }
    const extend = new Extend(fields, self.viewModel, self);
    return extend.executeAction(name, params) || self.viewModel;
  }


  executionStatus(status: string) {

    if (
      !this.args || 
      ['readying', 'componentWillMount', 'componentDidMount'].includes(status) &&  this.status.includes(status)
    ) {
      return false;
    }

    const [, observer] = this.args;

    this.status.push(status);
    this[status] && this[status].call(this, this.content || []);
    this.target._setStatus(status, this.content || [], observer);
  }

  _setStatus(status: any, data: any[], observer: any) {
    if (!observer || !data || !Array.isArray(data)){
      return false;
    }
    this.data = data;
    this.status = status;
    observer && observer.next({
      status: this.status,
      data: this.data,
    });
  }

  readying() {}
  componentWillMount() {}
  componentDidMount() {}
  componentWillUpdate() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  componentDidCatch() {}
}
