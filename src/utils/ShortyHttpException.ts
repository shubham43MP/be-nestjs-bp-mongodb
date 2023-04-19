import { Logger, HttpStatus, HttpException } from '@nestjs/common';
import { isHttpErrorMessage } from './CustomErrorDesc';

type ErrorObject = {
  code: HttpStatus;
  message: string;
  status?: string;
};

class ShortyHttpException extends HttpException {
  public instance: Error;
  private readonly customError: Partial<ErrorObject> = {};

  constructor(error: ErrorObject, instance?: Error) {
    super(error, error.code);

    this.instance = instance;
    this.customError = error;

    /**
     * Guess what happened with http service call
     */
    if (isHttpErrorMessage(instance?.message || error.message, '404')) {
      this.customError.code = HttpStatus.NOT_FOUND;
      this.customError.message = 'NotFound';
    } else if (isHttpErrorMessage(instance?.message || error.message, '409')) {
      this.customError.code = HttpStatus.FORBIDDEN;
      this.customError.message = 'AlreadyExists';
    }

    /**
     * If it is dev env set some details on logged error
     */
    // if (isDev()) {
    // const describe = error?.code ? ErrorDescriber[error.code] : '';

    // will add some headers
    // const metadata = new Metadata();
    // metadata.set('dev-stack', encodeURI(instance?.stack));
    // metadata.set(
    //   'dev-message',
    //   encodeURI(instance?.message || instance?.message || error.message),
    // );
    // metadata.set('dev-describe', encodeURI(describe.replace(/\n/g, ' ')));

    // this.customError.metadata = metadata;
    Logger.error('🛑🛑🛑 ️ Shorty Exception:');
    Logger.error(this);
  }
  //   }

  getError() {
    return this.customError;
  }
}

export default ShortyHttpException;
