import {useEffect} from 'react'
import Router from "next/router"
import useRequest from "../../hooks/useRequest"
const signout = () => {
  const {doRequest, errors} = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/")
  })
  useEffect(() => {
    doRequest()
  }, [])
  return (
    <>
    </>
  )
}

export default signout