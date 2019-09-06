
const bcrypt = require('bcrypt');
const date = require('date-and-time');
const db = require('../utils/dbConfig');
const token = require('../utils/token');


//controller for login

exports.getLogin = (req, res, next) => {
    return res.status(200).json({ message: "Inside the getLogin" })
}

//controller for postSignup
exports.postSignUp = (req, res, next) => {
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, 12);
    const now = new Date();

    const User = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        mobile: req.body.mobile,
        password: hashedPassword,
        country: req.body.country,
        status: req.body.status,
        created_at: date.format(now, 'YYYY-MM-DD HH:mm:ss'),
        role: req.body.role
    }
    db.promise().query('select * from user where email = ? or mobile = ?', [req.body.email, req.body.mobile])
    .then(([rows, fields]) =>{
         if(rows.length > 0){
            console.log(rows)
            return res.status(200).json({ message: "user already exist", data: rows})
        }
        else{
            db.promise().query('insert into user set ?', User)
            .then(([rows, fields]) =>{
                if(rows){
                    console.log(rows)
                    return res.status(201).json({ message: `user created in user_table record_id : ${rows.insertId}`})
                }
            }).catch(err => console.log('Error inside the query',err))
        }

    }).catch(err => console.log("Error inside query!!", err))
}



exports.postLogin = (req, res, next) =>{
    const email = req.body.email;
    const password = req.body.password;

    db.promise().query('select * from user where email = ?', email)
    .then(([rows, fields]) =>{
        if(rows.length < 1){
        return res.status(401).json({ message: 'Unautorized user signUp again' })
        }
        else if(rows.length > 0){
            console.log(rows[0].id)
             const dbPassword = rows[0].password;
             bcrypt.compare(password, dbPassword, (err, doMatch)=>{
                 if(doMatch){
                     let genToken = token(email, process.env.SECRET)
                     res.header('Authorization', genToken)
                     console.log(res.header())
                    return res.redirect('/auth/login')
                 }

             })
        }
    }).catch(err => console.log(err))

}

