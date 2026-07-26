type CustomErrorOptions = {
  cause: string
}

export class DuplicateError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export class NotFoundError extends Error {
  constructor(message: string, options?: CustomErrorOptions) {
    super(message, options)
  }
}
