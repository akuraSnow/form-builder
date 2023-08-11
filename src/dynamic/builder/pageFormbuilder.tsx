import Container from "../di/container";
import BasicAction from "./basicAction";
import { Observable, map } from "../rx/index";

const iocContainer = new Container();


export class RegisterFormBuilder {

  constructor() {

  }

  static use(Component: any) {
    for (const key in Component) {
      if (Object.prototype.hasOwnProperty.call(Component, key)) {
        const element = Component[key];
        iocContainer.register(element, key);
      }
    }

    return this;
  }

  static render(fun: Function) {
    iocContainer.cacheFunction(fun);
  }

}

export const registerFormBuilder = new RegisterFormBuilder();



// const statue = {
//   readying
//   componentWillMount
//   componentDidMount
//   componentWillUpdate
//   componentDidUpdate
//   componentWillUnmount
//   componentDidCatch
// }



export default function PageFormBuilder(alias: any): any {

  return (target: any): any => {
    return () => {

      const action = BasicAction.getInstance();
      action.init(target, alias);
      const source = CreateObservable(target, alias);

      return iocContainer.functions(source);
    };
  };
};



function CreateObservable(target: any, alias: any) {
  return new Observable((observer: any) => {
    return createClassForStatus(target, alias, observer);
  })

}

function createClassForStatus(target: any, alias: any, observer:any) {
  
  class B extends target {

    static observer: any;

    constructor(...args: any[]) {
      super(...args);

      this.observer = args[0];

      this.setStatus('readying', []);

      this.fetchData().then((res) => {
        console.log('res: ', res);
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

