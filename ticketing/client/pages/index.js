import buildClient from "../api/buildClient"
export default function Home({ currentUser }) {
return currentUser ? <h1>You Are Signed in</h1> : <h1>You are not signed in</h1>
}

Home.getInitialProps = async (context) => {
  const client = buildClient(context)
 const {data} = await client.get("/api/users/currentuser")
 return data
}