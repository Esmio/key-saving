class BaseHttp extends Error {
  code: number;
  httpMsg: string;
  httpStatusCode: number;
  constructor(msg: string, code: number, httpMsg: string, httpStatusCode: number) {
    super(msg);
    this.code = code || BaseHttp.CODE;
    this.httpMsg = httpMsg;
    this.httpStatusCode = httpStatusCode;
  }

  static get ['CODE']() {
    return -1;
  }
}

export default BaseHttp;