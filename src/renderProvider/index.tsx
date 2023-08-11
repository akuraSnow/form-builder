

import React, { Fragment, useEffect, useState } from "react";
import { getLayOut } from "../dynamic/builder/layout";
import './index.css'


export default function RenderProvider(source: any) {

    const [children, setChildren] = useState([]);
  
    useEffect(() => {
      source.subscribe({
        next: (v: any) => {
          console.log('v: ', v);
          setChildren(v.data)
        }
      });
  
    }, []);

    const columns = (item: any, index: number): React.ReactNode => {
      return item.map((ElementList: any, i: number) => {
        const { Element, field } =  ElementList;
        const { layoutDefinition: { columnSpan = 1 }} = field;

        return <div className={`grid-item-${columnSpan}`} key={`${index}-${i}`.toString()}>
          <Element field={field} />
        </div>;
     })
    }
  
    return (children || []).map((item: any, index: number) => {
        return <div className="grid-container" key={index}>{columns(item, index)}</div>
    })
    
  }