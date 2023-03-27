const express = require('express');
const cors = require('cors');

const app = express();
const Port =process.env.Port || 5000;
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('<h1>welocme</h1>');
});
app.post('/searching',(req,res)=>{
    console.log(req.body);
    res.json({data:req.body});
})
app.listen(Port,(err)=>{
    if(err){
        console.log(`error in listen on ${Port}`);
    }
    console.log(`${Port} has succesfully started`);

})



