export const required = (value) => {
    if (value) return undefined;
    return 'Fill in the field'
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value && value.length > 25) return `Maximum length ${maxLength} characters`;
    return undefined;
}

export const minLengthCreator = (minLength) => (value) => {
    if (value && value.length < 6) return `Minimum password length ${minLength} characters`;
    return undefined;
}

export const passwordsMatch = (value, allValues) =>
    value !== allValues.password ? 'Password do not match' : undefined;

export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Incorrect email'
        : undefined

export const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined

export const maxValue = max => value =>
    value && value > max ? `Must be no more ${max}` : undefined
