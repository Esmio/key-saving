interface Wechat {
  clientID: string;
  secret: string;
  scope: string;
}

interface Twitter {
  key: string;
  secret: string;
}

interface Facebook {
  key: string;
  secret: string;
}

interface QQ {
  key: string;
  secret: string;
}

const wechat: Wechat = {
  clientID: '',
  secret: '',
  scope: '',
};

const twitter: Twitter = {
  key: '',
  secret: '',
};

const facebook: Facebook = {
  key: '',
  secret: '',
};

const qq: QQ = {
  key: '',
  secret: '',
};

export const getSelectFields = (value: string): string => {
  switch(value) {
    case 'wechat':
      return  Object.keys(wechat).join(' ');
    case 'weixin':
      return  Object.keys(wechat).join(' ');
    case 'twitter': 
      return  Object.keys(twitter).join(' ');
    case 'facebook': 
      return  Object.keys(facebook).join(' ');
    case 'qq': 
      return  Object.keys(qq).join(' ');
    default:
      return '';
  }
};
