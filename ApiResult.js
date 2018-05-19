import ApiError from './ApiError';

export default class ApiResult {
    constructor(data = undefined, err = undefined) {
        this.data = data;
        this.err = err;
    }

    static fromResponse(response, onSuccess, onError) {
        const d = response.data;
        if (d.data) {
            if (onSuccess) {
                onSuccess(d.data);
            }
            return new ApiResult(d.data);
        }
        if (d.err) {
            const ae = new ApiError(d.err.message)
            if (onError) {
                onError(ae);
            }
            return new ApiResult(undefined, ae);
        }
        if (d.badRequest) {
            const message = d.badRequest.errors[0].msg;
            const ae = new ApiError(message);
            if (onError) {
                onError(ae);
            }
            return new ApiResult(undefined, ae);
        }
    }
}