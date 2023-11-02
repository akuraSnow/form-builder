import React, { useState } from 'react';
import { Button, Modal as ModalBuilder } from 'antd';

import PageFormBuilder from '../../dynamic/builder';

const Modal = (props: any) => {

  const {
    control: { target, value },
    field: {
      metaData: { onOk, onCancel, footer, jsonName, functions },
    },
  } = props;

  const [closeViewModel, setCloseViewModel] = useState(undefined as any);



  // let onClose: any =;
  const executeAction = (name: any, params?: any) => {
    target.executeAction(name,  closeViewModel);
  };


  return (
    <>
      <ModalBuilder
        {...props.field.metaData}
        onOk={() => executeAction(onOk)}
        onCancel={() => executeAction(onCancel)}
        footer={
          footer &&
          footer.map((item: any) => {
            const {
              element,
              onclick: { name, params },
            } = item;
            return (
              <span
                dangerouslySetInnerHTML={{ __html: element }}
                onClick={() => executeAction(name, params)}
              ></span>
            );
          })
        }
      >
        {React.createElement(ModelContent as any, {
          jsonName,
          setCloseViewModel,
          viewModel: value,
        })}
      </ModalBuilder>
    </>
  );
};

export default Modal;

@PageFormBuilder({})
class ModelContent {
  [x: string]: any;

  constructor(props: any) {

    const { viewModel, jsonName } = props;
    this.viewModel = viewModel;
    this.loadJson({
      jsonName,
    });

    props.setCloseViewModel(() => this.viewModel);
  }
}
