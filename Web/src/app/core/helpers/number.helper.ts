//#region react imports
//#endregion react imports

//#region application imports
//#endregion application imports

export class NumberHelper {

    //#region public methods

    /**
     * gets optional number as number if value is defined else default value
     * @param value
     * @param defaultValue
     */
    public static toNumber(value?: number, defaultValue: number = 0): number {
        if (value !== undefined && value !== null) {
            return value;
        }
        return defaultValue;
    }

    /**
     * gets optional number as number if value is valid number else default value
     * @param value
     * @param defaultValue
     */
    public static toStringAsNumber(value?: string, defaultValue: number = 0): number {
        if (value !== undefined && value !== null) {
            return Number(value);
        }
        return defaultValue;
    }

    //#endregion public methods

    //#region private methods
    //#endregion Private methods
}