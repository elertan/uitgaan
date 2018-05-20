import InputError from './InputError';

function scorePassword(pass) {
    var score = 0;
    if (!pass)
        return score;

    // award every unique letter until 5 repetitions
    var letters = new Object();
    for (var i=0; i<pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    var variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    }

    variationCount = 0;
    for (var check in variations) {
        variationCount += (variations[check] == true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return parseInt(score);
}

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

export const username = (val) => {
    if (!val) {
        return new InputError('Veld is verplicht');
    }
    if (val.length < 5) {
        return new InputError('Moet minimaal 5 karakters bevatten');
    }
}

export const password = (val) => {
    if (!val) {
        return new InputError('Veld is verplicht');
    }
    if (val.length < 8) {
        return new InputError('Moet minimaal 8 karakters bevatten');
    }

    const score = scorePassword(val);
    if (score < 60) {
        return new InputError('Probeer meer speciale tekens en/of getallen toe te voegen');
    }
}

export const passwordAgain = (pass1, pass2) => {
    if (pass1 !== pass2) {
        return new InputError('Wachtwoorden komen niet overeen');
    }
}