enum HttpStatusCode {
	noContent = 204,
	unathorized = 401,
}

type HttpResponse = {
	statusCode: HttpStatusCode;
	body?: any;
};

export { HttpStatusCode, HttpResponse };
