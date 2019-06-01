module.exports = {
    development: {
        client: 'pg',
        useNullAsDefault: true,
        connection: {
            host: 'localhost',
            user: 'glitch',
            password: '1234',
            database: 'expense_tracker'
        },
        // pool: {
        //   afterCreate: (conn, done) => {
        //     conn.query('SET timezone="UTC";', err => {
        //       if (err) {
        //         console.log('err connecting to database : ', err);
        //         return done(err, conn);
        //       }
        //       return console.log('connected to database : ');
        //     })
        //   }
        // }
    },

    // production: {
    //     client: 'pg',
    //     version: '10',
    //     connection: {
    //         host: 'ninetofiveai.cmvwd7fxpctd.us-east-2.rds.amazonaws.com',
    //         user: 'ninetofiveai',
    //         password: 'ninetofiveai',
    //         database: 'ninetofiveai'
    //     },
    //     pool: {
    //         afterCreate: (conn, done) => {
    //             conn.query('SET timezone="UTC";', err => {
    //                 if (err) {
    //                     console.log('err connecting to database : ', err);
    //                     return done(err, conn);
    //                 }
    //                 done(err, conn);
    //                 // return console.log('connected to database : ', conn);
    //             })
    //         }
    //     }
    // },

    // test: {
    //     client: 'pg',
    //     useNullAsDefault: true,
    //     connection: {
    //         host: 'localhost',
    //         user: 'glitch',
    //         password: '1234',
    //         database: 'nine_to_five_ai'
    //     }
    // },
    // pool: {
    //     afterCreate: (conn, done) => {
    //         conn.query('SET timezone="UTC";', err => {
    //             if (err) {
    //                 console.log('err connecting to database : ', err);
    //                 return done(err, conn);
    //             }
    //             return console.log('connected to database : ', conn);
    //         })
    //     }
    // }
};
