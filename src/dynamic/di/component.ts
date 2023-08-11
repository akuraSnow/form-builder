
import Container from "./container";
import "reflect-metadata";
import camelCase from 'camelcase';

const iocContainer = new Container();

export function Component(alias?: any) {
  console.warn('alias: ', alias);
  return function (target: any) {
    iocContainer.register(target, alias || target.name);
    return target;
  };
}



export function AutoWired(alias?: string) {
  return function (target: any, propertyName: string) {
    let name = alias;
    // console.log('name: ', name);
    if (!name) {
      const classConstructor = Reflect.getMetadata(
        "design:type",
        target,
        propertyName
      );

      console.log(99, classConstructor, target, propertyName);
      name = classConstructor.name;
      // eslint-disable-next-line no-unused-expressions
      if (name === "Object") {
        // 没有写类型，则尝试将属性名转大写查找实例
        // eslint-disable-next-line no-unused-expressions
        name = camelCase(propertyName, { pascalCase: true });
      }
    }
    const instance = iocContainer.get(name || "");
    target[propertyName] = instance;
    return instance;
  };
}
