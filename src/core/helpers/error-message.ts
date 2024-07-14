import { ApiResponse } from "../models/api-response"

export const getErrorMessage = (message:string, errorData?:any) => {
    let response = new ApiResponse(null)
    response.success = false
    response.errorMessage = message

    if(errorData != null) {
        response.data = errorData
    }

    return response;
}