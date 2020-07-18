import React, { Component,createContext } from 'react'
export const SettingsContext = createContext();


/**
 * Context provider for global settings (currently not in use, alternative to shoppingsettings.js)
 * 
 * @author [Julius Jacobitz](https://github.com/JuliusJacobitz) * 
 * 
 */
class SettingsContextProvider extends Component {
    state = {
        user: this.props.value.user,
        currentGroupID: this.props.value.currentGroupID
    }
    
    setUser = (uc) => { 
        this.setState({user:uc})
    }

    setCurrentGroupID = (id) =>{
        this.setState({currentGroupID:id})
    }


    render(){
        console.log(this.state.user)
        return ( 
            <SettingsContext.Provider value={{...this.state, setUser: this.setUser,setCurrentGroupID: this.setCurrentGroupID}}>
                {this.props.children}
            </SettingsContext.Provider>
        )
    }
} 
export default SettingsContextProvider
