import React, { useRef, useState, useLayoutEffect } from "react";
import "./input.scss";

import ErrorIcon from "@mui/icons-material/Error";

const Input = (data) => {
  const input = useRef(null);
  const placeHolder = useRef(null);
  const containerRef = useRef(null);

  const [inputVal, setInputVal] = useState(
    data.input ? data.input.value || "" : ""
  );

  // Important Functions
  function isInputEmpty(e) {
    return e.currentTarget.value === "";
  }

  //Handling  Error

  const [err, setErr] = useState(data.err || { err: false, errMsg: "" });

  useLayoutEffect(() => {
    if (!data.err) return;
    setErr(data.err);
  }, [data.err]);

  function handelErrDisplay() {
    containerRef.current.classList.remove("inputContainerErr");
    if (err.err) {
      filledAnimator(true);
      containerRef.current.classList.add("inputContainerErr");
    }
  }

  useLayoutEffect(() => {
    handelErrDisplay();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [err]);

  //Handling Rules

  function ruleAvailableOrNot(name) {
    if (!data.rules) return false;
    if (!data.rules[name]) return false;
    return true;
  }

  //required

  function requiredOrNot(e) {
    if (!ruleAvailableOrNot("required")) return;

    if (data.rules.required) {
      if (e.currentTarget.value === "") {
        setErr({ ...err, err: true, errMsg: `${data.name} required` });
      }
    }
  }

  //Handling  Animation
  function changeAnimator(e) {
    if (!isInputEmpty(e)) {
      focusAnimator(true);
    }
  }
  function filledAnimator(bool) {
    containerRef.current.classList.remove("inputContainerFilled");

    if (bool) {
      containerRef.current.classList.add("inputContainerFilled");
      return;
    }
    handelErrDisplay();
  }
  function focusAnimator(bool) {
    containerRef.current.classList.remove("inputContainerActive");

    if (bool) {
      containerRef.current.classList.add("inputContainerActive");
      return;
    }
  }

  useLayoutEffect(() => {
    if (inputVal !== "") {
      filledAnimator(true);
    }
  }, []);

  // input Change Function

  const inputChange = (e) => {
    setErr({ ...err, err: false, errMsg: "" });

    changeAnimator(e);
    focusAnimator(true);

    setInputVal(e.currentTarget.value);

    if (data.input) {
      if (data.input.func) {
        if (data.input.func.onChange) {
          data.input.func.onChange(e);
        }
      }
    }
  };
  const inputFocus = (e) => {
    focusAnimator(true);
  };
  const inputBlur = (e) => {
    focusAnimator(false);
    filledAnimator(false);
    requiredOrNot(e);

    if (!isInputEmpty(e)) {
      filledAnimator(true);
    }
  };

  const customInputFunc = {
    focus: inputFocus,
    blur: inputBlur,
  };

  const inputFunc = React.useMemo(() => {
    const list = {};
    Object.keys(customInputFunc).forEach((key) => {
      const func = (e) => {
        customInputFunc[key](e);
      };
      list[key] = [func];
    });

    if (data.input) {
      if (data.input.func) {
        Object.keys(data.input.func).forEach((key) => {
          const func = (e) => {
            data.input.func[key](e);
          };
          if (list[key]) {
            list[key].push(func);
          } else {
            list[key] = [func];
          }
        });
      }
    }

    return list;
  }, [data.input]);
  React.useEffect(() => {
    if (input === null || input.current === null) return;

    const inputCurrent = input.current;
    const list = inputFunc;

    Object.keys(list).forEach((key) => {
      inputCurrent.addEventListener(key, (e) => {
        list[key].forEach((fun) => {
          fun(e);
        });
      });
    });

    return () => {
      Object.keys(list).forEach((key) => {
        inputCurrent.removeEventListener(key, (e) => {
          list[key].forEach((fun) => {
            fun(e);
          });
        });
      });
    };
  }, [inputFunc]);

  return (
    <div className="mainInputContainer">
      <div className="inputContainer" ref={containerRef}>
        <input
          type="text"
          name={data.name}
          id={data.name}
          onChange={inputChange}
          // onBlur={inputBlur}
          ref={input}
          value={inputVal}
        />
        <div className="placeholderContainer" ref={placeHolder}>
          <p
            className="placeholderText"
            unselectable="on"
            onMouseDown={(e) => {
              e.preventDefault();
            }}
          >
            {data.placeholder}
          </p>
        </div>
      </div>

      <div className="errorContainer">
        <div className="icon">
          {err.err ? (
            <div className="err">
              <ErrorIcon />
            </div>
          ) : null}
          {err.err === "suc" ? <div className="suc"></div> : null}
          {err.err === "run" ? <div className="run"></div> : null}
        </div>
        <p>{err.errMsg}</p>
      </div>
    </div>
  );
};

export default React.memo(Input);
// export default Input;
