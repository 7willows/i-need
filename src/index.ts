export class AssertionError extends Error {
    constructor(msg:string) {
        super(msg);
        this.name = AssertionError.name;
    }
}

export const nonEmptyStrings = assertAllFactory((propValue: unknown, propName: string) => {
    if (typeof propValue !== 'string') {
        return `${propName} must be non empty string`;
    }
});

export const stringsOrUndefined = assertAllFactory((propValue: unknown, propName: string) => {
    if (typeof propValue !== 'string' && propValue !== undefined) {
        return `If ${propName} is specified it must be a string`;
    }
});

export const arrays = assertAllFactory((propValue: unknown, propName: string, _all: InputProperties, msg?: string) => {
    if (!Array.isArray(propValue)) {
        return `${propName} must be an array`;
    }
});

export const specificValues = assertAllFactory((propValue, propName, _allProps, opts) => {
    if (propValue !== opts) {
        return `${propName} must be ${opts}`;
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
        opts?: any,
        msg?: string | ((propName:string) => string)
    ) => void
) {
    return function(
        allProps: InputProperties,
        opts?: any,
        msg?: string | ((propName:string) => string)
    ) {
        Object.keys(allProps).forEach(propName => {
            const result = func(allProps[propName], propName, allProps, opts, msg)
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


