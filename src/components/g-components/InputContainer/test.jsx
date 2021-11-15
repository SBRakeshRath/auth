import React from "react";
const Test = (data) => {
  console.log(data);
  console.log("hallo from Test ----------------- ");
  return <h1>Iam an test </h1>;
};

export default React.memo(Test, (prev, next) => {
  console.log("------------");
  console.log(prev);
  console.log(next);

  console.log("-------------");

  return prev === next;
});
