import * as H from "history";
import { useContext } from "react";
import React from "react";
import { AppStoreContext } from "../../stores/AppStore";
import {
  Redirect,
  RouteProps,
  Route,
  RouteComponentProps
} from "react-router-dom";
import useFirebase from "../../hooks/useFirebase";
import { useObserver } from "mobx-react";
import { Button } from "@material-ui/core";
import { CenteredForm } from "../../components/CenteredForm";
export function HomePage() {
  const appStore = useContext(AppStoreContext);
  const firebase = useFirebase();
  return useObserver(() => (
    <div>
      <CenteredForm title="Account" icon={<div></div>}>
        <h1>{appStore.user?.email}</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={e => {
            firebase.logout();
          }}
        >
          logout
        </Button>
      </CenteredForm>
    </div>
  ));
}
