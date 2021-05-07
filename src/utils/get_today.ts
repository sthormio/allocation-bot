interface getTodayDateProps {
    isReverted?: boolean;
}


export function getTodayDate(options: getTodayDateProps): string {
    let today = "";
    const date = new Date();

    if (options.isReverted) {
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const day = String(date.getDate()).padStart(2, "0")
        today = `${date.getFullYear()}/${month}/${day}`
    } else {
        today = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    }


    return today
}