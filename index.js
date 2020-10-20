const joi = require('joi');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const courses = [
    {id:1, name:'jeewan Thapa Magar'},
    {id:2, name:'Anisha sen thapa magar'},
    {id:3, name:'i love you'}
];


app.get('/',(req,res)=>{
   res.send('hello world');
});

app.post('/api/courses',(req,res)=>{
 const scheme ={
     name : joi.string().min(3).required()
 };
 const result =scheme.validate(req.body,scheme);

 if(result.error) 
 {
     res.status(400).send(result.error);
     return;
 }

    const course ={
        id : courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})
app.get('/api/courses/:id',(req,res)=>{
   const course= courses.find(c=>c.id === parseInt(req.params.id));
   if(!course) res.status(404).send('Course of given id is not found');
   res.send(course);
})

















app.listen(PORT,()=>{
    console.log(`Listerning port ${PORT}`);
})