import { FormBuilder } from "../../dynamic/builder";
import React, { useReducer, useContext, createContext } from 'react';
import { useFormBuilder } from "./form-builder";



export const Context = createContext({});
export default function About(props: any){

  const children: React.ReactNode = useFormBuilder({
    jsonName: 'config/app.json',
    viewModel: {
      premium: 333
    }
  }, props);

  const [state, dispatch]: [any, any] = useReducer(() => {}, props.initialState || 0, () => ({count: 10}));


  return (
    <Context.Provider value={{state, dispatch}}>
      { children }
    </Context.Provider>
  );
}
  