export class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404);
  }
}
