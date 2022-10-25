//#region react imports
//#endregion react imports

//#region application imports
//#endregion application imports

export class BoolHelper {

    //#region public methods

    /**
     * gets optional bool as boolean if value is defined else default value
     * @param value
     * @param defaultValue
     */
    public static toBool(value?: boolean, defaultValue: boolean = false): boolean {
        if (value !== undefined && value !== null) {
            return value;
        }
        return defaultValue;
    }

    //#endregion public methods

    //#region private methods
    //#endregion Private methods
}