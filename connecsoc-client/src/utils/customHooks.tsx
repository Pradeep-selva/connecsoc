import { useState } from 'react'

interface DetailFormType {
    bio: string | '',
    website: string | '',
    location: string | '',
}

interface UserStateType {
    location?: string,
    website?: string,
    bio?: string
    imgUrl: string,
    handle: string,
    uid: string,
    createdAt: string,
    email: string,
}

export const useDetailForm = (formData: DetailFormType) => {
    const [data, setData] = useState(formData)

    return [
        data,
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setData({
                ...data,
                [event.target.name]: event.target.value
            })
        },
        (newData: DetailFormType) => {
            setData({
                ...data,
                ...newData
            })
        }
    ]
}

export const useUserState = (userData: UserStateType) => {
    const [data, setData] = useState(userData)

    return [
        data,
        (newData: UserStateType) => {
            setData({
                ...data,
                ...newData
            })
        }
    ]
}

export const usePaths = () => {
    const [paths, setPaths] = useState({
        oldPath: '',
        newPath: ''
    })

    return [
        paths,
        (oldPath: string, newPath: string) => {
            setPaths({
                oldPath,
                newPath
            })
        }
    ]
}