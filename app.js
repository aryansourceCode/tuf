const express=require('express');
const http=require('http');
const path=require('path');
const apath=path.join(__dirname);
//console.log(apath);
const mysql=require('mysql');
const app=express();
app.use(express.static('style'));
//app.use(express.static(path));
app.get('/',(req,res)=>{
    res.sendFile(apath+'/index.html');
});
app.get('/de',(req,res)=>{
    res.sendFile(apath+'/detail.html');
})
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1js21is021@123',
    database:'tuf',
});

db.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("mysql conneected succesfully");
    }
})
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post('/detail',(req,res)=>{
    const{user,lang,stdin,src}=req.body;
    const insq='insert into detail (user,lang,stdin,src) values(?,?,?,?)';
    db.query(insq,[user,lang,stdin,src],(err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
           // res.sendFile(apath+'/detail.html');
        }
    })
})

app.get('/emp',(req,res)=>{
    const q='select user,lang,stdin,src,times from detail';
    db.query(q,(err,results)=>{
        if(err){
            console.log(err);
            res.send("error fetchting data");
        }
        else{
            res.send(results);
        }
    })
})




app.listen(7000);