import React, { Component } from 'react';
import HeaderButton from '../layout/HeaderButton';
import MainButton from '../layout/MainButton';
import Grid from '@material-ui/core/Grid';
import { Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';
import GroupsGridList from '../layout/AllGroupsGridList';
import { SettingsContext } from '../../settingsContext'; //only for context

/** 
 *  Homepage of iKaufa
 *  TODO: add good description
 *
 *  @author [Julius Jacobitz](https://github.com/JuliusJacobitz)
 *  @author [Kevin Eberhardt](https://github.com/kevin-eberhardt)
 *  
 */
export class HomePage extends Component {
  static contextType = SettingsContext   //only for context  
  
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
            <Grid item xs={12}>
              <p style={{textAlign:"center"}}> Select Your Group</p>
            </Grid>
            <GroupsGridList currentUserID={this.props.currentUserID} />
          </Grid>

          <Grid item xs={6} >
            <Link to="/report" style={{ textDecoration: 'none' }}>
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
            <Link to="/settings" style={{ textDecoration: 'none' }}>
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
      </>
    )
  }
}