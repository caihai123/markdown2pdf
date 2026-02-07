import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import GitHubIcon from "@mui/icons-material/GitHub";
import Button from "@mui/material/Button";

export default function Header(props) {
  const navigate = useNavigate();

  return (
    <AppBar color="secondary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          markdown2pdf
        </Typography>

        <Divider />

        <List>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Button variant="contained" onClick={props.onPrint}>
                打印
              </Button>
            </ListItemButton>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText
                primary={"关于"}
                onClick={() => navigate("/about")}
              />
            </ListItemButton>
            <ListItemButton sx={{ textAlign: "center" }}>
              <GitHubIcon
                onClick={() =>
                  window.open(
                    "https://github.com/caihai123/markdown2pdf",
                    "_blank"
                  )
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Toolbar>
    </AppBar>
  );
}
