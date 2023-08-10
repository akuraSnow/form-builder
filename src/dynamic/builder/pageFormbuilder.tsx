import Container from "../di/container";
import BasicAction from "./basicAction";


const iocContainer = new Container();


export class RegisterFormBuilder {

  constructor() {

  }

  static use(Component: any) {
    for (const key in Component) {
      if (Object.prototype.hasOwnProperty.call(Component, key)) {
        const element = Component[key];
        iocContainer.regist(element, key);
      }
    }

    return this;
  }

  static render(fun: Function) {
    iocContainer.cacheFunction(fun);
  }

}

export const registerFormBuilder = new RegisterFormBuilder();



export default function PageFormBuilder(alias: any): any {

  return (target: any): any => {
    return () => {

      const action = BasicAction.getInstance();

      return iocContainer.functions(alias, target, action);
    };
  };
};


