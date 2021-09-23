export class AssertionError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = AssertionError.name;
    }
}

export const nonEmptyStrings = assertAllFactory((propValue: unknown, propName: string) => {
    if (typeof propValue !== 'string' || propValue.length === 0) {
        return `${propName} must be non empty string`;
    }
});

export const stringsOrUndefined = assertAllFactory((propValue: unknown, propName: string) => {
    if (typeof propValue !== 'string' && propValue !== undefined) {
        return `If ${propName} is specified it must be a string`;
    }
});

export const stringsNotMatch = assertAllFactory((propValue, propName, _allProps, opts) => {
    if (typeof propValue !== 'string' || propValue?.match(opts)) {
        return `${propName} must be a string and it can't match ${opts}`;
    }
});

export const arrays = assertAllFactory((propValue: unknown, propName: string) => {
    if (!Array.isArray(propValue)) {
        return `${propName} must be an array`;
    }
});

export const arraysOfNonEmptyStrings = assertAllFactory((propValue, propName) => {
    if (!Array.isArray(propValue) || propValue.some(val => typeof val !== 'string' || val.length === 0)) {
        return `${propName} must be an array of non empty strings`;
    }
});

export const objects = assertAllFactory((propValue: unknown, propName: string) => {
    if (!(propValue instanceof Object) || Array.isArray(propValue)) {
        return `${propName} must be an object`;
    }
});

export const specificValues = assertAllFactory((propValue, propName, _allProps, opts) => {
    if (propValue !== opts) {
        return `${propName} must be ${opts}`;
    }
});

interface NumbersOptions {
    greaterThan: number|undefined;
    greaterThanOrEqual: number|undefined;
    lessThan: number|undefined;
    lessThanOrEqual: number|undefined;
}

function getMsg(
    propName: string,
    { greaterThan, greaterThanOrEqual, lessThan, lessThanOrEqual }: NumbersOptions
) {
    const msgs = [];

    if (typeof greaterThan === 'number') {
        msgs.push(`greater than ${greaterThan}`)
    } 

    if (typeof greaterThanOrEqual === 'number') {
        msgs.push(`greater than or equal ${greaterThanOrEqual}`)
    } 

    if (typeof lessThan === 'number') {
        msgs.push(`less than ${lessThan}`)
    } 

    if (typeof lessThanOrEqual === 'number') {
        msgs.push(`less than or equal ${greaterThanOrEqual}`)
    } 

    return `${propName} must be a number ${msgs.join(' and ')}`
}


export const numbers = assertAllFactory((propValue: unknown, propName: string, _allProps, opts: unknown) => {
    const config: NumbersOptions = (opts instanceof Object ? opts : {} as any);

    if (typeof propValue !== 'number') {
        return getMsg(propName, config);
    } 

    if (config.greaterThan !== undefined && typeof config.greaterThan !=='number') {
        throw new Error(`can't compare to non-number - 'greaterThan' must be number or undefined`)
    }
    
    if (typeof config.greaterThan === 'number' && config.greaterThan >= propValue) {
        return getMsg(propName, config);
    }
    
    if (config.greaterThanOrEqual !== undefined && typeof config.greaterThanOrEqual !=='number') {
        throw new Error(`can't compare to non-number - 'greaterThanOrEqual' must be number or undefined`)
    }
    
    if (typeof config.greaterThanOrEqual === 'number' && config.greaterThanOrEqual > propValue) {
        return getMsg(propName, config);
    }
    
    if (config.lessThan !== undefined && typeof config.lessThan !=='number') {
        throw new Error(`can't compare to non-number - 'lessThan' must be number or undefined`)
    }
    
    if (typeof config.lessThan === 'number' && config.lessThan <= propValue) {
        return getMsg(propName, config);
    }
    
    if (config.lessThanOrEqual !== undefined && typeof config.lessThanOrEqual !=='number') {
        throw new Error(`can't compare to non-number - 'lessThanOrEqual' must be number or undefined`)
    }
    
    if (typeof config.lessThanOrEqual === 'number' && config.lessThanOrEqual < propValue) {
        return getMsg(propName, config);
    }
    });

interface InputProperties {
    [key: string]: unknown;
}

function assertAllFactory(
    func: (
        prop: unknown,
        propName: string,
        allProps: InputProperties,
        opts?: any
    ) => void
) {
    return function(
        allProps: InputProperties,
        opts?: any,
        msg?: string | ((propName: string) => string)
    ) {
        Object.keys(allProps).forEach(propName => {
            const result = func(allProps[propName], propName, allProps, opts)
            if (typeof result === 'string') {
                if (typeof msg === 'function') {
                    msg = msg(propName);
                }
                msg = msg || result;
                throw new AssertionError(msg);
            }
        });
    }
}


