declare namespace wx {
  interface DataResponse {
    data: string | ArrayBuffer | object;
    header: {
      'Set-Cookie': string,
    };
    statusCode: number;
  }
  
  var $rpxRatio: number;
  var $pxRatio: number;
  var $reqeust: Req;
  var $method: {
    GET: string;
    POST: string;
    PUT: string;
    DELETE: string;
    PATCH: string;
  };

  function getUserInfoAsync(options: wx.GetUserInfoOptions): Promise<wx.UserInfoResponse>;
  function loginAsync(options: wx.LoginOptions): Promise<wx.LoginResponse>;
  function scanCodeAsync(options: wx.ScanCodeOptions): Promise<wx.ScanCodeData>;
}
