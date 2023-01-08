export class BaseResponse<T> {
    code?: number;
    value?: string;
    data?: T; 
  }
   