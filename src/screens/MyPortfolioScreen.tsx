import { Holdings, InputProperty } from "../components";
import React from "react";

const MyPortfolioScreen = () => {
  const [doRefetch, setDoRefetch] = React.useState(false);
  return (
    <div>
      <InputProperty setDoRefetch={setDoRefetch} doRefetch={doRefetch} />
      <Holdings query="mine" doRefetch={doRefetch} />
    </div>
  );
};

export default MyPortfolioScreen;
