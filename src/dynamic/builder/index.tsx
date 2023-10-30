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

  static use(extendObject: any) {

    for (const key in extendObject) {
      if (Object.prototype.hasOwnProperty.call(extendObject, key)) {
        const element = extendObject[key];
        for (const k in element) {
          if (Object.prototype.hasOwnProperty.call(element, k)) {
            const el = element[k];
            iocContainer.registerExtension(el, k, key);
            
          }
        }

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

    return (props: any) => {

      const source = new Observable((observer: any) => {
        createClassForStatus({target, alias, props}, observer);
      });

      return iocContainer.functions(source, Component);
    };
  };
};




