import bcrypt from 'bcryptjs'
export async function passwordHash(password: string){
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword
}

export async function passwordCompare(password: string, userPassword: string|undefined){
    if(!userPassword) return false
    if(!password) return false
    const isMatch = await bcrypt.compare(password, userPassword);
    return isMatch
}