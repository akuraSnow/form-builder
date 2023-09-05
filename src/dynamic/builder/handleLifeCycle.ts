
import BasicAction from "../plugin/basicAction";
import { Observable } from "../utility";


// const statue = {
//   readying
//   componentWillMount
//   componentDidMount
//   componentWillUpdate
//   componentDidUpdate
//   componentWillUnmount
//   componentDidCatch
// }



export class HandleLifeCycle {
  private observer: any = new Observable(() => {});
  private alias: any;
  private data: any;
  private status: any;

  constructor() { }

  _ready_handle_load_json(alias: any, observer: any) {
    this.observer = observer;
    this.alias = alias;

    this._setStatus("readying", []);
    return this._fetchData().then((res) => {
      // this._setStatus("componentWillMount", res);
      return res;
    });
  }


  async _fetchData() {
    const action = BasicAction.getInstance();
    return await action.fetchData(this.alias.jsonName);
  }

  _setStatus(status: any, data: any[]) {
    this.data = data;
    this.status = status;
    this.observer.next({
      status: this.status,
      data: this.data,
    });
  }


  readying(data: any) { }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUpdate() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  componentDidCatch() {}
}
