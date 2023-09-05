// import { Container } from "../utility/index";
// import { Observable } from "../../rx/index";

import { DataCenter } from './dataCenter';
import { createClassForStatus } from "./combineClassAndData";
import { Component } from '../plugin/subscribe';
import Container from '../utility/di/container';
import { Observable } from '../utility/rx';


export class RegisterFormBuilder {

  constructor() {

  }

  static use(Components: any) {
    for (const key in Components) {
      if (Object.prototype.hasOwnProperty.call(Components, key)) {
        const element = Components[key];
        iocContainer.registerComponent(element, key);
      }
    }

    return this;
  }

  static extends(fnList: any) {

    for (const key in fnList) {
      if (Object.prototype.hasOwnProperty.call(fnList, key)) {
        const element = fnList[key];
        iocContainer.registerExtension(element, key);
      }
    }
    return this;
  }

  static render(fun: Function) {
    iocContainer.cacheFunction(fun);
  }

}

export const iocContainer = new Container();
export const registerFormBuilder = new RegisterFormBuilder();


export default function PageFormBuilder(alias: any): any {

  return (target: any): any => {
    return () => {
      const source = new Observable((observer: any) => {
        createClassForStatus(target, alias, observer);
      });

      return iocContainer.functions(source, Component);
    };
  };
};




