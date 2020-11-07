import BaseHttp from './baseHttp';

class InternalError extends BaseHttp {
  constructor(httpMsg?: string) {
    const msg = 'there is some internal error';
    super(msg, InternalError.CODE, httpMsg || '服务器开小差了', 500);
  }

  static get ['CODE']() {
    return 10001;
  }
}

export default InternalError;
