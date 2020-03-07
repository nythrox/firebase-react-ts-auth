import Typography from "@material-ui/core/Typography";
import UILink from "@material-ui/core/Link";
import React from "react";
export function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright ©
      <UILink color="inherit" href="#">
        Seilaoque 
      </UILink>
      {" " + new Date().getFullYear()}
    </Typography>
  );
}
