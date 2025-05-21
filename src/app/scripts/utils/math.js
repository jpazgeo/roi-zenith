const roundNumber = (value) => {
    return Math.round((value + Number.EPSILON) * 100) / 100
}

export { roundNumber }