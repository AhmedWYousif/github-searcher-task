import ApiResponse from './ApiResponse';
import ResponseStatus from './ResponseStatus';
import StatusCode from './StatusCode';

class FailureMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.FAILURE, ResponseStatus.SUCCESS, message);
  }
}

export default FailureMsgResponse;
