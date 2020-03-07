import {
  BrowserRouter,
  Switch,
  Route,
  RouteProps,
  RouteComponentProps,
  Redirect
} from "react-router-dom";
import { LoginPage } from "../login/LoginPage";
import { HomePage } from "../home/HomePage";
import { RegisterPage } from "../register/RegisterPage";
import React, { useContext } from "react";
import { AppStoreContext } from "../../stores/AppStore";
import { useObserver } from "mobx-react";
import { ForgotPasswordPage } from '../forgotPassword/ForgotPassword';
export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute exact path="/" component={HomePage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/recover-account" component={ForgotPasswordPage} />
      </Switch>
    </BrowserRouter>
  );
}

const PrivateRoute: React.FunctionComponent<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const appStore = useContext(AppStoreContext);
  return useObserver(() =>
    !Component ? null : !appStore.didInitialize ? (
      <Route
        {...rest}
        render={(props: RouteComponentProps<{}>) => <div>loading...</div>}
      />
    ) : appStore.user ? (
      <Route
        {...rest}
        render={(props: RouteComponentProps<{}>) => <Component {...props} />}
      />
    ) : (
      <Redirect to="login" />
    )
  );
};

export default PrivateRoute;
