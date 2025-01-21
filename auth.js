

// export const auth = (req, res, next) =>{
//     console.log("Authenticating")
//     next();
// }



import mongoose from "mongoose";

const id = mongoose.Types.ObjectId.isValid("3289d4d4537ea58b4cc0a7fd")

console.log(id)