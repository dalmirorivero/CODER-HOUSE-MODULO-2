import { connect } from 'mongoose';
import 'dotenv/config.js';

connect(process.env.DBURI)
.then(() => {
    console.log('Database ready')
})
.catch(() => {
    console.log('Database failed')
});