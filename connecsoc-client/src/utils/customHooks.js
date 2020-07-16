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