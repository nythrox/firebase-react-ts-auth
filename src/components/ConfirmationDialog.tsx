import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button
} from "@material-ui/core";
import React from "react";

export interface ConfirmationDialogProps {
  text: string | JSX.Element;
  title: string | JSX.Element;
  onClose: Function;
  open: boolean;
}

export function ConfirmationDialog(props: ConfirmationDialogProps) {
  return (
    <Dialog
      open={props.open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={e => {
            props.onClose();
          }}
          color="primary"
          autoFocus
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
