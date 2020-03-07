import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import UILink from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  useAsync,
  useAsyncAfterChain,
  useAsyncOptional,
  AsyncHookPromiseCallback
} from "../../hooks/useAsync";
import React, { useState, useContext, FormEvent } from "react";
import useFirebase from "../../hooks/useFirebase";
import mobx from "mobx";
import { useLocalStore, useObserver } from "mobx-react";
import { Link, Redirect } from "react-router-dom";
import { AppStoreContext } from "../../stores/AppStore";
import {
  DialogActions,
  CircularProgress,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Dialog
} from "@material-ui/core";
import { Copyright } from "../../components/Copyright";
import { ConfirmationDialog } from "../../components/ConfirmationDialog";
import { CenteredForm } from "../../components/CenteredForm";
export function RegisterPage() {
  const classes = useStyles();
  const appStore = useContext(AppStoreContext);
  const [promise, setPromise] = useState();
  const { loading, error, value } = useAsyncOptional(promise);
  const firebase = useFirebase();
  const registerStore = useLocalStore(() => ({
    email: "",
    password: "",
    errorModalOpen: false
  }));

  function submitForm(e: FormEvent) {
    e.preventDefault();
    if (registerStore.email && registerStore.password) {
      const p = firebase.register(registerStore.email, registerStore.password);
      p.catch(e => (registerStore.errorModalOpen = true));
      setPromise(() => p);
    }
  }
  return useObserver(() => (
    <CenteredForm
      title="Sign up"
      icon={<Avatar className={classes.avatar}></Avatar>}
    >
      {loading && <CircularProgress />}
      {error && (
        <ConfirmationDialog
          title="Error"
          open={registerStore.errorModalOpen}
          text={error.message}
          onClose={() => (registerStore.errorModalOpen = false)}
        />
      )}
      {appStore.user && <Redirect to="/" />}
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Email Address"
        name="email"
        type="email"
        autoComplete="email"
        autoFocus
        onChange={e => (registerStore.email = e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        onChange={e => (registerStore.password = e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={submitForm}
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item>
          <UILink component={Link} to="/login" variant="body2">
            {"Already have an account? Sign In"}
          </UILink>
        </Grid>
      </Grid>
    </CenteredForm>
  ));
}

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
