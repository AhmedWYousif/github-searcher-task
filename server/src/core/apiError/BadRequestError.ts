import ApiError from './ApiError';
import ErrorType from './ErrorType';

class BadRequestError extends ApiError {
  constructor(message = 'Bad Request') {
    super(ErrorType.BAD_REQUEST, message);
  }
}

export default BadRequestError;
