import connectDB from "./db/index.db.js";
import app from './app.js'

connectDB().then(() => {
    app.listen(process.env.PORT || 8000,(req,res) => {
        console.log("all done");
    })
}).catch((err) => console.log(err)
)

