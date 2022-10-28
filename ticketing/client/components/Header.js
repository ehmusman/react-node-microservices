import React from 'react'
import Link from "next/link"

const Header = ({ currentUser }) => {
  console.log(currentUser)
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className='container'>

          <Link className="navbar-brand" href="/"><a>
            Ticketing App {currentUser?.email || ""} 
            </a></Link>
          {!currentUser ? <>
            <Link className="navbar-brand" href="/auth/signup">Signup</Link>
            <Link className="navbar-brand" href="/auth/signin">Signin</Link>
          </> : <Link className="navbar-brand" href="/auth/signout">Sign Out</Link>}
        </div>
      </nav>
    </>
  )
}

export default Header