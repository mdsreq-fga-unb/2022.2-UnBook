enum HttpStatusCode {
	ok = 200,
	noContent = 204,
	badRequest = 400,
	unathorized = 401,
	notFound = 404,
	serverError = 500,
}

type HttpResponse<T> = {
	statusCode: HttpStatusCode;
	body?: T;
};

export { HttpStatusCode, HttpResponse };
