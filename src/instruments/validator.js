export default class {
    static validatePhoneNumber(phoneNumber = '') {
        if(!/^[0-9]*$/.test(phoneNumber)){
            return false
        }
        if (phoneNumber.length < 9 && phoneNumber.length > 14) {
            return false
        }
        if (phoneNumber.substr(0, 2) == '08' || phoneNumber.substr(0, 2) == '62') {
            return true
        }
        return false;
    }
    static emailValidator(emailTxt) {
        return /\S+@\S+\.\S+/.test(emailTxt)
    }
}