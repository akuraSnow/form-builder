// import { FormBuilder } from "../About";

import PageFormBuilder from '../../dynamic/builder';

@PageFormBuilder({
  jsonName: '',
  provider: [],
})
export default class Home {
  [x: string]: any;

  constructor(props: any) {
    console.log('props: ', props);

    this.contents = props;
    this.viewModel = { premium: 111 };
    this.setJson({
      fields: [
        {
          id: 'input',
          type: 'input',
          label: '666',
          dataBinding: {
            path: 'premium',
            converter: 'convertLblPaymentAmount',
          },
          validator: [
            {
              name: 'required',
            },
          ],
          layoutDefinition: {
            row: 1,
            column: 1,
            columnSpan: 6,
          },
        },
        {
          id: 'addValue',
          type: 'button',
          label: '添加',
          metaData: {
            type: 'primary',
          },
          layoutDefinition: {
            row: 0,
            column: 1,
            columnSpan: 2,
          },
          action: {
            onclick: {
              name: 'showModel',
              params: {
                type: 'label',
              },
            },
          },
        },

        {
          id: 'model111',
          type: 'modal',
          // dataSource: 'getCalculatorData',
          dataBinding: {
            path: 'modal',
          },
          metaData: {
            title: '编辑',
            open: false,
            destroyOnClose: true,
            jsonName: 'config/editCalculator.json',
            onOk: 'handleCancel',
            onCancel: 'handleCancel',
          },
          layoutDefinition: {
            row: 10,
            column: 1,
            columnSpan: 12,
          },
        },
      ],
    });
  }

  componentDidMount(data: any) {
    console.log('data: ', data);
    console.warn('data: ', this.contents);

    // this.loadJson({
    //   jsonName: 'config/editCalculator.json'
    // })
  }

  getCalculatorData(res: any) {
    console.log('res: ', res);

    return Promise.resolve([
      {
        key: '1',
        name: 'required',
        firstName: 'fdf',
        content: 32,
        operate: <div>fff</div>,
      },
    ]);
  }

  getInputAction() {
    console.log(this.viewModel);
    return Promise.resolve('我是一个rrr大写的人');
  }

  getViewModel() {
    console.log(this.viewModel);
  }

  showModel(params: any) {
    console.log(this.viewModel);

    this.viewModel.modal = {
      name: '2222',
    };
    this.updateField([
      {
        id: 'model111',
        metaData: {
          title: '新增',
          open: true
        },
      },
    ]);
  }

  handleCancel(params: any) {
    console.log('params: ', params);

    console.log(this);
    this.updateField([{ id: 'model111', metaData: { open: false } }]);
  }

  getCalData() {
    return {
      name: '343444',
    };
  }
}
