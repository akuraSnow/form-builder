

import React, { Fragment, useEffect, useState } from "react";
import './index.css'

export default function RenderProvider(source: any, Component: any) {

    const [children, setChildren] = useState([]);

  
    useEffect(() => {
      source.subscribe({
        next: (v: any) => {
          console.log('v: ', v);
          setChildren(v.data);
        }
      });
  
    }, []);

    

    const columns = (item: any, index: number): React.ReactNode => {
      return item.map((ElementList: any, i: number) => {
        const { Element, field, control } =  ElementList;
        const { layoutDefinition: { columnSpan = 1 }} = field;

        return <div className={`grid-item-${columnSpan}`} key={`${index}-${i}`.toString()}>
          { Component.render((res: any) => {

            console.log('```````````````')
            return <Element field={field} control={control} listener={res}/>
          })} 
        </div>;
     })
    }
  
    return (children || []).map((item: any, index: number) => {
        return <div className="grid-container" key={index}>{columns(item, index)}</div>
    })
    
  }