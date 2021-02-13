import ApiError from './ApiError';
import ErrorType from './ErrorType';

class NoEntryError extends ApiError {
  constructor(message = "Entry don't exists") {
    super(ErrorType.NO_ENTRY, message);
  }
}
export default NoEntryError;
