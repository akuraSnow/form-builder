

import data from '../../UI-element/index';
import util from './util';
import _ from 'lodash';
const utilFunction = new util();

function loadSource(json: any) {
    if (!json || Object.keys(json).length === 0) {
        return [];
    }

    return json.map((item: any) => {
        try {
            return {
                Element: data[item.type],    
                field: item,
                instance: null,
                Event: null,
                data: {},
                value: null,
                isFocus: false,
                isShow: false,
                isDisabled: false,
                isReadOnly: false,
                isRequired: false,
                isError: false,
                isValid: false,
                isValidError: false,
                isValidSuccess: false,
                isValidWarning: false,
                isValidInfo: false
            };

        } catch (error) {
            console.log('error: ', error);
        } 
    })

}


function normalizeFormConfig(fields: any) {

    const contentList: any = [];
    const result = _.groupBy(fields, (item: any, index: number) => {
        return item.field.layoutDefinition.row;
    });

    for (const key in result) {
        if (Object.prototype.hasOwnProperty.call(result, key)) {
            const element = result[key];
            contentList.push(_.sortBy(element, (item: any) => {
                return item.field.layoutDefinition.column;
            }))
        }
    }
    return contentList;
}


export function getLayOut(json: any){
    const newFields = loadSource(json.fields);
    const content = normalizeFormConfig(newFields)

    return content;
}