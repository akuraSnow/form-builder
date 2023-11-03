export class Extend {
  viewModel: any;
  content: any;
  target: any;

  constructor(content: any, viewModel: any, target: any) {
    this.viewModel = viewModel;
    this.content = content;
    this.target = target;
  }

  async invoke(content: any) {
    const newContent = await Promise.all(
      content.map(async (contentField: any) => {
        return await Promise.all(
          contentField.map(async (field: any) => {
            return await this.execute(field);
          }),
        );
      }),
    );

    return Promise.resolve(newContent);
  }

  executeAction(actionName: string, params?: any) {
    try {
      let action;
      if (this.target.__proto__[actionName]) {
        action = this.target.__proto__[actionName];
      } else if (this.target.props && this.target.props.__proto__[actionName]) {
        action = this.target.props.__proto__[actionName];
      } else {
        action = new Function('params', 'target', actionName + ';return main(params, target);');
      }

      return action.call(this.target, params, this.viewModel);
    } catch (error) {
      console.error(`未执行函数${actionName}: ${error}`);
    }
  }

  execute(content: any) {
    return content;
  }
}
