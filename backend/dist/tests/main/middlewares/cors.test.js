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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../../src/main/config/app");
describe("Cors Middleware", () => {
    test("Garante que a API possa ser acessada", () => __awaiter(void 0, void 0, void 0, function* () {
        app_1.app.post("/test_cors", (request, response) => {
            response.send();
        });
        yield (0, supertest_1.default)(app_1.app)
            .get("/test_cors")
            .expect("access-control-allow-origin", "*")
            .expect("access-control-allow-methods", "*")
            .expect("access-control-allow-headers", "*");
    }));
});
