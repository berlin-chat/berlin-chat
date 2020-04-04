import {useState} from 'react'

export const useLocalStorage = (key: string, initialValue: string): any => {

    if(localStorage.getItem(key) !== null){
        initialValue = localStorage.getItem(key) || ""
    } else {
        localStorage.setItem(key, initialValue)
    }

    const [state, setState] = useState(initialValue)

    async function setLocalStorage(value: string): Promise<void> {
        localStorage.setItem(key, value)
        setState(value)
    }

    return [state, setLocalStorage]
}
