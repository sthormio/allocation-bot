export interface AllocationProps {
    username: string,
    project: string,
    hours: string,
    obs: string | boolean
}

export interface AllocationDayOffProps {
    username: string,
    amount: number,
    date?: string,
    description?: string,
}
