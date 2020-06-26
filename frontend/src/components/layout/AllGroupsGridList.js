import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';

import InfoIcon from '@material-ui/icons/Info';
import { useRadioGroup } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';



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
            marginTop:20
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
              'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
          },
      });
      
/**
 * Displays all Groups specific for one user in a gridlist
 * 
 * @author [Julius Jacobitz](https://github.com/JuliusJacobitz) * 
 * 
 */
class GroupsGridList extends Component {
    constructor(props){
        super(props);
        this.state ={
          groupItemss: [],
        };
      }
    
      async fetchGroups(){
        const res = await fetch('http://localhost:8081/api/shoppa/groups')
        const resjson = await res.json()
        console.log(resjson)
        this.setState({groupItemss:resjson})

      }
      componentDidMount(){
        this.fetchGroups()
      }

      render(){
        const { classes } = this.props;
        var groupI = this.state.groupItems
        
        return(
            <div className={classes.rootTwo}>
                <GridList className={classes.gridList} cellHeight={110} cols={2.5}>
                

                {this.state.groupItemss.map((tile) => (
                 <GridListTile key={tile.img}>
                     <img src={"https://img.pngio.com/group-icon-png-download-16001600-free-transparent-icon-design-group-icon-png-900_900.jpg"} alt={tile.name} />
                 <GridListTileBar
                     title={tile.name}
                    classes={{
                      root: classes.titleBar,
                     title: classes.title,
                          }}
                     actionIcon={
                     <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                         <InfoIcon />
                        </IconButton>
                            }
                            />
                 </GridListTile>
                ))}


                </GridList>
                



            </div>
        )
      }
}

export default withStyles(styles)(GroupsGridList);