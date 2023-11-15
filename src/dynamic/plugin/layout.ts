import { iocContainer } from '../builder';
import _, { sortBy } from 'lodash';
class Layout {
  loadSource(json: any) {
    let newJson = [];
    if (json && Object.keys(json).length !== 0) {
      newJson = json.map((item: any) => {
        try {
          return {
            Element: iocContainer.components.get(item.type),
            field: item,
            data: {},
          };
        } catch (error) {
          console.log('error: ', error);
        }
      });
    }

    return  newJson;
  }

  normalizeTreeFormConfig(fields: any) {

    const rowList = this.getTreeArr(fields);

    return this.getTreeComponent(fields, rowList);


  }

  findChildren(list: any[], pid: string = '') {
    // 在list中根据pid来找元素
    let treeList: any[] = [];
    treeList = list.filter((it) => it.pid === pid);

    treeList.forEach((item: any) => {
      item.children = this.findChildren(list, item.id);
    });
    return treeList;
  }



  getTreeComponent(json, list) {

    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      
      if (Array.isArray(element)) {
        list[index] = this.getTreeComponent(json, element);
      } else {
        list[index] = json.filter(({field}) => field.id === element)[0];
      }
    }

    return list;

  }


  getTreeArr(json) {
    let rowList: any[] = [];
    for (let index = 0; index < json.length; index++) {
      const {
        field: {
          id,
          layoutDefinition: { grid },
        },
      } = json[index];
      const keyArr = grid ? grid.split(' '): [index];
      keyArr.reduce((pre: any, nex: any, index: number) => {
        if (keyArr.length === index + 1) {
          if (pre[nex]) {
            return pre[nex] = [...pre[nex], id];
          }
          return (pre[nex] = [id]);
        }
        return (pre[nex] = pre[nex] || []);
      }, rowList);

      json.grid = keyArr.join(' ');
    }

    return rowList;
  }

  toTree(list: any[], num: string = '0') {
    for (let i = 0; i < list.length; i++) {
      const index = `${num}${i}`;
      if (Array.isArray(list[i])) {
        list[i] = this.toTree(list[i], index);
      }
    }

    return list;
  }

  normalizeFormConfig(fields: any) {
    const contentList: any = [];
    const result = _.groupBy(fields, (item: any, index: number) => {
      return item.field.layoutDefinition && item.field.layoutDefinition.row;
    });

    for (const key in result) {
      if (Object.prototype.hasOwnProperty.call(result, key)) {
        const element = result[key];
        contentList.push(
          _.sortBy(element, (item: any) => {
            return (
              item.field.layoutDefinition && item.field.layoutDefinition.column
            );
          }),
        );
      }
    }
    return contentList;
  }
}

export const LayoutElement = new Layout();
