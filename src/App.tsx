import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Router from "./Router";

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={Router} />
    </Provider>
  );
};

export default App;
