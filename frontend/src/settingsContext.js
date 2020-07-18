import React, { Component,createContext } from 'react'


export const SettingsContext = createContext();

/* export const SettingsProvider = SettingsContext.Provider
export const SettingsConsumer = SettingsContext.Consumer

 */

class SettingsContextProvider extends Component {
    state = {
        user: this.props.value.user
    }
    
    setUser = (uc) => { 
        /* this.setState({user:{name:"changed"}}) */
        this.setState({user:uc})
    }

    
    

    

    render(){
        console.log(this.state.user)
        return ( 
            <SettingsContext.Provider value={{...this.state, setUser: this.setUser}}>
                {this.props.children}
            </SettingsContext.Provider>
            

        )

    }


} 
export default SettingsContextProvider
