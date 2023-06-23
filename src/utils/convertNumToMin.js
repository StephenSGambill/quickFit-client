

export const convertNumToMin = (num) => {
    const mins = Math.floor(num / 60)
    const secs = num - mins * 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
}