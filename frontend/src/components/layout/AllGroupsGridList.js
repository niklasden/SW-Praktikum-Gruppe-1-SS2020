import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Link } from 'react-router-dom';
import MainButton from './MainButton';
import GroupIcon from '../../icons/Other/users.svg';
import { Config } from '../../config';
import ShoppingSettings from '../../../src/shoppingSettings';
import { CircularProgress } from '@material-ui/core'
import { timeout } from '../../timeout'
import ErrorSnackbar from '../../components/layout/ErrorSnackbar';

const styles = theme => ({
  root: {
    backgroundColor: '#fafafa', 
    borderRadius: 5, 
  },
  rootTwo: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    margin:10,
    marginTop:30,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color:"#ffffff"/*theme.palette.primary.light-blue*/
  },
  titleBar: {
    background: 'linear-gradient(to top, rgba(0,188,212,1) 100%, rgba(0,188,212,0.3) 70%, rgba(0,88,212,0) 100%)',
  },
});
   
const settingsobj = ShoppingSettings.getSettings()

/**
 * Displays all Groups specific for one user in a gridlist for the homepage
 * @author [Kevin Eberhardt]
 * @author [Julius Jacobitz](https://github.com/JuliusJacobitz) * 
 * 
 */
class GroupsGridList extends Component {
  constructor(props){
    super(props)
    this.state ={
      groupItemss: [],
      groupsFetched: false,
      isLoadingGroups: false,
      loadingError: '', 
    }
  }
    
  /**We have to fetch specific groups with user parameter */
  async fetchGroups(){
    this.setState({ isLoadingGroups: true })
    // TODO: remove timeout
    await timeout(1000)
    try {
      if(this.props.currentUserID !== 0 || this.props.currentUserID !== null) {
        const res = await fetch(Config.apiHost + '/Group/Usergroup/'+ this.props.currentUserID)
        if(res.ok) {
          const resjson = await res.json()
          this.setState({groupItemss:resjson})
          this.setState({groupsFetched: true})
        } else {
          this.setState({ loadingError: 'Error fetching groups' })
        }
      }
    } 
    catch (e){
      console.log(e)
      this.setState({ loadingError: 'Error while connecting to server' })
    }

    this.setState({ isLoadingGroups: false })
  }
      
  componentDidMount(){
    if (this.state.groupItemss.length === 0 && !this.state.groupsFetched){
      this.fetchGroups()
    }
  }

  render(){
    const { classes } = this.props;
        
    return (   
      <div className={classes.rootTwo}>
        {this.state.groupItemss.length !== 0 ?
          <GridList className={classes.gridList} cellHeight={180} cols={2.5}>
            
            {/* map every group item to one tile */}
            {this.state.groupItemss.map((tile) => (
              <GridListTile key={GroupIcon}>
                <img src={GroupIcon} alt={tile.name} />
                       
                <Link to="/GroupShoppingList" onClick={() => {settingsobj.setGroupID(tile.id);settingsobj.setGroupName(tile.name)}} aria-label={`info about ${tile.title}`} className={classes.icon}>
                  <GridListTileBar 
                    title={ tile.name}
                    classes={{
                      root: classes.titleBar,
                      title: classes.title,
                    }}  
                  />
                </Link>
              </GridListTile> 
            ))}
          </GridList>
        : 
          this.state.isLoadingGroups ?
            <CircularProgress />
          :
            <div>
              There are no groups!
              <Link to="/createGroup">
                <MainButton>Add one</MainButton>
              </Link>
            </div>
        }

        <ErrorSnackbar 
          snackbarOpen={this.state.loadingError !== ''}
          onRequestClose={() => this.setState({ loadingError: '' })}
          errorMessage={this.state.loadingError}
        />
      </div>
    )
  }
}

export default withStyles(styles)(GroupsGridList);