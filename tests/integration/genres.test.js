import supertest from "supertest"
import server from "../../index.js"


describe("/api/genres", () => { 

beforeEach(() => server)

afterEach(() => { server.close()})

describe("/GET", () => {
    it("should return all genres", async() => {
        const res = await supertest(server).get("/api/genres")
        expect(res.status).toBe(200)
    })
})

})
 

