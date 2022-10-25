//#region react imports
//#endregion react imports

//#region application imports
//#endregion application imports

export class StringHelper {

    //#region public methods

    /**
     * determines if given string are equal
     * @param source
     * @param target
     * @param ignoreCase
     */
    public static areEqual(source: string, target: string, ignoreCase: boolean = true) {
        if (ignoreCase && source && target) {
            return (source.toLowerCase() === target.toLowerCase());
        }
        return source === target;
    }

    /**
     * returns given value as string
     * @param value
     */
    public static toString(value: any): string {
        if (value !== undefined && value !== null) {
            if (typeof value === 'boolean') {
                return `${value}`;
            }
            return value.toString();
        }
        return '';
    }

    /**
     * returns given value as string
     * @param value
     */
    public static trim(value: any): string {
        if (value !== undefined && value !== null) {
            if (typeof value === 'boolean') {
                return `${value}`;
            }
            return value.toString().trim();
        }
        return '';
    }

    //#endregion public methods

    //#region private methods
    //#endregion Private methods
}