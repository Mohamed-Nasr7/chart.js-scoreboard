import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import FullPageLoader from "./scorecard/Loader/FullPageLoader";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import Tennis from "./Tennis";
import Soccer from "./Soccer";

const Home = React.lazy(() => import("./scorecard/Home"));

class App extends Component {
  render() {
    return (
      <>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router>
              <React.Suspense fallback={<FullPageLoader />}>
                <Switch>
                  <Route
                    exact={true}
                    path="/cricket/:matchId"
                    name="Home"
                    render={(props) => <Home {...props} />}
                  />
                  <Route path="/tennis/:matchId" component={Tennis} />
                  <Route path="/soccer/:matchId" component={Soccer} />
                </Switch>
              </React.Suspense>
            </Router>
          </PersistGate>
        </Provider>
      </>
    );
  }
}

export default App;
