//#region react imports
//#endregion react imports

//#region application imports
//#endregion application imports

export class StorageHelper {

    //#region public methods

    /**
     * sets value in local storage
     * @param key
     * @param value
     */
    public static setLocal(key: string, value: string) {
        return localStorage.setItem(key, value)
    }

    /**
     * gets value from local storage
     * @param key
     */
    public static getLocal(key: string) {
        return localStorage.getItem(key)
    }

    /**
     * remove key, value from local storage
     * @param key
     */
    public static removeLocal(key: string) {
        return localStorage.removeItem(key)
    }

    /**
     * sets value in session storage
     * @param key
     * @param value
     */
    public static setSession(key: string, value: string) {
        return sessionStorage.setItem(key, value)
    }

    /**
     * gets value from session storage
     * @param key
     */
    public static getSession(key: string) {
        return sessionStorage.getItem(key)
    }

    /**
     * remove key, value from local storage
     * @param key
     */
    public static removeSession(key: string) {
        return sessionStorage.removeItem(key)
    }

    //#endregion public methods

    //#region private methods
    //#endregion Private methods
}