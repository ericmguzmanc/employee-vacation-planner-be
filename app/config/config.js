
const SERVER = process.env.SERVER
const DBPORT = process.env.DBPORT
const DATABASE = process.env.DATABASE
const dbURI = `mongodb://${SERVER}:${DBPORT}/${DATABASE}`

module.exports = {
  'secret': process.env.SECRET,
  'database': dbURI,
  'tokenExpirationTime': process.env.TOKEN_EXPIRATION_TIME
}