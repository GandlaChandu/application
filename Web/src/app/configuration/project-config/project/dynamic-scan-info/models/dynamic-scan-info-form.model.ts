//#region react imports
//#endregion react imports

//#region application imports
//#endregion application imports

export class DynamicScanInfoFormModel{
    public id: number;
	public entityId: number;
	public entityTypeId: number;
	public applicationURL: string;
	public userName: string;
	public password: string;
	public scanPolicyId: number;	
	public hasStaticMapping: boolean;
	public isTokenBased: boolean;
}