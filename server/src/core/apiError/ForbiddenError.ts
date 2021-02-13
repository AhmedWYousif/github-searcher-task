import ApiError from './ApiError';
import ErrorType from './ErrorType';

class ForbiddenError extends ApiError {
  constructor(message = 'Permission denied') {
    super(ErrorType.FORBIDDEN, message);
  }
}

export default ForbiddenError;
