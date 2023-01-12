"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const LogControllerDecorator_1 = require("../../../src/main/decorators/LogControllerDecorator");
const http_helper_1 = require("../../../src/presentation/helpers/http/http-helper");
const makeFakeRequest = () => {
    return {
        body: {
            name: "any_name",
            email: "any_email@mail.com",
            password: "any_password",
            passwordConfirmation: "any_password",
        },
    };
};
const makeFakeAccount = () => {
    return {
        id: "valid_id",
        name: "valid_name",
        email: "valid_email@mail.com",
        password: "valid_password",
    };
};
const makeFakeServerError = () => {
    const fakeError = new Error();
    fakeError.stack = "any_stack";
    return (0, http_helper_1.serverError)(fakeError);
};
const makeController = () => {
    class ControllerStub {
        handle(httpRequest) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => resolve((0, http_helper_1.ok)(makeFakeAccount())));
            });
        }
    }
    return new ControllerStub();
};
const makeLogErrorRepository = () => {
    class LogErrorRepositoryStub {
        logError(stack) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => resolve());
            });
        }
    }
    return new LogErrorRepositoryStub();
};
const makeSut = () => {
    const controllerStub = makeController();
    const logErrorRepositoryStub = makeLogErrorRepository();
    const sut = new LogControllerDecorator_1.LogControllerDecorator(controllerStub, logErrorRepositoryStub);
    return {
        sut,
        controllerStub,
        logErrorRepositoryStub,
    };
};
describe("Log Controller Decorator", () => {
    test("Garante que o decorator chama o handle do controller", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, controllerStub } = makeSut();
        const handleSpy = jest.spyOn(controllerStub, "handle");
        const httpRequest = makeFakeRequest();
        yield sut.handle(httpRequest);
        expect(handleSpy).toHaveBeenCalledWith(httpRequest);
        expect(controllerStub.handle).toHaveBeenCalledWith(httpRequest);
    }));
    test("Deve retornar o mesmo resultado do controller", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const httpResponse = yield sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual((0, http_helper_1.ok)(makeFakeAccount()));
    }));
    test("Deve chamar LogErrorRepository com o erro correto se o controller retornar um ServerError", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, controllerStub, logErrorRepositoryStub } = makeSut();
        const handleSpy = jest
            .spyOn(controllerStub, "handle")
            .mockReturnValueOnce(new Promise((resolve) => resolve(makeFakeServerError())));
        const logSpy = jest.spyOn(logErrorRepositoryStub, "logError");
        yield sut.handle(makeFakeRequest());
        expect(logSpy).toBeCalledWith("any_stack");
    }));
});
