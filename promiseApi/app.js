'use strict';
const PORT = '3000';
let express = require('express'),
    app = express();

class promiseApi {
    constructor () {
        this.baseUrl = "/api";
        this.user = '/user';
    };
    getApi(boolean){
        return new Promise(
            (resolve,reject) => {
                app.get(this.baseUrl+this.user,function(req,res){
                    res.end('xq');
                })
            }
        )
    }
}

let api = new promiseApi;
api.getApi(0).then(function(data){
    console.log(data);
},function(err){
    console.log(err)
});

app.listen(PORT,function(err){
    if (err) throw err;
    console.log('my port is %s',PORT);
})