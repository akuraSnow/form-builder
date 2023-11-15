import React from 'react';
import { Table as TableForm } from 'antd';

const { Column, ColumnGroup } = TableForm;

export default function Table(props: any) {
  const {
    control: { target, event },
    field: {
      label,
      dataSource = [],
      metaData: { columns },
    },
  } = props;

  const operationBtn: any = (e: any, record: any) => {
    target.executeAction(e.name, record);
  };

  const ColumnSpan = (item: any) => {
    const { title, key, dataIndex, render: renderFun = undefined } = item;
    return (
      <Column
        title={title}
        dataIndex={dataIndex}
        key={key}
        render={
          renderFun
            ? (_, record: any) => {
                return renderFun.map((item: any) => (
                  <a
                    key={record.key}
                    dangerouslySetInnerHTML={{ __html: item.element }}
                    onClick={() => operationBtn(item.onclick, record)}
                  ></a>
                ));
              }
            : undefined
        }
      />
    );
  };

  return (
    <div style={{ width: '100%' }}>
      <TableForm dataSource={dataSource}>
        {columns.map((item: any, index: number) => {
          if (item.children && item.children.length > 0) {
            return (
              <ColumnGroup key={index} title={item.title}>
                {item.children.map((res: any, i: number) => ColumnSpan(res))}
              </ColumnGroup>
            );
          }
          return ColumnSpan(item);
        })}
      </TableForm>
    </div>
  );
}
