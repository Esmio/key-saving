import BaseHttp from './baseHttp';

class InvalidParam extends BaseHttp {
  constructor(paramName: string, requirement: string, httpMsg: string) {
    const msg = `${paramName} does not fit requirement: ${requirement}`;
    super(msg, InvalidParam.CODE, httpMsg || '输入有问题', 400);
  }

  static get ['CODE']() {
    return 40003;
  }
}

export default InvalidParam;
