import ApiError from './ApiError';
import ErrorType from './ErrorType';

class TokenExpiredError extends ApiError {
  constructor(message = 'Token is expired') {
    super(ErrorType.TOKEN_EXPIRED, message);
  }
}

export default TokenExpiredError;
