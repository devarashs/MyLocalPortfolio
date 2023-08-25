import { Holdings, InputProperty } from "../components";

const MyPortfolioScreen = () => {
  return (
    <div>
      <InputProperty />
      <Holdings query="mine" />
    </div>
  );
};

export default MyPortfolioScreen;
