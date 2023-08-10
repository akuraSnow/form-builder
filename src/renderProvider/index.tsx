

import React, { Fragment, useEffect, useState } from "react";
import { getLayOut } from "../dynamic/builder/layout";
import './index.css'


export default function RenderProvider(alisa: any, target: any, action: any) {

    const [children, setChildren] = useState([]);
  
    useEffect(() => {

      async function getData() {
        const json = await action.fetchData(alisa.jsonName);
        console.log('json: ', json);
        setChildren(json);
      }

      getData();
  
    }, []);

    const columns = (item: any, index: number): React.ReactNode => {
      return item.map((ElementList: any, i: number) => {
        const { comment: Element, field } =  ElementList;
        const { layoutDefinition: { columnSpan = 1 }} = field;
        const { viewModel } = action.cacheData.get(alisa.jsonName);
        
        return <div className={`grid-item-${columnSpan}`} key={`${index}-${i}`.toString()}>
          <Element field={field} viewModel={viewModel}/>
        </div>;
     })
    }
  
    return (children || []).map((item: any, index: number) => {
        return <div className="grid-container" key={index}>{columns(item, index)}</div>
    })
    
  }