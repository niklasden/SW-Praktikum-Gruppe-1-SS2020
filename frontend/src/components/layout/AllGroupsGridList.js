import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';

import InfoIcon from '@material-ui/icons/Info';
import { useRadioGroup } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

import {Link} from 'react-router-dom'

import GroupIcon from '../../icons/Other/users.svg'
import { Config } from '../../config'
import ShoppingSettings from '../../../src/shoppingSettings'

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
            background:
              'linear-gradient(to top, rgba(0,188,212,1) 100%, rgba(0,188,212,0.3) 70%, rgba(0,88,212,0) 100%)',
          },
      });
      
/**
 * Displays all Groups specific for one user in a gridlist
 * 
 * @author [Julius Jacobitz](https://github.com/JuliusJacobitz) * 
 * 
 */

const settingsobj = ShoppingSettings.getSettings()

class GroupsGridList extends Component {
    constructor(props){
        super(props);
        this.state ={
          groupItemss: [],
        };
      }
    
      /**We have to fetch specific groups with user parameter */
      async fetchGroups(){
        //const res = await fetch('http://localhost:8081/api/shoppa/groups')
        const res = await fetch(Config.apiHost + '/Group/Usergroup/'+ this.props.currentUserID)
        const resjson = await res.json()
        console.log(resjson)
        this.setState({groupItemss:resjson})

      }
      componentDidUpdate(){
        if (this.state.groupItemss.length == 0){
        this.fetchGroups()
      }
      }
      
      render(){
        const { classes } = this.props;
        var groupI = this.state.groupItems
        
        return(
            <div className={classes.rootTwo}>
                <GridList className={classes.gridList} cellHeight={180} cols={2.5}>
                

                {this.state.groupItemss.map((tile) => (

                  
                 <GridListTile key={GroupIcon}>
                     <img src={GroupIcon} alt={tile.name} />
                     
                <Link to="" onClick={() => {settingsobj.setGroupID(tile.id);settingsobj.setGroupName(tile.name); alert("Active group set to: " + settingsobj.getGroupName() + "  |  Group ID: "+ settingsobj.getGroupID())}} aria-label={`info about ${tile.title}`} className={classes.icon}>
                 <GridListTileBar 
                     title={ tile.name}
                    classes={{
                      root: classes.titleBar,
                     title: classes.title,
                          }}
                     
                            /> </Link>
                 </GridListTile>
                 
                ))}


                </GridList>
                



            </div>
        )
      }
}

export default withStyles(styles)(GroupsGridList);