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
import { Config } from '../../config';


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

        id: 0, 
        name: '', 
        category: '',
        categorys: [
            {id: 1, name: "Vegetables"},
            {id: 2, name: "Meat"},
            {id: 3, name: "Fruit"},
            {id: 4, name: "Beverages"},
            {id: 5, name: "Other"},
            {id: 6, name: "Snacks"},
        ], 
    }

    async onClickSave(){
        this.setState({ isSaving: true })
        setTimeout(async () => {
            let id = this.state.item
            if (id == ""){
                id = 0
            }

            const article ={
                id: id, 
                name: this.state.name, 
                category: this.state.category,
            }

            const requestBody = JSON.stringify(article)

            const rInit = {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: requestBody
            }
            const resp = await fetch(Config.apiHost + '/Article', rInit)
            
            if(resp.ok){
                this.props.history.push('/products')
            } else {
                this.showErrorSnackBar()
            }

            this.setState({ isSaving: false})
        }, 1000)
    }

    onClickDelete(){
        this.setState({ isSaving: true })
        setTimeout(async () => {
            const article = {
                id: parseInt(this.state.item), 
                name: this.state.name, 
                category: this.state.category
            }

            const rInit = {
                method: 'DELETE', 
                headers: {
                    'Content-Type': 'aplication/jason'
                }, 
                body: JSON.stringify(article)
            }
            const resp = await fetch(Config.apiHost +'/Article/' + article.id, rInit)
            if(resp.ok){
                this.props.history.push('/products')
            } else {
                this.showErrorSnackBar()
            }
            this.setState({ isSaving: false })
            }, 1000) 
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
        let id = ''
        /* checks if there has been a article from the article page*/
        /* if yes, it takes name and category from there*/
        if (this.props.location.state != undefined){
            id = this.props.location.state.id
            name = this.props.location.state.name
            this.state.categorys.forEach((el, i) => {
                console.log(el)
                if (el.name === this.props.location.state.category){
                    category = el.id 
                }
            })
             console.log(name, category, id)
        } 
        this.setState({
            item: id,
            name: name, 
            category: category
        })
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
                                onChange={(e) => this.setState({category: e.target.value})}
                                value={this.state.category}>
                                    
                                   {
                                   this.state.categorys.map((element) =>{
                                       return <MenuItem value={element.id}>{element.name}</MenuItem>
                                   })
                                   }

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
                            onclick={this.onClickSave.bind(this)}>save
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