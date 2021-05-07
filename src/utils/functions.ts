export function useSplitWhenHasFlags(message: string, flag: string): (string | string[])[] {
    const rawContent = message.split(flag)
    const content = rawContent[0].split(" ")

    if (message.includes(flag)) {
        content.pop();
    }

    content.shift();

    const result = [content, rawContent[1] ?? ""];

    return result
}