const ApiCache = require("./");
const axios = require("axios");
const { test, expect } = require("@jest/globals");
const utility = require("@aikosia/utility");

test("test",async()=>{
    const request = new ApiCache({
        group:'sicepat',
        filename:'all',
        request:async()=>{
            return (await axios.get('https://reqres.in/api/users?page=2')).data;
        }
    });
    
    await request.run();

    expect(await utility.exists(request._location)).toBeTruthy();
});