import React, { useEffect, useState, useReducer, useContext, createContext } from 'react';

import { getLayOut } from './layout';
import { Context } from './index';
import BasicAction from './basicAction';


export function useFormBuilder(data: any, props: any): React.ReactNode {
    const basicAction = new BasicAction();

    const [json, setJson] = useState({});
    const [children,setChildren]: any = useState(null);

    useEffect(() => {
        // basicAction.linsten.subc();
        const fetchData = basicAction.fetchData(data.jsonName);
        fetchData.catch(console.error);;
    }, []);

    useEffect(() => {
        const childrenList = getLayOut(json);
        setChildren(childrenList);
    }, [json]);

    return <Context.Consumer>{(theme) => {

        return (children || []).map((item: any, index: string) => {
            return  item.map((ElementList: any, i: number) => {
                const { comment: Element, field } =  ElementList;
                return <Element key={`${index}-${i}`.toString()} data={theme} field={field} viewModel={data.viewModel}/>
            })
        });
    }}</Context.Consumer>;
}