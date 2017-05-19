import { rules } from '../rules';

describe('Minlength method', () => {
    
    // Exceptions
    it('is missing both arguments', () => {
        expect(() => { rules.minLength() })
        .toThrowError('Validation rules minLength: Both parameters are required.');
    });
    it('is missing minLength argument', () => {
        expect(() => { rules.minLength('', 'value') })
        .toThrowError('Validation rules minLength: Both parameters are required.');
    });
    it('is missing value argument', () => {
        expect(() => { rules.minLength(5, '') })
        .toThrowError('Validation rules minLength: Both parameters are required.');
    });
    it('is noNumber minLenght argument', () => {
        expect(() => { rules.minLength('noNumber', 'value') })
        .toThrowError(/Validation rules minLength: parameter minLength must be a number./);
    });
    it('is noString value argument', () => {
        expect(() => { rules.minLength(5, {value: 'value'}) })
        .toThrowError(/Validation rules minLength: parameter value must be a string./);
    });

    //Results
    it('is equal minLength to value length', () => {
        expect(rules.minLength(5, 'value'))
        .toBe(true);
    });
    it('is smaller minLength then value length', () => {
        expect(rules.minLength(3, 'value'))
        .toBe(true);
    });
    it('is longer minLength then value length', () => {
        expect(rules.minLength(7, 'value'))
        .toBe(false);
    });
});

describe('Maxlength method', () => {
    
    // Exceptions
    it('is missing both arguments', () => {
        expect(() => { rules.maxLength() })
        .toThrowError('Validation rules maxLength: Both parameters are required.');
    });
    it('is missing maxLength argument', () => {
        expect(() => { rules.maxLength('', 'value') })
        .toThrowError('Validation rules maxLength: Both parameters are required.');
    });
    it('is missing value argument', () => {
        expect(() => { rules.maxLength(5, '') })
        .toThrowError('Validation rules maxLength: Both parameters are required.');
    });
    it('is noNumber minLenght argument', () => {
        expect(() => { rules.maxLength('noNumber', 'value') })
        .toThrowError(/Validation rules maxLength: parameter maxLength must be a number./);
    });
    it('is noString value argument', () => {
        expect(() => { rules.maxLength(5, {value: 'value'}) })
        .toThrowError(/Validation rules maxLength: parameter value must be a string./);
    });

    // Results
    it('is equal maxLength to value length', () => {
        expect(rules.maxLength(5, 'value'))
        .toBe(true);
    });
    it('is smaller maxLength then value length', () => {
        expect(rules.maxLength(3, 'value'))
        .toBe(false);
    });
    it('is longer maxLength then value length', () => {
        expect(rules.maxLength(7, 'value'))
        .toBe(true);
    });
});

describe('Email method', () => {
    
    // Exceptions
    it('is missing email argument', () => {
        expect(() => { rules.email() })
        .toThrowError('Validation rules email: Parameter email is required.');
    });
    it('is noString email argument', () => {
        expect(() => { rules.email({email: 'email'}) })
        .toThrowError(/Validation rules email: parameter email must be a string./);
    });

    // Results
    it('is valid easy email', () => {
        expect(rules.email('email@example.com'))
        .toBe(true);
    });
    it('is valid email', () => {
        expect(rules.email('test.email83@example.com'))
        .toBe(true);
    });
    it('is invalid email without domanin end', () => {
        expect(rules.email('email@example'))
        .toBe(false);
    });
    it('is invalid email without domanin', () => {
        expect(rules.email('email@'))
        .toBe(false);
    });
    it('is invalid email without at', () => {
        expect(rules.email('emailexample.com'))
        .toBe(false);
    });
    it('is invalid email without local part', () => {
        expect(rules.email('@example.com'))
        .toBe(false);
    });
});

describe('Email simple method', () => {
    
    // Exceptions
    it('is missing email argument', () => {
        expect(() => { rules.emailSimple() })
        .toThrowError('Validation rules emailSimple: Parameter email is required.');
    });
    it('is noString email argument', () => {
        expect(() => { rules.emailSimple({email: 'email'}) })
        .toThrowError(/Validation rules emailSimple: parameter email must be a string./);
    });

    // Results
    it('is valid easy email', () => {
        expect(rules.email('email@example.com'))
        .toBe(true);
    });
    it('is valid email', () => {
        expect(rules.email('test.email83@example.com'))
        .toBe(true);
    });
    it('is invalid email without domanin end', () => {
        expect(rules.email('email@example'))
        .toBe(false);
    });
    it('is invalid email without domanin', () => {
        expect(rules.email('email@'))
        .toBe(false);
    });
    it('is invalid email without at', () => {
        expect(rules.email('emailexample.com'))
        .toBe(false);
    });
    it('is invalid email without local part', () => {
        expect(rules.email('@example.com'))
        .toBe(false);
    });
});

