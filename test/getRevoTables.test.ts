import { getRevoTables } from "../src/index"
import nock from "nock"

describe("getRevoTables", () => {
    beforeEach(() => {
        nock.cleanAll()
    })

    it("should return the expected data when the request is successful", async () => {
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
        }

        nock("https://integrations.revoxef.works")
            .get("/api/external/v2/rooms?withTables")
            .reply(200, mockData)

        const result = await getRevoTables()
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
        ])
    })

    it("should throw an error when the request fails", async () => {
        nock("https://" + process.env.REVO_URL)
            .get("/api/external/v2/rooms?withTables") // replace with your actual API URL and endpoint
            .replyWithError("Something went wrong")

        await expect(getRevoTables()).rejects.toThrow("Something went wrong")
    })
})
