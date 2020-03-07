import CircularProgress from "@material-ui/core/CircularProgress";
import React, { FormEvent } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import UILink from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useFirebase from "../../hooks/useFirebase";
import mobx from "mobx";
import { useLocalStore, useObserver } from "mobx-react";
import { useHistory, Link, Redirect } from "react-router-dom";
import {
  useAsync,
  useAsyncAfterChain,
  useAsyncOptional,
  AsyncHookPromiseCallback
} from "../../hooks/useAsync";
import { useState, useContext } from "react";
import { AppStoreContext } from "../../stores/AppStore";
import {
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Dialog
} from "@material-ui/core";
import { Copyright } from "../../components/Copyright";
import { ConfirmationDialog } from "../../components/ConfirmationDialog";
import { CenteredForm } from "../../components/CenteredForm";
export function LoginPage() {
  const classes = useStyles();
  const appStore = useContext(AppStoreContext);
  const [promise, setPromise] = useState();
  const { loading, error, value } = useAsyncOptional(promise);
  const firebase = useFirebase();
  const loginStore = useLocalStore(() => ({
    email: "",
    password: "",
    errorModalOpen: false
  }));

  function submitForm(e: FormEvent) {
    e.preventDefault();
    if (loginStore.email && loginStore.password) {
      const p = firebase.login(loginStore.email, loginStore.password);
      p.catch(e => (loginStore.errorModalOpen = true));
      setPromise(() => {
        return () => p;
      });
    }
  }

  return useObserver(() => (
    <CenteredForm
      title="Sign In"
      icon={<Avatar className={classes.avatar}></Avatar>}
    >
      {loading && <CircularProgress />}
      {error && (
        <ConfirmationDialog
          title="Error"
          open={loginStore.errorModalOpen}
          text={error.message}
          onClose={() => (loginStore.errorModalOpen = false)}
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
        autoComplete="email"
        autoFocus
        onChange={e => (loginStore.email = e.target.value)}
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
        onChange={e => (loginStore.password = e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={submitForm}
        className={classes.submit}
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <UILink component={Link} to="/recover-account" variant="body2">
            Forgot password?
          </UILink>
        </Grid>
        <Grid item>
          <UILink component={Link} to="/register" variant="body2">
            Don't have an account? Sign Up
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
