import InputError from './InputError';

class ValidationError {
    constructor(key, message = undefined, showFeedback = false) {
        this.key = key;
        this.message = message;
        this.showFeedback = showFeedback;
    }
}

const copyVE = (ve) => {
    const newVe = Object.assign({}, ve);
    newVe.inputErrors = [...ve.inputErrors];
    return newVe;
}

export default class ValidationManager {
    constructor(requiredFields = []) {
        this.inputErrors = [];
        requiredFields.forEach(rf => {
            this.inputErrors.push(new ValidationError(rf, 'Veld is verplicht'));
        });
    }

    getError = (key) => {
        const error = this.inputErrors.find(ie => ie.key === key);
        if (!error) return null;
        if (!error.showFeedback) return null;
        return error.message;
    }

    enableFeedback = (key) => {
        const index = this.inputErrors.findIndex(ie => ie.key === key);
        if (index === -1) return this;
        this.inputErrors[index].showFeedback = true;
        return copyVE(this);
    }

    disableFeedback = (key) => {
        const index = this.inputErrors.findIndex(ie => ie.key === key);
        if (index === -1) return this;
        this.inputErrors[index].showFeedback = false;
        return copyVE(this);
    }

    setError = (key, error) => {
        const index = this.inputErrors.findIndex(ie => ie.key === key);
        const msg = !error ? undefined : error.message;
        if (index !== -1) {
            const ie = new ValidationError(key, msg, this.inputErrors[index].showFeedback);
            this.inputErrors[index] = ie;
        } else {
            const ie = new ValidationError(key, msg);
            this.inputErrors.push(ie);
        }
        return copyVE(this);
    }

    isValidSubset = (keys) => {
        for (let keyI = 0; keyI < keys.length; keyI++) {
            const index = this.inputErrors.findIndex(ie => ie.key === keys[keyI]);
            if (index === -1) continue;
            if (this.inputErrors[index].message) return false;
        } 
        return true;
    }

    isValid = () => {
        for (let i = 0; i < this.inputErrors.length; i++) {
            if (this.inputErrors[i].message) {
                return false;
            }
        }
        return true;
    }
}