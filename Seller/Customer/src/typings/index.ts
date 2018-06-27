declare module wx {
  interface DataResponse {
    data: string | ArrayBuffer | object;
    header: {
      'Set-Cookie': string,
    };
    statusCode: number;
  }

  var $reqeust: Request
}