//#region react imports

import axios, { AxiosInstance, AxiosError, ResponseType } from 'axios';
import { ThunkDispatch } from 'redux-thunk';

//#endregion react imports

//#region application imports

import { ApiRequestModel, ApiResponseModel } from '../models';
import { HttpType } from '../utilities';
import { CoreActionCreator } from '../actions';

//#endregion application imports

class ApiHandler {

    //#region model properties

    private readonly http: AxiosInstance = axios.create();

    //#endregion model properties

    //#region constructor
    //#endregion constructor

    //#region public methods

    /**
     * get api call
     * @param url
     */
    public get(url: string, dispatch: ThunkDispatch<any, any, any>, header?: any) {
        return this.callAndHandleApi(
            {
                url: url,
                httpType: HttpType.Get,
                headers: header
            },
            dispatch);
    }

    /**
     * post api call
     * @param url
     * @param data
     * @param dispatch
     * @param header
     * @param responseType
     */
    public post(url: string, data: any, dispatch: ThunkDispatch<any, any, any>, header?: any, responseType?: ResponseType) {
        return this.callAndHandleApi(
            {
                url: url,
                httpType: HttpType.Post,
                payload: data,
                headers: header,
                responseType: responseType
            },
            dispatch);
    }

    /**
     * put api call
     * @param url 
     * @param data 
     * @param dispatch 
     */
    public put(url: string, data: any, dispatch: ThunkDispatch<any, any, any>, header?: any) {
        return this.callAndHandleApi(
            {
                url: url,
                httpType: HttpType.Put,
                payload: data,
                headers: header
            },
            dispatch);
    }

    /**
     * patch api call
     * @param url
     * @param data
     * @param header
     */
    public patch<T>(url, data: any, dispatch: ThunkDispatch<any, any, any>, header?: any) {
        return this.callAndHandleApi(
            {
                url: url,
                httpType: HttpType.Patch,
                payload: data,
                headers: header
            },
            dispatch);
    }

    /**
     * delete api call
     * @param url
     * @param dispatch
     * @param header
     */
    public delete(url: string, dispatch: ThunkDispatch<any, any, any>, header?: any) {
        return this.callAndHandleApi(
            {
                url: url,
                httpType: HttpType.Delete,
                headers: header
            },
            dispatch);
    }

    /**
     * executes multiple api calls and combines response
     * @param requests
     * @param dispatch
     */
    public multiRequestCall(requests: ApiRequestModel[], dispatch: ThunkDispatch<any, any, any>) {
        let response: ApiResponseModel<any> = new ApiResponseModel<any>();

        dispatch(CoreActionCreator.showLoaderAction(true));
        let axiosRequests = [];
        if (requests && requests.length > 0) {
            requests.forEach(x => {
                axiosRequests.push(this.getAxioResponse(x));
            });
        }
        return axios.all(axiosRequests)
            .then((responses) => {
                response = {
                    ...response,
                    data: responses.map(x => x.data),
                    isSuccess: true
                };
                return response;
            })
            .catch(e => {
                return this.handleApiError(response, e);
            })
            .finally(() => {
                dispatch(CoreActionCreator.showLoaderAction(false));
            });
    }

    //#endregion public methods

    //#region private methods

    /**
     * calls api and handles basic operations 
     * @param request
     * @param dispatch
     */
    private callAndHandleApi(request: ApiRequestModel, dispatch: ThunkDispatch<any, any, any>): Promise<ApiResponseModel<any>> {
        let response: ApiResponseModel<any> = new ApiResponseModel<any>();
        dispatch(CoreActionCreator.showLoaderAction(true));
        return this.getAxioResponse(request)
            .then((res) => {
                response = {
                    ...res,
                    isSuccess: true
                };
                return response;
            })
            .catch((e: AxiosError<any>) => {
                return this.handleApiError(response, e);
            })
            .finally(() => {
                dispatch(CoreActionCreator.showLoaderAction(false));
            });
    }

    /**
     * gets axios response for given request
     * @param request
     */
    private getAxioResponse(request: ApiRequestModel): Promise<ApiResponseModel<any>> {
        switch (request.httpType) {
            case HttpType.Get:
                return this.http.get(request.url, { headers: request.headers });
            case HttpType.Post:
                return this.http.post(request.url, request.payload, { ...request });
            case HttpType.Put:
                return this.http.put(request.url, request.payload, { headers: request.headers });
            case HttpType.Patch:
                return this.http.patch(request.url, request.payload, { headers: request.headers });
            case HttpType.Delete:
                return this.http.delete(request.url, { headers: request.headers });
            default:
                return this.http.get(request.url);
        }
    }

    /**
     * handles API error scenario
     * @param response
     * @param error
     */
    private handleApiError(response: ApiResponseModel<any>, error: any) {
        response.isSuccess = false;
        if (error.response) {
            response.status = error.response.status;
            response.errorMessage = error.response.data;
        }
        else {
            response.status = 500;
            response.errorMessage = error.message;
        }
        switch (response.status) {
            case 400:
                return response;
            default:
                return Promise.reject(response);
        }
    }

    //#endregion Private methods
}

export const apiHandler: ApiHandler = new ApiHandler();