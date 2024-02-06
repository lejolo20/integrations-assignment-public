"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRevoTables = exports.options = void 0;
const express_1 = __importDefault(require("express"));
const https_1 = __importDefault(require("https"));
const dotenv_1 = __importDefault(require("dotenv"));
const getTables_1 = __importDefault(require("./routes/getTables"));
const login_1 = __importDefault(require("./routes/login"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
app.get("/", (_req, res) => {
    res.send("Hello World!");
});
app.use("/api/external/v2", getTables_1.default);
app.use("/api/external/v2", login_1.default);
const headers = {
    tenant: process.env.REVO_TENANT,
    Authorization: `Bearer ${process.env.REVO_TOKEN}`,
    "client-token": process.env.REVO_CLIENT_TOKEN
};
exports.options = {
    hostname: process.env.REVO_URL,
    port: 443,
    path: "/api/external/v2/rooms?withTables",
    method: "GET",
    headers: headers
};
const getRevoTables = () => {
    return new Promise((resolve, reject) => {
        const req = https_1.default.request(exports.options, (res) => {
            let data = "";
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on("end", () => {
                const newData = JSON.parse(data);
                const dataTables = newData.data.map((item) => {
                    //console.log(item)
                    return {
                        name: item.name,
                        serviceLocations: item.tables.map((table) => {
                            let result = {
                                name: table.name,
                                code: table.id,
                                zoneId: table.room_id,
                                zoneName: item.name
                            };
                            console.log(result);
                            return result;
                        })
                    };
                });
                resolve(dataTables);
            });
        });
        req.on("error", (error) => {
            console.error(error);
            reject(error);
        });
        req.end();
    });
};
exports.getRevoTables = getRevoTables;
(0, exports.getRevoTables)().then((data) => {
    console.log(data[0]);
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
