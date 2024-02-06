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
const index_1 = require("../src/index");
const nock_1 = __importDefault(require("nock"));
describe("getRevoTables", () => {
    beforeEach(() => {
        nock_1.default.cleanAll();
    });
    it("should return the expected data when the request is successful", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockData = {
            data: [
                {
                    name: "Test Zone",
                    tables: [
                        {
                            name: "Table 1",
                            code: 12,
                            zoneId: "456",
                            zoneName: "Table 1"
                        }
                    ]
                }
            ]
        };
        (0, nock_1.default)("https://integrations.revoxef.works")
            .get("/api/external/v2/rooms?withTables")
            .reply(200, mockData);
        const result = yield (0, index_1.getRevoTables)();
        expect(result).toEqual([
            {
                name: "Test Zone",
                serviceLocations: [
                    {
                        name: "Table 1",
                        code: 123,
                        zoneId: "456",
                        zoneName: "Test Zone"
                    }
                ]
            }
        ]);
    }));
    it("should throw an error when the request fails", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, nock_1.default)("https://" + process.env.REVO_URL)
            .get("/api/external/v2/rooms?withTables") // replace with your actual API URL and endpoint
            .replyWithError("Something went wrong");
        yield expect((0, index_1.getRevoTables)()).rejects.toThrow("Something went wrong");
    }));
});
