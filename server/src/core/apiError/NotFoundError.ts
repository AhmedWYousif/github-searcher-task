import ApiError from './ApiError';
import ErrorType from './ErrorType';

class NotFoundError extends ApiError {
  constructor(message = 'Not Found') {
    super(ErrorType.NOT_FOUND, message);
  }
}
export default NotFoundError;
