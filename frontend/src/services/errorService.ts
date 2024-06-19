class ErrorService {
    static getErrorMessage(error: any): string {
        if (error.response) {
            return error.response.data.message || 'An error occurred on the server.';
        } else if (error.request) {
            return 'No response received from the server.';
        } else {
            return error.message || 'An unknown error occurred.';
        }
    }
}

export default ErrorService;
