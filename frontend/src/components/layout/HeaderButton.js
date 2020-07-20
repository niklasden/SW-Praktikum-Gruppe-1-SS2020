import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const styles = theme => ({
  root: {
    backgroundColor: '#00BCD4',
    borderRadius: 5,
    margin: 'auto',
    marginTop: 10,
    padding: theme.spacing(3),
    //maxWidth: 400,
    width: 360,
    height: 180,
  },
  iconsItem: {
    //padding: theme.spacing(3),
    margin: 'auto',

  },
  item: {
    padding: theme.spacing(1),
    textAlign: 'center',
    verticalAlign: 'middle',
    margin: 'auto'
  },
  heading: {
    color: '#fff',
    fontSize: '50px', 
    fontWeight: 'lighter',
    lineHeight: 0.8
  },
  subHeading: {
    color: '#fff',
    fontSize: '25px', 
    fontWeight: 'lighter'

  },
  button1: {
    backgroundColor: '#fafafa', 
    color: '#00BCD4',
    //marginLeft: theme.spacing(4),
    marginLeft: 48,
    marginBottom: theme.spacing(1),
    borderRadius: 5,
    height: 45, 
    width: 45, 
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  button2: {
    backgroundColor: '#fafafa', 
    color: '#00BCD4',
    marginLeft: 0,
    borderRadius: 5,
    height: 45, 
    width: 45, 
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
});
/**
 * Displays an header button as designed in figma
 * 
 * @author [Kevin Eberhardt](https://github.com/kevin-eberhardt)
 * 
 */
class HeaderButton extends Component {
    render(){
      const { classes } = this.props;
      return (
        <Grid container className={classes.root} alignItems="center">
            <Grid item xs={4} className={classes.iconsItem} style={{borderRight: '2px solid #ccc'}}>
              <div className={classes.button1}>
                <FormatListBulletedIcon />
              </div>
              <div className={classes.button2}>
                <ShoppingCartIcon />
              </div>
            </Grid>
            <Grid item xs={8} className={classes.item} >
              <Typography variant="h5" className={classes.heading}>iKaufa</Typography>
              <Typography variant="h6" className={classes.subHeading}>plana - kaufa</Typography>
            </Grid>
        </Grid>
      );
    }
}

export default withStyles(styles)(HeaderButton);