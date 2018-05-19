import InputError from './InputError';

export const firstname = (val) => {
    if (!val) {
        return new InputError('Veld is verplicht');
    }
    if (val.length < 3) {
        return new InputError('Moet minimaal 3 karakters bevatten');
    }
};

export const lastname = (val) => {
    if (!val) {
        return new InputError('Veld is verplicht');
    }
    if (val.length < 3) {
        return new InputError('Moet minimaal 3 karakters bevatten');
    }
};