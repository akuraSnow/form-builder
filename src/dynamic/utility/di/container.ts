

export default class Container {
  /**
   * components维护组件列表
   * instances维护实例列表
   */
  components = new Map<string, any>(); // key ->  Constructor
  extension = new Map<string, any>(); // key ->  Constructor
  instances = new Map<string, object>(); // key -> Instance
  functions = (action: any, func:any) => {};
  
  /**
   * 注册组件
   * @param constructor 被装饰的类的构造函数
   * @param alias 该组件的名字，默认取类名
   */
  registerComponent(constructor: Function, alias?: string) {
    let name = alias;
    if (!name) {
      name = constructor.name;
    }
    if (this.components.has(name)) {
      console.warn("重复注册Component: " + name);
    }
    this.components.set(name, constructor);
  }

  cacheFunction(fns: any) {
    this.functions = fns;
  }

  registerExtension(fn: any, alias: any) {

    let name = alias;
    if (!name) {
      name = fn.name;
    }
    if (this.extension.has(name)) {
      console.warn("重复注册extension: " + name);
    }
    this.extension.set(name, fn);

  }

  /**
   * 获取实例，实例是懒加载的单例，第一次获取时创建
   * @param alias 组件名字
   */
  get(alias: string) {
    if (this.instances.has(alias)) {
      return this.instances.get(alias);
    }
    const component = this.components.get(alias);

    if (!component) {
      throw "未注册: " + alias;
    }
    const ins = new component();
    this.instances.set(alias, ins);
    console.log(this);
    return ins;
  }

  // getInstance(alias: string) {
  //   // return this.get(alias);
  //   if (!this.instances.has(alias)) {
  //     const component = this.components.get(alias);
  //     if (!component) {
  //       throw "未注册: " + alias;
  //     }
  //     const ins = new component();
  // }

}
