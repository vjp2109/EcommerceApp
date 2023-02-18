import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";
import { Shop, ShoppingCart } from "@material-ui/icons";

import logo from "../../images/palette.jpeg";
import useStyles from "./styles";

const Navbar = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar className={classes.appBar} position="fixed" color="inherit">
        <Toolbar>
          <Typography className={classes.title} variant="h6" color="inherit">
            <img
              src={logo}
              alt="Made with blood"
              className={classes.image}
              height="25px"
            />
            L'Arte
          </Typography>
          <div className={classes.grow} />
          <div className={classes.button}>
            <IconButton aria-label="Show cart itens" color="inherit">
              <Badge badgeContent={2} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Navbar;
