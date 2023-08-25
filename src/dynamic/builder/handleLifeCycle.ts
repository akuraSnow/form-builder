import BasicAction from "./basicAction";


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
  private observer: any;
  private alias: any;
  private data: any;
  private status: any;

  constructor() { }

  private _ready_handle_view_model(alias: any, observer: any) {
    this.observer = observer;
    this.alias = alias;

    this._setStatus("readying", []);
    return this._fetchData().then((res) => {
      console.log(this);
      this._setStatus("componentWillMount", res);
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
