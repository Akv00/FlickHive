import validator from "validator"
export const checkValidData = (email,password) => {
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    if(!validator.isEmail(email)) return "Email is not valid"
    if(!isPasswordValid) return "Password is not valid"

    return null
} 
  
