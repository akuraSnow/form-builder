import Container from "../di/container";
import BasicAction from "./basicAction";
import { Observable, map } from "../rx/index";

import { DataCenter } from './dataCenter';
import { createClassForStatus } from "./combineClassAndData";

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
      // action.init(target, alias);
      const source = new Observable((observer: any) => {
        return createClassForStatus(target, alias, observer);
      });

      return iocContainer.functions(source);
    };
  };
};




