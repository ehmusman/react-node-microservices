import 'bootstrap/dist/css/bootstrap.css'
import Header from '../components/Header'
import {store} from "../store"
import {Provider} from "react-redux"
import buildClient from '../api/buildClient'
function MyApp({ Component, pageProps, currentUser }) {
  return <Provider store={store}>
  <Header currentUser={currentUser}/>
    <div className="container">
    <Component {...pageProps} />
    </div>
    </Provider>
}

export default MyApp

MyApp.getInitialProps = async ({ctx: context, Component}) => {
  // console.log("_app = ", context)
  const client = buildClient(context)
  const { data } = await client.get("/api/users/currentuser")
  let pageProps= {};
  if (Component.getInitialProps){
     pageProps = await Component.getInitialProps(context)
  }
  return {
    pageProps,
    ...data
  }
}