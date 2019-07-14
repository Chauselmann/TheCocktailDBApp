import React from "react";
import { Provider } from "react-redux";

import Router from "./plugins/router";
import Store from "./plugins/store";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <Router />
      </Provider>
    );
  }
}
