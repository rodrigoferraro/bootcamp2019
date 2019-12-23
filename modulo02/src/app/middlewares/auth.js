import jwt from 'jsonwebtoken'
import { promisify } from 'util'

import authConfig from '../../config/auth'

export default async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" })
  }
  //const [ bearer, token ]= authHeader.split(' ');
  // quando faço a DESESTRUTURAÇÃO mas não quero utilizar o(s) primeiro(s) elemento(s)
  // posso simplesmente deixar a vírgula antes, e utilizar o 2nd
  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)

    req.userId = decoded.id;

    console.log(decoded)

    return next()
  }
  catch (err) {
    return res.status(401).json({ error: 'Invalid Token' })
  }
}