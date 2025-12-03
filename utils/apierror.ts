/**
 * Base API Error class with status code
 */
export class ApiError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public errors?: Record<string, string[]>
  ) {
    super(message)
    this.name = 'ApiError'
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * Pre-defined error classes for common HTTP errors
 */
export class BadRequestError extends ApiError {
  constructor(message: string = 'Bad Request', errors?: Record<string, string[]>) {
    super(message, 400, errors)
    this.name = 'BadRequestError'
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401)
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = 'Forbidden') {
    super(message, 403)
    this.name = 'ForbiddenError'
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = 'Resource not found') {
    super(message, 404)
    this.name = 'NotFoundError'
  }
}

export class ConflictError extends ApiError {
  constructor(message: string = 'Resource already exists') {
    super(message, 409)
    this.name = 'ConflictError'
  }
}

export class ValidationError extends ApiError {
  constructor(message: string = 'Validation failed', errors?: Record<string, string[]>) {
    super(message, 422, errors)
    this.name = 'ValidationError'
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string = 'Internal server error') {
    super(message, 500)
    this.name = 'InternalServerError'
  }
}

export class RateLimitExceeded extends ApiError {
  constructor(message: string = 'Too many requests, please try again later') {
    super(message, 429)
    this.name = 'RateLimitExceeded'
  }
}
