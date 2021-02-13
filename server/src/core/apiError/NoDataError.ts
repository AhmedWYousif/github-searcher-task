import ApiError from './ApiError';
import ErrorType from './ErrorType';

class NoDataError extends ApiError {
  constructor(message = 'No data available') {
    super(ErrorType.NO_DATA, message);
  }
}

export default NoDataError;
