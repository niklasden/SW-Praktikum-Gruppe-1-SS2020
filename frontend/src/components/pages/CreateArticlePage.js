import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import TextInputBar from '../layout/TextInputBar';
import Icon from '@material-ui/core/Icon';
import { Grid, FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import MainButton from '../layout/MainButton';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar';
import { Redirect } from 'react-router';
import Button from '@material-ui/core/Button'
import { withRouter } from "react-router";


const styles = theme => ({
    root: {
      backgroundColor: '#fafafa', 
      borderRadius: 5, 
      padding: "5px",
    },
    formControl: {
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
    
    state = {
        snackbarOpen: false, 
        isSaving: false,
        redirectToArticlePage: false,
        categorys: [
            {id: 0, name: "fruits"}, 
            {id: 1, name: "vegetables"}, 
            {id: 2, name: "meat"}, 
            {id: 3, name: "drinks"}, 
        ],
        category: "" 
    }

    onClickSave(){
        this.setState({ isSaving: true })
        
        setTimeout(() => {
            this.setState ({ isSaving: false })
            this.showErrorSnackBar()
        }, 1000)
    }

    onClickDelete(){
        this.setState({ redirectToArticlePage: true }); 
        console.log(this.props.location)
    }

    showErrorSnackBar(){
        this.setState({ snackbarOpen: true })
        setTimeout(() => {
            this.setState({ snackbarOpen: false })
        }, 2000)
    }

    componentDidMount(){
        let name = ''
        let category = ''
        // checks if there has been a redirect from the article page from to this page with a selected article
        // if yes, it takes name and category from there
        if (this.props.location.state != undefined){
            name = this.props.location.state.name
            category = this.props.location.state.category
        }
        console.log(category)
        this.setState({
            name: name, 
            category: category
        })
    }

    handleChangeCategory = e => {
        this.setState({selectedCategory : e.target.value})
    }
   

    render(){        

        if (this.state.redirectToArticlePage) {
            return <Redirect push to= "/products"/>
        } 

        return (

            <Grid container 
            direction="column"
            xs={12} 
            style={{padding: "1em"}}>

                <Grid item xs={12}>
                    <h2>create a new article</h2>
                </Grid>

                <Grid item xs={12}>
                    <TextInputBar 
                    icon="playlist_add" 
                    placeholder="article name"
                    onChange={(e) => this.setState({name: e.target.value})}
                    value={this.state.name}/>
                </Grid>

                <Grid container 
                    xs={12} 
                    direction="row"
                    className={styles.box}
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
                            className={styles.formControl}
                            style={{ color: "#00BCD4", marginLeft:"20px", width:"85%" }}>

                                <InputLabel >select category</InputLabel>

                                <Select 
                                //onChange={this.handleChangeCategory}
                                onChange={(e) => this.setState({category: e.target.value})}
                                value={this.state.category}>
            
                                
                                    
                                   {
                                   this.state.categorys.map((element) =>{
                                       return <MenuItem value={element.name}>{element.name}</MenuItem>
                                   })
                                   }


                                    {/** 

                                
                                label="select category"
                                value={this.state.category}
                                onChange={(e) => this.setState({category: e.target.value})}
                                >
*/}
                                </Select>

                            </FormControl>
                        </Grid>
                </Grid>            


                <Grid
                    container
                    xs ={11}
                    direction="row"
                    justify="center"
                    alignItems="flex-end"
                    style={{position: "absolute", bottom: "80px"}}
                    >

                    <Grid item>
                        <div style={{display: 'flex', flexDirection: 'row'}}>

                            <MainButton 
                            className={styles.CreateButton}
                            onclick={this.onClickSave.bind(this)}>create
                            </MainButton>

                            <div style={{marginLeft: 12}}>
                                <MainButton 
                                className={styles.CreateButton} 
                                onclick={this.onClickDelete.bind(this)}>delete
                                </MainButton>
                            </div>
                        </div>   
    
                        {this.state.isSaving &&
                            <div style={{display: 'flex', justifyContent: 'center', marginTop: 12}}>
                            <CircularProgress size={20} />
                            </div>
                    }

                    </Grid>
                    <Snackbar
                    open={this.state.snackbarOpen}
                    onClose={() => this.setState({snackbarOpen: false})}
                    // TransitionComponent={transition}
                    message="Keine Netzwerkverbindung"
                    // key={transition ? transition.name : ''}
                    action={
                        <Button 
                        color="inherit" 
                        size="small"
                        onClick={() => this.setState({ snackbarOpen: false })}
                        >
                        Undo
                        </Button>
                    }
                    />
                </Grid>
  
            </Grid>
        )
    }
}; 
  
export default withRouter(withStyles(styles)(CreateArticlePage)); 