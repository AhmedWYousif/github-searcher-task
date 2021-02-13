import ApiError from './ApiError';
import ErrorType from './ErrorType';

class InternalError extends ApiError {
  constructor(message = 'Internal error') {
    super(ErrorType.INTERNAL, message);
  }
}
export default InternalError;
