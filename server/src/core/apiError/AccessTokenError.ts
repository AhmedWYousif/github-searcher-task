import ApiError from './ApiError';
import ErrorType from './ErrorType';

class AccessTokenError extends ApiError {
  constructor(message = 'Invalid access token') {
    super(ErrorType.ACCESS_TOKEN, message);
  }
}

export default AccessTokenError;
