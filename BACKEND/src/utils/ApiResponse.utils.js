class ApiResponse {
    constructor(statusCode, data, message = "success") {
        this.statusCode = statusCode,
        this.data = data,
        this.message = message,
        this.statusCode = statusCode < 400
    }
}

export default ApiResponse