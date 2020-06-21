require('dotenv').config();

interface Ienv {
  jwtsecret: string;
}
const env = {
  jwtsecret: process.env.JWTSECRET,
};

export default <Ienv>env;
