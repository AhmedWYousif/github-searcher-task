import ApiError from './ApiError';
import ErrorType from './ErrorType';

class BadTokenError extends ApiError {
  constructor(message = 'Token is not valid') {
    super(ErrorType.BAD_TOKEN, message);
  }
}

export default BadTokenError;
