export function getTodayDate(): string {
    let today = "";
    const date = new Date();

    today = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

    return today
}