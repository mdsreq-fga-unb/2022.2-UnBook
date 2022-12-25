interface IHttpResponse {
  statusCode: number;
  body: any;
}

interface IHttpRequest {
  body?: any;
}

export { IHttpResponse, IHttpRequest };
