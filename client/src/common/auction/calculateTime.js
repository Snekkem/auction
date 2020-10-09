export const calculateTime = (dd, hh, mm) => {
    const days = (dd * 86400) * 1000
    const hours = (hh * 3600) * 1000
    const minutes = (mm * 60000)

    const sum = [days, hours, minutes].reduce((result, value) => result += value ? value : 0, 0)

    return sum
}


