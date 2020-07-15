import React from 'react';
import { withStyles, makeStyles } from '@material-ui/styles';
import { Grid, FormControl } from '@material-ui/core';
import { Redirect } from 'react-router';
import Button from '@material-ui/core/Button'
import { withRouter } from "react-router";
import { Config } from '../../config';



  /**
 * Renders the page to create  a favourite article

 * 
 * 
 * @author [Kevin Eberhardt](https://github.com/kevin-eberhardt)
 * 
 */
const styles =  makeStyles((theme) => ({

}));
class CreateArticlePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favouriteArticles: [],
        }
    }
    render() {
        return (
            <div>
                <h1>Hi</h1>
            </div>
        )
    }
}
export default withRouter(withStyles(styles)(CreateArticlePage)); 
