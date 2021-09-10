export class AssertionError extends Error {
    constructor(msg:string) {
        super(msg);
        this.name = AssertionError.name;
    }
}

export const nonEmptyStrings = assertAllFactory((propValue: unknown, propName: string) => {
    if (typeof propValue !== 'string') {
        throw new AssertionError(`${propName} must be non empty string`);
    }
});

export const stringsOrUndefined = assertAllFactory((propValue: unknown, propName: string) => {
    if (typeof propValue !== 'string' && propValue !== undefined) {
        throw new AssertionError(`If ${propName} is specified it must be a string`);
    }
});

export const arrays = assertAllFactory((propValue: unknown, propName: string, _all: InputProperties, msg?: string) => {
    if (!Array.isArray(propValue)) {
        throw new AssertionError(msg ?? `${propName} must be an array`);
    }
});

interface InputProperties {
    [key: string]: unknown;
}

function assertAllFactory(func: (prop: unknown, propName: string, allProps: InputProperties, msg?: string) => void) {
    return function(properties: InputProperties, msg?: string) {
        Object.keys(properties).forEach(propName => func(properties[propName], propName, properties, msg));
    }
}


