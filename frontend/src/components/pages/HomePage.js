import React, { Component } from 'react';
import Button from '../layout/IconButton';
import HeaderButton from '../layout/HeaderButton';
// import StatisticsDashboardItem from '../layout/StatisticsDashboardItem'
import Article from '../layout/Article'
import ListItem from '../layout/ListItem'
import MainButton from '../layout/MainButton'
import CustomIcon from '../layout/CustomIcon'

import Grid from '@material-ui/core/Grid';
import { Icon } from '@material-ui/core';

import {Link} from 'react-router-dom'

import GroupsGridList from '../layout/AllGroupsGridList'
import ShoppingSettings from '../../../src/shoppingSettings'


const styles = theme => ({
  root: {
    backgroundColor: '#fafafa', 
    borderRadius: 5, 
  }
  })

  /** Homepage of iKaufa
  *
  *  @author [Julius Jacobitz](https://github.com/JuliusJacobitz)
  *  @author [Kevin Eberhardt](https://github.com/kevin-eberhardt)
  *  
  */
export class HomePage extends Component {

  render(){
    return (
      <>       
        <HeaderButton/>
        
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            {/*<MainButton>
              Insert Group Swiper here
            </MainButton>*/}
            <GroupsGridList></GroupsGridList>
          </Grid>

          <Grid item xs={6} >
          <Link to="/statistics">
          <MainButton>
                  <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                > 
                <Grid item xs={12}>
                <Icon fontSize="large">equalizer</Icon>
                    </Grid>
                    STATISTICS
                  </Grid>
          </MainButton>
          </Link>
        </Grid>

        <Grid item xs={6} >
          <Link to="/settings">
          <MainButton>

                  <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                > 
                <Grid item xs={12}>
                    <Icon fontSize="large">settings</Icon>
                    </Grid>
                    SETTINGS
                  </Grid>
          </MainButton>
          </Link>
        </Grid>
         
        </Grid>
        
 {/*    <Button />
        {this.renderStatistics()}
        <Article imgsrc="httpsnbjh://upload.wikimedia.org/wikipedia/de/8/8b/Brights_icon_100x100.gif" itemname="test"/>
        <Article  itemname="Apfel" imgsrc="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT18SPNkehaQjo27-ZH80u919k2MvU7mM7DqmutmEbiViiIZDKA&usqp=CAU"/> 
        
        
        <ListItem itemname='Test'></ListItem>
        
 */}
</>
    )
  }
}