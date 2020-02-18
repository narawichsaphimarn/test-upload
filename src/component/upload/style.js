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
}));
