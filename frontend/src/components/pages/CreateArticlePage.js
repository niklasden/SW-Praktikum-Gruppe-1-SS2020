import React, {Component} from 'react';
import { withStyles } from '@material-ui/styles';
import TextInputBar from '../layout/TextInputBar';
import Icon from '@material-ui/core/Icon';
import { Grid, TextField, FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import MainButton from '../layout/MainButton';

const styles = theme => ({
    root: {
      backgroundColor: '#fafafa', 
      borderRadius: 5, 
      padding: "5px",
    },
    formControl: {
        width: "90%",
        borderRadius: 5,
    },
    box: {
        backgroundColor: '#fafafa', 
        borderRadius: 10,
        verticalAlign: 'center'
    }, 
    CreateButton: {
        justifyContent: 'center',
        alignContent: 'center', 
    },
  });

  /**
 * Renders the page to create  a article

 * 
 * @see ArticleEntry
 * 
 * @author [Pia Schmid](https://github.com/PiaSchmid)
 * 
 */
  
class CreateArticlePage extends Component {
      constructor(props){
          super(props);
          this.state = {selectedCategory: null}
      }
    render(){
        const classes = this.props.classes;
        var selectedCategory = this.state.selectedCategory
        const handleChange = (event) => {
            this.setState({selectedCategory: event.target.value});
          };

        return (
            <Grid container 
            direction="column"
            xs={12} 
            style={{padding: "1em"}}>
                <Grid item xs={12}>
                    <TextInputBar icon="playlist_add" placeholder="article name"/>
                </Grid>
                <Grid container 
                    xs={12} 
                    direction="row"
                    className={classes.box}
                    alignContent="center"
                    justify="center"
                    alignItems="center"
                    style={{marginTop: "1em", paddingBottom: "1em", paddingLeft: "1em", border: '1px solid #bdbdbd', borderRadius: 10}}
                    >
                        <Grid item xs={1}>
                            <Icon style={{color: "#00BCD4", marginTop: "1em" }} fontSize="medium" >description</Icon>
                        </Grid>
                        <Grid item xs={11}> 
                            <FormControl
                            className={classes.formControl}
                            style={{ color: "#00BCD4", marginLeft:"20px" }}>
                                <InputLabel >select category</InputLabel>
                                <Select 
                                label="select category"
                                value={this.state.selectedCategory}
                                onChange={handleChange}
                                >
                                    <MenuItem value={1}>fruits</MenuItem>
                                    <MenuItem value={2}>vegetables</MenuItem>
                                    <MenuItem value={3}>meat and fish</MenuItem>
                                    <MenuItem value={4}>drinks</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                </Grid>            
            <Grid container
            item xs="12" 
            justify= "center"
            style={{position: "absolute", bottom: "80px", justify:"center"}}>
                <MainButton className={classes.CreateButton} onclick={() => {} }>create article</MainButton>
            </Grid>  
        </Grid>
      )
    }
  }; 
  
  export default withStyles(styles)(CreateArticlePage);

  