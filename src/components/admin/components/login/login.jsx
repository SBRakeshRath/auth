import Input from "../../../g-components/InputContainer/input";
import Test from "../../../g-components/InputContainer/test";

import React, { useRef, useState } from "react";
export default function Login() {
  const [inputErr, setInputErr] = useState({
    email: {
      err: false,
      errMsg: "",
    },
    password: {
      err: false,
      errMsg: "",
    },
  });

  const [inputValue, setInputValue] = useState({
    email: "",
    // password: "",
  });

  const testFunc = React.useCallback((e) => {
    console.log("function working")
    setInputValue((prev) => {
      return {
        ...prev,
        email: e.target.value,
      };
    });
  }, []);

  // const inputFunction = {}



  const inputsObj = React.useMemo(()=>{
    const inputs = [
      { name: "email", placeholder: "Enter Email", rules: { required: true } },
      {
        name: "password",
        placeholder: "Enter Password",
        rules: { required: false },
      },
    ];
    const final = []
    inputs.forEach((el , i)=>{
      const obj = {
        name : el.name || i ,
        placeholder : el.placeholder || "" ,
        rules : el.rules || {}
      }
      final.push(obj)
    })
    return final ;
  } ,[])

  const staticValueObj = React.useMemo(() => {
    const staticVal = {
      email: {
        input: {
          func: {
            input: testFunc,
          },
        },
      },
    };
    const final = {};
    inputsObj.forEach((el) => {
      final[el.name] = { func: {} };
      final[el.name].func = staticVal
        ? staticVal[el.name]
          ? staticVal[el.name].input
            ? staticVal[el.name].input.func || false
            : false
          : false
        : false;
    });

    return final;
  }, []);

  console.log(staticValueObj);

  const emailRef = useRef(null);
  return (
    <div className="middle-center-container">
      <div className="heading">
        <header>Login</header>
      </div>
      <div className="formContainers">
        <form action="#">
          {inputsObj.map((el, i) => {
            // const rules = el.rules;
            const err = inputErr[el.name];
            const input = staticValueObj[el.name];

            return (
              <Input
                name={el.name}
                placeholder={el.placeholder}
                input={input}
                rules={el.rules}
                err={err}
                // func={testFunc}
                key={el.name}
              />
            );
          })}
        </form>
        <button
          onClick={() => {
            setInputErr((prev) => {
              return {
                ...prev,
                password: {
                  err: true,
                  errMsg: "A  error",
                },
              };
            });
          }}
        >
          Testing Purpose
        </button>
      </div>
    </div>
  );
}
