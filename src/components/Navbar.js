import React from 'react';
import { Link, withRouter } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Button,
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';


const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(indigo[700]),
      '&:hover': {
        backgroundColor: indigo[700],
      },
    },
  }))(Button);


const Navbar = ({location}) => {
    return ( 
        <AppBar color="primary">
            <Toolbar>
            <Link className="link" to="/">
                <ColorButton>
                    Dashboard
                </ColorButton>
            </Link>  
            <Link className="link" to="/workouts"> 
                <ColorButton>
                    Workouts
                </ColorButton>
            </Link>     
            <Link className="link" to="/add_modify" onClick={() => location.pathname === '/add_modify' && window.location.reload()}>
                <ColorButton>
                    Add Workout
                </ColorButton>
            </Link>    
            </Toolbar>
        </AppBar>
     );
}
 
export default withRouter(Navbar);