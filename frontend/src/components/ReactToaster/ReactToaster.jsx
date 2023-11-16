import React, { useState } from "react";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeToaster } from "../../stores/toasterSlice";
function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ReactToaster = ({ message }) => {
  const data = useSelector((state) => state.toaster);
  const dispatch = useDispatch(closeToaster());
  const handleClose = () => {
    dispatch(closeToaster());
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <div>
      <Snackbar
        open={data.open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        message={data.message}
        key={Slide.name}
      >
        <Alert severity={data.error? 'error' : data.success? 'success' : ''} action={action}>
          {data.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ReactToaster;
