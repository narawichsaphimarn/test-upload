import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%"
    // backgroundColor: "wheat"
  },
  panelDragDrop: {
    width: "auto",
    padding: "2%",
    border: "1px dashed red",
    minHeight: "400px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  paneStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    backgroundColor: "#f0f0f0"
  },
  textStyle: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#aaa"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  }
}));
