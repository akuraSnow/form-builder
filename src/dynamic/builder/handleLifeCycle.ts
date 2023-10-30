
import BasicAction from "../plugin/basicAction";
import { Observable } from "../utility";


export class HandleLifeCycle {
  private observer: any = new Observable(() => {});
  private alias: any;
  private data: any;
  private status: any;

  constructor() { }

  _ready_handle_load_json(alias: any, observer?: any) {
    this.observer = observer || this.observer;
    this.alias = alias;
    const action = BasicAction.getInstance();

    this._setStatus("readying", []);
    if (this.alias.json) {
      return Promise.resolve(this.alias.json);
    }
    return action.fetchData(this.alias.jsonName).then((res: any) => {
      return res;
    });
  }

  _setStatus(status: any, data: any[]) {
    this.data = data;
    this.status = status;
    this.observer.next({
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
