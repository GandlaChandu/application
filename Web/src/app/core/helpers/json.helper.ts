//#region react imports
//#endregion react imports

//#region application imports
//#endregion application imports

export class JsonHelper {

    //#region public methods
    
    /**
     * converts string to number
     * @param value
     */
    public static toCopy(value: any): any {
        return JSON.parse(JSON.stringify(value));
    }

    /**
     * converts to a json string
     * @param value stringifies
     */
    public static toStringify(value: any) {
        return JSON.stringify(value);
    }


    //#endregion public methods

    //#region private methods
    //#endregion Private methods
}