import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Config } from "../Config";


const baseQuery = fetchBaseQuery({
    // baseUrl: "http://localhost:3000/",
    baseUrl: "http://hpcc.hcmut.edu.vn:23000/",
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
    }
})
export const secrectKey=(key) =>{
    return key;
};

const postData =fetchBaseQuery({
    baseUrl: "http://hpcc.hcmut.edu.vn:23000/",
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('secrectKey');
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

const uploadQueryWithInterceptor = async (args, api, extraOptions) => {
    const result = await postData(args, api, extraOptions)
    if (result.error && result.error.status === 401 ){
        console.log(result.error)
    }
    return result;
}

export const API = createApi({
    baseQuery: baseQueryWithInterceptor,
    tagTypes:["Users","Tasks","DataCategories","DataSchema"],
    endpoints: () => ({}),
})
export const uploadAPI = createApi({
    baseQuery: uploadQueryWithInterceptor,
    tagTypes:["Users","Tasks","DataCategories","DataSchema"],
    endpoints: () => ({}),
})





