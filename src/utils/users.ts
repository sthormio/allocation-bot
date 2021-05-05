interface UserProps {
    id: string,
    name: string,
}

interface checkAlocationProps {
    users: UserProps[],
    usersAlocated: UserProps[],
}

export const users: UserProps[] = [
    { id: "287257435830353922", name: "Bruno Alves" },
    { id: "373874655334760458", name: "Fabiano Santana" },
    { id: "173826954087104512", name: "Lucas Machado" },
    { id: "788044070801899541", name: "Renee Vella" },
    { id: "288037716157923329", name: "Alexandre Tolstenko" },
    { id: "830068804205281320", name: "Guilherme Simeao" },
    { id: "675320726185705513", name: "Dan Almeida" },
    { id: "239149135519809536", name: "Camille Hughes" },
    { id: "227975163369619456", name: "Thiago Ataide" },
    { id: "125180222306910208", name: "Luciano Lemgruber" },
    { id: "383062725254709248", name: "Sywrah Gabriella" },
]

export const checkAlocation: checkAlocationProps = {
    users: [...users],
    usersAlocated: [],
}