describe('Equal method', () => {
    
    // Exceptions
    it('is missing all arguments', () => {
        expect(() => { rules.equal() })
        .toThrowError('Validation rules equal: Parameter secName is required.');
    });
    it('is missing secName argument', () => {
        expect(() => { rules.equal('', 'value', 'secValue') })
        .toThrowError('Validation rules equal: Parameter secName is required.');
    });
    it('is noString secName argument', () => {
        expect(() => { rules.equal({noString: 'noString'}, 'value', 'secValue') })
        .toThrowError(/Validation rules equal: parameter secName must be a string./);
    });

    // Results
    it('is value equal to secValue', () => {
        expect(rules.equal('password', 'sameValue', 'sameValue'))
        .toBe(true);
    });
    it('is value not equal to secValue', () => {
        expect(rules.equal('password', 'value', 'different'))
        .toBe(false);
    });
});

describe('Greater method', () => {
    
    // Exceptions
    it('is missing all arguments', () => {
        expect(() => { rules.greater() })
        .toThrowError('Validation rules greater: Parameter secName is required.');
    });
    it('is missing secName argument', () => {
        expect(() => { rules.greater('', 'value', 'secValue') })
        .toThrowError('Validation rules greater: Parameter secName is required.');
    });
    it('is noString secName argument', () => {
        expect(() => { rules.greater({noString: 'noString'}, 'value', 'secValue') })
        .toThrowError(/Validation rules greater: parameter secName must be a string./);
    });

    // Results
    it('is value greater than secValue', () => {
        expect(rules.greater('min', 10, 5))
        .toBe(true);
    });
    it('is value not greater than secValue', () => {
        expect(rules.greater('min', 3, 5))
        .toBe(false);
    });
});

describe('Lower method', () => {
    
    // Exceptions
    it('is missing all arguments', () => {
        expect(() => { rules.lower() })
        .toThrowError('Validation rules lower: Parameter secName is required.');
    });
    it('is missing secName argument', () => {
        expect(() => { rules.lower('', 'value', 'secValue') })
        .toThrowError('Validation rules lower: Parameter secName is required.');
    });
    it('is noString secName argument', () => {
        expect(() => { rules.lower({noString: 'noString'}, 'value', 'secValue') })
        .toThrowError(/Validation rules lower: parameter secName must be a string./);
    });

    // Results
    it('is value lower than secValue', () => {
        expect(rules.lower('max', 5, 10))
        .toBe(true);
    });
    it('is value not lower than secValue', () => {
        expect(rules.lower('max', 15, 10))
        .toBe(false);
    });
});

describe('Required method', () => {
    
    // Results
    it('is inserted value', () => {
        expect(rules.required('   test value   ')).toBe(true);
    });
    it('is inserted empty value', () => {
        expect(rules.required('      ')).toBe(false);
    });
});

describe('Regex method', () => {

    // Exceptions
    it('is missing all arguments', () => {
        expect(() => { rules.regex() })
        .toThrowError('Validation rules regex: reg and value parameters are required.');
    });
    it('is missing reg argument', () => {
        expect(() => { rules.regex('', false, 'test value') })
        .toThrowError('Validation rules regex: reg and value parameters are required.');
    });
    it('is missing value arguments', () => {
        expect(() => { rules.regex(/\w/g, false, '') })
        .toThrowError('Validation rules regex: reg and value parameters are required.');
    });
    it('is noString value argument', () => {
        expect(() => { rules.regex(/\w/g, false, {noString: 'noString'}) })
        .toThrowError(/Validation rules regex: parameter value must be a string./);
    });

    // Results
    it('is simple regex test word character', () => {
        expect(rules.regex(/\w/g, false, 'test value')).toBe(true);
    });
    it('is simple regex test word character with negated flag', () => {
        expect(rules.regex(/\w/g, true, 'test value')).toBe(false);
    });
});
