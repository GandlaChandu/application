//#region react imports
//#endregion react imports

//#region application imports

import { HttpType } from '../utilities';
import { ResponseType } from 'axios';

//#endregion application imports

export interface ApiRequestModel {
    url: string;
    payload?: any;
    httpType?: HttpType;
    headers?: any;
    responseType?: ResponseType;
}