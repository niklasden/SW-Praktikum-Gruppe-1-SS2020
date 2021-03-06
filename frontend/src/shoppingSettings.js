/**
 * provides global settings:
 * init with: "const settingsobj = ShoppingSettings.getSettings()"
 * 
 * @author [Julius Jacobitz](https://github.com/JuliusJacobitz)   
 * under supervision of: @author [Chris Böhm](https://github.com/christopherboehm1) 
 */
export default class ShoppingSettings{

    currentGroupID = 0
    currentGroupName = ""

    currentUserID = 5
    currentUserFireBaseID = ""

    currentShoppinglist = 0

    onlySettingsGroupID = 0      //only used in settings > show specific group
    onlySettingsGroupName = ""    //only used in settings > show specific group

    static SettingsObject = null

    static getSettings(){
        if(this.SettingsObject==null){
            this.SettingsObject = new ShoppingSettings()
        }
        return this.SettingsObject
    }

    getGroupName(){
        return this.currentGroupName;
    }

    setGroupName(name){
        this.currentGroupName =name;
    }

    getGroupID(){
        return this.currentGroupID;
    }

    setGroupID(id){
        this.currentGroupID=id;
    }

    setCurrentUserID(id) {
        this.currentUserID = id;
    }

    getCurrentUserID() {
        return this.currentUserID;
    }

    setCurrentUserFireBaseID(id) {
        this.currentUserFireBaseID = id;
    }

    getCurrentUserFireBaseID() {
        return this.currentUserFireBaseID;
    }

    setCurrentShoppinglist(id) {
        this.currentShoppinglist = id;
    }

    getCurrentShoppinglist() {
        return this.currentShoppinglist;
    }

    //only used in settings > show specific group
    onlySettingsGetSettingsGroupID(){
        return this.onlySettingsGroupID;
    }

    onlySettingsGetSettingsGroupName(){
        return this.onlySettingsGroupName;
    }
    
    onlySettingsSetSettingsGroupID(id){
        this.onlySettingsGroupID = id;
    }

    onlySettingsSetSettingsGroupName(name){
        this.onlySettingsGroupName = name;
    }



}