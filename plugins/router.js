import { createStackNavigator, createAppContainer } from "react-navigation";

import Home from "../pages/Home.js";
import CocktailDetails from "../pages/CocktailDetails";

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    CocktailDetails: {
      screen: CocktailDetails
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);
