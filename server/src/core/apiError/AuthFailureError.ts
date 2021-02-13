import ApiError from './ApiError';
import ErrorType from './ErrorType';

class AuthFailureError extends ApiError {
  constructor(message = 'Invalid Credentials') {
    super(ErrorType.UNAUTHORIZED, message);
  }
}

export default AuthFailureError;
