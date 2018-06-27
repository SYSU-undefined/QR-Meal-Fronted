import _ from 'lodash';

export default class Cookie {
  /**
   * @param {string} key 键
   * @param {string} value 值
   * @param {number} expires 时间
   */
  constructor(key, value, expires = undefined) {
    this.key = key;
    this.value = value;
    this.expires = expires;
  }

  static fromObject(cookie) {
    return new Cookie(cookie.key, cookie.value, cookie.expires);
  }

  static _catchExpires(attribute) {
    const [expires] = attribute.match(/expires=(.*);?/i) || [];
    if (expires) {
      return (new Date(expires)).getTime();
    }
    const [maxAge] = attribute.match(/max-age=(.*);?/i) || [];
    if (maxAge) {
      const maxAgeInt = parseInt(maxAge, 10);
      return Date.now() + (Number.isNaN(maxAgeInt) ? 0 : 1000 * maxAgeInt);
    }
    return false;
  }

  /**
   * @param {string} cookie
   *
   * @param {Cookie}
   */
  static fromString(cookie) {
    const [cookieKeyValue, ...attributes] = cookie.split(/; */);
    const [key, value] = cookieKeyValue.split('=');
    let expires = null;
    _.forEach(attributes, (attribute) => {
      const ex = Cookie._catchExpires(attribute);
      if (ex !== false) {
        expires = ex;
        return false;
      }
      return true;
    });
    return new Cookie(key, value, expires);
  }

  /**
   * @param {string} cookies
   *
   * @return {Cookie[]}
   */
  static fromHeader(cookies) {
    const cookies_ = cookies.split(/,(?=[^ ])/);
    return cookies_.map(cookie => Cookie.fromString(cookie));
  }

  check() {
    return !this.expires || this.expires > Date.now();
  }

  toString() {
    return `${this.key}=${this.value}`;
  }
}
