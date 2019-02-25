import * as React from "react";
import { Provider } from "mobx-react";
import Main from "./components/Main";
import TodoStore from "./store/todoStore";

const store = new TodoStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
