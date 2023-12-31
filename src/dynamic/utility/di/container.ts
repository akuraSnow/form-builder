

export default class Container {
  /**
   * components维护组件列表
   * instances维护实例列表
   */
  [x: string]: any;
  functions = (action: any, func:any) => {};
  


  cacheFunction(fns: any) {
    this.functions = fns;
  }

  registerExtension(fn: any, alias: any, containerName: string) {

    let name = alias;
    if (!name) {
      name = fn.name;
    }

    if (!this[containerName]) {
      this[containerName] = new Map<string, any>();
    }
    if (this[containerName].has(name)) {
      console.warn("重复注册extension: " + name);
    }
    this[containerName].set(name, fn);

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
