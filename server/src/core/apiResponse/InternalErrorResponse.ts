import ApiResponse from './ApiResponse';
import ResponseStatus from './ResponseStatus';
import StatusCode from './StatusCode';

class InternalErrorResponse extends ApiResponse {
  constructor(message = 'Internal Error') {
    super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
  }
}

export default InternalErrorResponse;
