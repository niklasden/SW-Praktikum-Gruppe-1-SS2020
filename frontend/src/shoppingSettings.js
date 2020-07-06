import shadows from "@material-ui/core/styles/shadows"


/**
 * class for global settings
 * 
 * @author [Julius Jacobitz](https://github.com/JuliusJacobitz) 
 * under supervision of @author [Chris Böhm](https://github.com/christopherboehm1) 
 */
export default class ShoppingSettings{

    currentGroupID= ""
    currentGroupName=""

    onlySettingsGroupID=""      //only used in settings > show specific group
    onlySettingsGroupName=""    //only used in settings > show specific group

    static SettingsObject = null

    static getSettings(){
        if(this.SettingsObject==null){
            this.SettingsObject = new ShoppingSettings()
        }
        return this.SettingsObject
    }

    getGroupName(){
        return this.currentGroupName
    }

    setGroupName(name){
        this.currentGroupName =name
    }

    getGroupID(){
        return this.currentGroupID
    }

    setGroupID(id){
        this.currentGroupID=id
    }


    //only used in settings > show specific group
    onlySettingsGetSettingsGroupID(){
        return this.onlySettingsGroupID
    }

    onlySettingsGetSettingsGroupName(){
        return this.onlySettingsGroupName
    }
    
    onlySettingsSetSettingsGroupID(id){
        this.onlySettingsGroupID = id
    }

    onlySettingsSetSettingsGroupName(name){
        this.onlySettingsGroupName = name
    }



}