
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

    return extend.executeAction(name, params)

  }

  _setStatus(status: any, data: any[], observer: any) {
    if (!observer || !data) {
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
