import { useState } from 'react'

export const useDetailForm = (formData) => {
    const [data, setData] = useState(formData)

    return [
        data,
        event => {
            setData({
                ...data,
                [event.target.name]: event.target.value
            })
        },
        newData => {
            setData({
                ...data,
                ...newData
            })
        }
    ]
}

export const useUserState = (userData) => {
    const [data, setData] = useState(userData)

    return [
        data,
        newData => {
            setData({
                ...data,
                ...newData
            })
        }
    ]
}