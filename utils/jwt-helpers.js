import jwt from 'jsonwebtoken';
function jwtTokens({empid, email}){
    const user ={empid,email};
    const accessToken =jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'24h'});
    const refreshToken =jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'10h'});
   

    return ({accessToken,refreshToken});
}
export {jwtTokens};