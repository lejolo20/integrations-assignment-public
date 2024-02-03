"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const https_1 = __importDefault(require("https"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
const headers = {
    tenant: process.env.REVO_TENANT,
    Authorization: `Bearer ${process.env.REVO_TOKEN}`,
    "client-token": process.env.REVO_CLIENT_TOKEN
};
const options = {
    hostname: "integrations.revoxef.works",
    port: 443,
    path: "/api/external/v2/paymentMethods",
    method: "GET",
    headers: headers
};
const req = https_1.default.request(options, (res) => {
    let data = "";
    res.on("data", (chunk) => {
        data += chunk;
    });
    res.on("end", () => {
        console.log(JSON.parse(data));
    });
});
req.on("error", (error) => {
    console.error(error);
});
req.end();
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
//import { FoodlusZoneModel } from "./models/tables";
//const getRevoTables = (): FoodlusZoneModel => {} // TODO: Create getRevoTables function
