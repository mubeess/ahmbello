const express=require('express')
const bodyParser=require('body-parser')
const mysql=require('mysql')
const cors=require('cors')
//

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ahmbello'

})


db.connect((err)=>{
    if (err) {
       console.log(err) 
    }
    console.log('Server Started')
})
//


const app=express()

app.use(bodyParser.json())
app.use(cors())
// app.use(cores())
//

app.post('/login',(req,res)=>{
const email=req.body.email
const password=req.body.password
let found=false;
let sql=`SELECT * FROM admin WHERE email='${email}' AND password='${password}'`;
db.query(sql,(err,result)=>{
    if (err) throw err
    result.map((data)=>{
     if (data.email && data.password) {
        res.json(data)
        found=true
     }
     
 })
 if (!found) {
    res.status(404).json('notfound')
 }
 
})
})

//

//

//
//
app.get('/loggin/:email',(req,res)=>{
    let email=req.params.email
    let sql=`UPDATE admin SET islogged='true' WHERE email='${email}'`;
    db.query(sql,(err,result)=>{
        if (err) throw err
        console.log('Updated')
        res.json('loggedin')
    })
})


//

//
//
app.get('/logout/:email',(req,res)=>{
    let email=req.params.email
    let sql=`UPDATE admin SET islogged='false' WHERE email='${email}'`;
    db.query(sql,(err,result)=>{
        if (err) throw err
        console.log('Updated')
        res.json('logout')
    })
})

//
//
app.get('/fetchlog',(req,res)=>{
    let sql=`SELECT * FROM admin`
    db.query(sql,(err,result)=>{
        if(err) throw err

        res.json(result)
    })
})

//

app.post('/adduser',(req,res)=>{
    const email=req.body.email
    const password=req.body.password
    const name=req.body.name
    let sql=`INSERT INTO admin (email,password,name,islogged) VALUES('${email}','${password}','${name}','false')`;
    db.query(sql,(err,result)=>{
        if (err) throw err
        res.json('User added')
     })
    })

    //

    //
    app.get('/deluser/:email',(req,res)=>{
        const email=req.params.email
        let sql=`DELETE FROM admin WHERE email='${email}'`;
        db.query(sql,(err,result)=>{
            if (err) throw err
            res.json('User Deleted')
         })
        })
    //

    //

    app.get('/getusers',(req,res)=>{
        let sql=`SELECT * FROM admin`;
        let users=[]
        db.query(sql,(err,result)=>{
            if (err) throw err
            result.map((data)=>{
               users.push(data)
             })
       
        res.send(users)
         })
        })

    //


    app.post('/addrecord',(req,res)=>{
        const platenumber=req.body.platenumber
        const rate=req.body.rate
        const from='Warri'
        const destination=req.body.destination
        const liters='45,000'
        const fueling=req.body.fueling
        const feeding=req.body.feeding
        const amountFueling=req.body.amountFueling
        const shortage=req.body.shortage
        let   date=req.body.date
        const fuelLiters=req.body.fuelLiters
        const trip='depends'
        const totalRate=req.body.totalRate
        const expense=req.body.expense
        const balance= req.body.balance
      
       let sql=`INSERT INTO records(plate_number,rate,frm,destination,liters,fueling,feeding,amount_fueling,shortage,balance,dat,fuel_liters,trip) VALUES('${platenumber}','${rate}','${from}','${destination}','${liters}','${fueling}','${feeding}','${amountFueling}','${shortage}',${balance},'${date}','${fuelLiters}','${trip}')`;
        db.query(sql,(err,result)=>{
            if (err) throw err
            res.json('Record added')
         })
        })

        //
    

        //

        app.get('/getrecords',(req,res)=>{
            let sql=`SELECT * FROM records`;
            let records=[]
            db.query(sql,(err,result)=>{
                if (err) throw err
                result.map((data)=>{
                   records.push(data)
                 })
               res.json(records)
             })
            })
            
         //

         //

         app.get('/searchrecord/:number',(req,res)=>{
            let sql=`SELECT * FROM records WHERE plate_number='${req.params.number}'`;
            let record=[]
            db.query(sql,(err,result)=>{
                if (err) throw err
                result.map((data)=>{
                   record.push(data)
                 })
               res.json(record)
             })
            })

            //

            //

            app.post('/selectdate',(req,res)=>{
                let startDate=req.body.start;
                let endDate=req.body.end;
                let sql=`SELECT * FROM records WHERE dat>='${startDate}' && dat<='${endDate}'`;
                let record=[]
                db.query(sql,(err,result)=>{
                    if (err) throw err
                    result.map((data)=>{
                       record.push(data)
                     })
                   res.json(record)
                 })
                })

                //

                //
                app.post('/delrecord',(req,res)=>{
                    const date=req.body.date
                    const platenum=req.body.number
                    let sql=`DELETE FROM records WHERE dat='${date}' && plate_number='${platenum}'`;
                 db.query(sql,(err,result)=>{
                        if (err) throw err
                        if (result.affectedRows) {
                            res.json('Record Deleted')
                        }else
                        {
                            res.json('Record Not Found')
                        }
                     })
                    })

                //

                //
                app.get('/gettotal',(req,res)=>{
                    let sql=`SELECT SUM(balance) FROM records`
                    db.query(sql,(err,result)=>{
                        if (err) throw err
                        let sum=''
                        result.map(dat=>{
                            console.log(dat.entries)
                            sum=dat

                        })
                        res.json(sum)
                     })

                })



                //

                //


                
                //


app.listen(30001,(err,res)=>{
    console.log('Listening on port 301')
})






///

// "platenumber":"7yuuhsg",
// "rate":"45",
// "from":"mubigg",
// "destination":"karewabb",
// "liters":"649",
// "fueling":"6456677",
// "feeding":"64",
// "amountFueling":"649",
// "shortage":"649",
// "date":"1992-01-01",
// "fuelLiters":"40000",
// "trip":"6,5",
// "TotalRate":"400",
// "expense":"200",
// "balance":"20550"





/////