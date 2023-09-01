



export class Subject {

  protected observers: any[] = [];
  constructor() {
    this.observers = [];
    console.log("Subject created");
  }
  // 增加订阅者
  add(observer: any) {
    console.log("Subject.add invoked");
    this.observers.push(observer);
  }
  // 移除订阅者
  remove(observer: any) {
    console.log("Subject.remove invoked");
    this.observers.forEach((item, i) => {
      if (item === observer) {
        this.observers.splice(i, 1);
      }
    });
  }
  // 通知所有订阅者
  notify() {
    console.log("Publisher.notify invoked");
    this.observers.forEach((observer) => {
      observer.update(this);
    });
  }
}


export class Observer {
    constructor() {
      console.log('Observer created')
    }
    update(self?: any) {
      console.log('Observer.update invoked')
    }
}
