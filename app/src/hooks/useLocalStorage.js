import { useEffect, useState } from "react";

//2 ways to initialize
//const [poop, setPoop] = useLocalStorage('keyName')
//setPoop('intitialValue')
// ....
//const [poop, setPoop] = useLocalStorage('keyName', 'initialValue')

const PREFIX = 'chat-box-'

export default function useLocalStorage(key, initialValue){
    const prefixedKey = PREFIX + key
    const [value, setValue] = useState(()=>{
        const jsonValue = localStorage.getItem(prefixedKey)
        if(jsonValue != null) return JSON.parse(jsonValue)
        if(typeof initialValue === 'function'){
            return initialValue()
        }
        else {
            return initialValue
        }
    })

    useEffect(()=>{
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue]
}