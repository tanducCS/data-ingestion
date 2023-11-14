import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Config } from "../Config";


const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
    prepareHeaders: (headers) => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyXzRlMWQwMmRlLTYwODgtNDMwZC1hOWM2LTc1MzFkMTk0ZjI1YiIsImlhdCI6MTY5Nzk4NjMyN30.lxZqB1Qwa_YHK8Okj54V2PEUa4hvFiVP6AJHSUP8t9s'
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
    }
})

const baseQueryWithInterceptor = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401 ){
        console.log(result.error)
    }
    return result;
}

export const API = createApi({
    baseQuery: baseQueryWithInterceptor,
    tagTypes:["Users","Tasks","DataCategories"],
    endpoints: () => ({}),
})





