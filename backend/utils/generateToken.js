import jwt from "jsonwebtoken"

const generateTocken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
    res.cookie('accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 //30 days maxage 
    });
    return token;
}

const generateAdmintoken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
    res.cookie('accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 //30 days maxage 
    });
    return token;
}
export default generateTocken;
export { generateAdmintoken }