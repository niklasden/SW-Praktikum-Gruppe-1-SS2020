import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from './IconButton';
import Typography from '@material-ui/core/Typography';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


const styles = theme => ({
  root: {
    maxWidth: 350,
    backgroundColor: '#00BCD4',
    borderRadius: 5,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  iconsItem: {
    padding: theme.spacing(3),
    margin: 'auto',
  },
  button: {
    width: '100%',
    padding: theme.spacing(3)
  },
  item: {
    padding: theme.spacing(1),
    textAlign: 'center',
    verticalAlign: 'middle',
    margin: 'auto'
  },
  heading: {
    color: '#fff'
  },
  subHeading: {
    color: '#fff',
  },
});
/**
 * Displays an icon button as designed in figma
 * 
 * @author [Kevin Eberhardt](https://github.com/kevin-eberhardt)
 * 
 */
class HeaderButton extends Component {
    render(){
      const { classes } = this.props;
  
      return (
        <Grid container className={classes.root} alignItems="center">
            <Grid item md={4} className={classes.iconsItem} style={{borderRight: '1px solid #ccc'}}>
              <IconButton className={classes.button}>
                <ShoppingCartIcon />
              </IconButton>
              <IconButton className={classes.button}>
                <FormatListBulletedIcon />
              </IconButton>
            </Grid>
            <Grid item md={8} className={classes.item} >
              <Typography variant="h5" className={classes.heading}>iKaufa</Typography>
              <Typography variant="h6" className={classes.subHeading}>plana - kaufa</Typography>
            </Grid>
        </Grid>
      );
    }
}

HeaderButton.propTypes = {
  icon: PropTypes.string,
}

export default withStyles(styles)(HeaderButton);