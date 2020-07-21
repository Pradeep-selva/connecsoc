import { useState } from 'react'
import { CredentialsType } from '../redux/reducers/userReducers'

interface DetailFormType {
    bio: string | '',
    website: string | '',
    location: string | '',
}

interface SignupType {
    email: string,
    password: string,
    confirmPassword: string,
    handle: string,
}

interface UserStateType {
    profile?: CredentialsType | {},
    userLoading?: boolean
}

export const useSignupForm = (formData: SignupType) => {
    const [data, setData] = useState(formData)

    return {
        state: data,
        handleChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            setData({
                ...data,
                [event.target.name]: event.target.value
            })
        }
    }
}

export const useDetailForm = (formData: DetailFormType) => {
    const [data, setData] = useState(formData)

    return {
        data: data,
        handleChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            setData({
                ...data,
                [event.target.name]: event.target.value
            })
        },
        mapData: (newData: DetailFormType) => {
            setData({
                ...data,
                ...newData
            })
        }
    }
}

export const useUserState = (userData: UserStateType) => {
    const [data, setData] = useState(userData)

    return {
        userState: data,
        setUserState: (newData: UserStateType) => {
            setData({
                ...data,
                ...newData
            })
        }
    }
}

export const usePaths = () => {
    const [paths, setPaths] = useState({
        oldPath: '',
        newPath: ''
    })

    return {
        paths: paths,
        setPaths: (oldPath: string, newPath: string) => {
            setPaths({
                oldPath,
                newPath
            })
        }
    }
}