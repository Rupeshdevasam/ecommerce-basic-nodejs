
export class ExceptionHandler {
    public static handleException(message: string, code: number = 422) {
        const error: BaseException = { code: code, message: message };
        return error;
    }
}