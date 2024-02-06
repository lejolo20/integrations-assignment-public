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
exports.loginController = void 0;
const https_1 = __importDefault(require("https"));
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const data = JSON.stringify({
        username,
        password
    });
    const options = {
        hostname: "dummyjson.com",
        path: "/auth/login",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    };
    const request = https_1.default.request(options, (response) => {
        let data = "";
        response.on("data", (chunk) => {
            data += chunk;
        });
        response.on("end", () => {
            const token = JSON.parse(data).token;
            if (token) {
                res.status(200).json({ token });
            }
            else {
                res.status(401).json({ message: "Authentication failed" });
            }
        });
    });
    request.on("error", (error) => {
        console.error(`Problem with request: ${error.message}`);
        res.status(500).json({ message: "An error occurred" });
    });
    request.write(data);
    request.end();
});
exports.loginController = loginController;
