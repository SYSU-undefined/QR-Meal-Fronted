declare namespace wx {
  interface DataResponse {
    data: string | ArrayBuffer | object;
    header: {
      'Set-Cookie': string,
    };
    statusCode: number;
  }
  
  var $reqeust: Req;
  var $method: {
    GET: string;
    POST: string;
    PUT: string;
    DELETE: string;
    PATCH: string;
  };
}
