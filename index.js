const fs = require("fs-extra");
const path = require("path");
const utility = require("@aikosia/utility");

module.exports = class ApiCache{
    constructor(opts) {
        const {group,filename,request,ext} = opts;

        this.group = group;
        this.filename = filename;
        this.request = request;
        this.ext = 'json';

        this._folderName = 'cache';
        this._location = path.join(process.cwd(),this._folderName,this.group,`${this.filename}.${this.ext}`);
    }

    async run(){
        await fs.ensureDir(path.join(process.cwd(),this._folderName,this.group));

        if(await utility.exists(this._location)){
            if(this.ext === 'json'){
                return await fs.readJSON(this._location);
            }
        }

        const response = await this.request();
        if(this.ext === 'json'){
            await fs.writeFile(this._location,JSON.stringify(response));
            return response;
        }
    }
}