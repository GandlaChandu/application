export class RegexTypeConstant {
    public static readonly alphabetOnly: RegExp = /^[a-zA-Z]+$/;
    public static readonly alphabetSpaceOnly: RegExp = /^[a-zA-Z ]*$/;
    public static readonly numberOnly: RegExp = /^[0-9]+$/;
    public static readonly urlOnly: RegExp = /^((www.[a-zA-z0-9 -/]+.[a-zA-Z]$)|((ftp|http|https):\/\/)[a-zA-Z0-9 -/?&=:]+$)/;
    public static readonly gitUrl: RegExp = /^((www.[a-zA-z0-9 -/]+.[a-zA-Z]$)|((ftp|http|https):\/\/)[a-zA-Z0-9 -/?&=:@_]+$)/;
    public static readonly directoryPath: RegExp = /^([\/]{1}[a-z0-9.]+)+(\/?){1}$|^([\/]{1})$/;

}