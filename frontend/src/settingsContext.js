import React, { Component } from 'react'

const SettingsContext = React.createContext({name: "default"})

/* export const SettingsProvider = SettingsContext.Provider
export const SettingsConsumer = SettingsContext.Consumer

 */

class SettingsProvider extends Component {
    state = {
        userr: {},
    }

    setUser = (userr) => {
        this.setState((prevState) => ({userr}))
    }

    render(){
        const { children } = this.props
        const { userr } = this.state    //multiple ? 
        const { setUser } = this

        return ( 
            <SettingsContext.Provider
                value={{
                    userr,
                    setUser,
                }}
                >
                    {children}
                </SettingsContext.Provider>
        )

    }


} 
export default SettingsContext

export {SettingsProvider}