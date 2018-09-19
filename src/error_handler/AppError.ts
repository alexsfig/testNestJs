import { ErrorTypeEnum } from './ErrorTypeEnum';
import { IErrorMessage } from './IErrorMessage';
import { HttpStatus } from '@nestjs/common';

export class AppError extends Error {

  public errorCode: ErrorTypeEnum;
  public httpStatus: number;
  public errorMessage: string;
  public customMessage: string;
  public modelName: string;

  constructor(errorCode: ErrorTypeEnum, modelName: string) {
    super();
    const errorMessageConfig: IErrorMessage = this.getError(errorCode, modelName);
    if (!errorMessageConfig) throw new Error('Unable to find message code error.');

    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.httpStatus = errorMessageConfig.httpStatus;
    this.errorCode = errorCode;
    this.errorMessage = errorMessageConfig.errorMessage;
    this.customMessage = errorMessageConfig.customMessage;
  }

  private getError(errorCode: ErrorTypeEnum, modelName: string): IErrorMessage {

    let res: IErrorMessage;

    switch (errorCode) {
      case ErrorTypeEnum.NOT_FOUND:
        res = {
          type: ErrorTypeEnum.NOT_FOUND,
          httpStatus: HttpStatus.NOT_FOUND,
          errorMessage: modelName + ' not found',
          customMessage: 'Unable to find the ' + modelName + ' with the provided information.'
        };
        break;
      case ErrorTypeEnum.EXISTS:
        res = {
          type: ErrorTypeEnum.EXISTS,
          httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
          errorMessage: modelName + 'exists',
          customMessage: 'Username exists'
        };
        break;
      case ErrorTypeEnum.NOT_IN_SESSION:
        res = {
          type: ErrorTypeEnum.NOT_IN_SESSION,
          httpStatus: HttpStatus.UNAUTHORIZED,
          errorMessage: 'No Session',
          customMessage: 'Session Expired'
        };
        break;
      case ErrorTypeEnum.NOT_IN_DB:
        res = {
          type: ErrorTypeEnum.NOT_IN_DB,
          httpStatus: HttpStatus.NOT_FOUND,
          errorMessage: modelName + ' does not exits in the database',
          customMessage: modelName + ' does not exists, Create some.'
        };
        break;
      case ErrorTypeEnum.INVALID_USER_OR_PASSWORD:
        res = {
          type: ErrorTypeEnum.INVALID_USER_OR_PASSWORD,
          httpStatus: HttpStatus.FORBIDDEN,
          errorMessage: 'Username or password wrong!',
          customMessage: 'Username or password wrong!'
        };
        break;
    }
    return res;
  }

}
