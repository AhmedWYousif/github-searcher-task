import ApiResponse from './ApiResponse';
import ResponseStatus from './ResponseStatus';
import StatusCode from './StatusCode';

class AuthFailureResponse extends ApiResponse {
  constructor(message = 'Authentication Failure') {
    super(StatusCode.FAILURE, ResponseStatus.UNAUTHORIZED, message);
  }
}

export default AuthFailureResponse;
