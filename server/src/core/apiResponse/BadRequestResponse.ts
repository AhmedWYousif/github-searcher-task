import ApiResponse from './ApiResponse';
import ResponseStatus from './ResponseStatus';
import StatusCode from './StatusCode';

class BadRequestResponse extends ApiResponse {
  constructor(message = 'Bad Parameters') {
    super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message);
  }
}

export default BadRequestResponse;
