
import bcrypt from "bcrypt"


const hashpassword = async function(password)
{
    return await bcrypt.hash(password,10)
}

const comparepassword = async function(plain,hashed)
{
    return await bcrypt.compare(plain,hashed)
}

export {hashpassword,comparepassword}
