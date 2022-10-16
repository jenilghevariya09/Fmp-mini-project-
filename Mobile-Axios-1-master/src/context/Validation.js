export class Validation {

    static isValidLength(key, length) {
        return key.length < length ? 'in' : '';
    }
    
    // static isLengthOk(key, length) {
    //     return key.length < length ? 'Length too short' : 'Lenght OK';
    // }

    
}