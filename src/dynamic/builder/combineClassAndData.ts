
import BasicAction from "./basicAction";
import { DataCenter } from "./dataCenter";

export function createClassForStatus(target: any, alias: any, observer:any) {
  
    class B extends target {
  
      static observer: any;
      static viewModel: any;
  
      constructor(...args: any[]) {
        super(...args);
  
        this.observer = args[0];
  
        this.setStatus('readying', []);
  
        this.fetchData().then((res) => {
           this.viewModel =  DataCenter.init(res)
           console.log('this.viewModel: ', this.viewModel);
          this.setStatus('componentWillMount', res);
        });
      }
  
      async fetchData() {
        const action = BasicAction.getInstance();
        return await action.fetchData(alias.jsonName);
      }
  
      setStatus(status: string, data: any[]) {
        this.observer.next({
          status: status,
          data: data
        })
      }
    };
  
    return new B(observer)
  
  }