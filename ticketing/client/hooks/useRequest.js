import { useState } from "react";
import axios from "axios";
export default ({url, method, body, onSuccess}) => {
    const [errors, setErrors] = useState("")
    const doRequest = async () => {
        try {
            const {data} = await axios[method](url, body)
            if(onSuccess){
                onSuccess(data)
            }
            return data
        } catch (error) {
            console.log(error.response)
            setErrors(
                <div className='alert alert-danger'>
                    <ul className='my-0'>
                        {error.response.data.errors.map(err => <li key={err.message}>{err.message}</li>)}
                    </ul>
                </div>
            )
            setTimeout(()=>{

                setErrors("")
            }, 5000)
        }
    }

    return {doRequest, errors}
}