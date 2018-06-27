import Cookie from './cookie';

export const COOKIE_STORAGE_KEY = 'qr-meal-cookies';
class CookieManager {
  constructor() {
    this._cookies = CookieManager._initFromStorage();
  }

  /**
   * @return {Object.<string, Cookie>}
   */
  static _initFromStorage() {
    const cookies = {};

    /** @type {Object.<string, Cookie>} */
    const cookiesFromStorage = wx.getStorageSync(COOKIE_STORAGE_KEY) || {};
    Object.values(cookiesFromStorage).forEach((cookie) => {
      cookies[cookie.key] = Cookie.fromObject(cookie);
    });
    return cookies;
  }

  pruneCookies() {
    const validCookies = Object.values(this._cookies).filter(cookie => cookie.expires > Date.now());
    this._cookies = {};
    validCookies.forEach((cookie) => {
      this._cookies[cookie.key] = cookie;
    });
  }

  sync() {
    // try sync
    wx.setStorage({
      key: COOKIE_STORAGE_KEY,
      value: this._cookies,
    });
  }

  addCookies(header) {
    const cookies = Cookie.fromHeader(header);
    cookies.forEach((cookie) => {
      this._cookies[cookie.key] = cookie;
    });
    if (cookies.length > 0) {
      this.sync();
    }
  }

  get cookie() {
    this.pruneCookies();
    return Object.values(this._cookies).map(cookie => cookie.toString()).join('; ');
  }
}

const COOKIE_HEADER = 'Set-Cookie';

export const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};

export class Request {
  constructor() {
    this._cookieManager = new CookieManager();
  }

  /**
   * @param {string} url
   * @param {string} method
   * @param {object} data
   * @param {object} header
   * @param {string} dataType
   *
   * @return {Promise<wx.DataResponse>}
   */
  async _request(url, method, data, header = {}, dataType = 'json') {
    const cookieManager = this._cookieManager;
    const { cookie } = cookieManager.cookie;
    Object.assign(header, { cookie });
    return Promise((resolve, reject) => {
      /**
       * @type {wx.RequestOptions}
       */
      const wxRequestParam = {
        url,
        method,
        data,
        dataType,
        header,
        fail: reject,
      };
      /**
       * @param {wx.DataResponse} res
       */
      wxRequestParam.success = function hijackResponse(res) {
        const cookies = res.header && res.header[COOKIE_HEADER];
        if (cookies) {
          cookieManager.addCookies(cookies);
        }
        resolve(res);
      };
      wx.request(wxRequestParam);
    });
  }

  /**
   * @param {string} url
   * @param {object} query
   *
   * @returns {Promise<wx.DataResponse>}
   */
  async get(url, query) {
    const response = await this._request(url, Method.GET, query);
    if (response.statusCode === 401) {
      // handel login
    }
    return response;
  }

  static injectRequest() {
    if (wx.$reqeust) return;
    wx.$reqeust = new Request();
    wx.$method = Method;
  }
}

