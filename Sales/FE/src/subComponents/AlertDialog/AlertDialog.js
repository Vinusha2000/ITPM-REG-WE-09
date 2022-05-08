import React, { useEffect } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Divider,
    Slide,
} from '@mui/material';
// import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles((theme) => ({
//     title: {
//         fontFamily: "Open sans-serif",
//         fontSize: "1.2em",
//         fontWeight: "bold",
//         color: "black",
//         textAlign: "center"
//     },
//     primaryButton: {
//         fontFamily: "Open sans-serif",
//         fontSize: "1.2em",
//         fontWeight: "bold",
//         color: "#2598ed",
//     },
//     secondaryButton: {
//         fontFamily: "Open sans-serif",
//         fontSize: "1.2em",
//         fontWeight: "normal",
//         color: "#2598ed",
//     },
//     centerView: {
//         alignSelf: "center",
//         textAlign: 'center'
//     },
//     dialogPaper: {
//         borderRadius: 16,
//     },
// }));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function AlertDialog(props) {
    const [open, setOpen] = React.useState(false)

    useEffect(() => {
    }, []);

    const handleClose = () => {
        // props.hideAlertDialog();
    };

    const primaryButtonAction = () => {
        // onPrimaryPressed();
    };

    const secondaryButtonAction = () => {
        // onSecondaryPressed();
    };

    const onHandleAction = () => {
        // onhandleClose();
    };

    return (
        <div>
            <Dialog
                open={true}
                TransitionComponent={Transition}
                keepMounted
                // classes={{ paper: classes.dialogPaper }}
                onClose={props.onhandleClose ? onHandleAction : handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                {/* <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle> */}
                <DialogContent style={{ alignSelf: "center" }}>
                    <DialogContentText >
                        {"Delete Sale"}
                    </DialogContentText>
                </DialogContent>
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-slide-description"

                    >
                        {"Are you sure about deleting selected sale"}
                    </DialogContentText>
                </DialogContent>
                <Divider />
                <DialogActions

                    onClick={() => primaryButtonAction()}
                >
                    <DialogContentText >
                        {"Delete"}
                    </DialogContentText>
                </DialogActions>
                <Divider />
                <DialogActions

                    onClick={() => secondaryButtonAction()}
                >
                    <DialogContentText >
                        {"Cancel"}
                    </DialogContentText>
                </DialogActions>
            </Dialog>
        </div>
    );
}

AlertDialog.defaultProps = {
    onPrimaryPressed: () => { },
    onSecondaryPressed: () => { },
    onhandleClose: () => { },
};


export default (AlertDialog);
