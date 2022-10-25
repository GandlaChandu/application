//#region react imports

import { AxiosResponse, AxiosRequestConfig } from 'axios';

//#endregion react imports

//#region application imports
//#endregion application imports

export class ApiResponseModel<T> implements AxiosResponse<T> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosRequestConfig;
    request?: any;

    isSuccess: boolean;
    errorMessage: string;

    constructor() {
        this.isSuccess = true;
    }
}