import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    backgroundColor: "wheat"
  },
  panelDragDrop: {
    width: "95.9%",
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
  }
}));
