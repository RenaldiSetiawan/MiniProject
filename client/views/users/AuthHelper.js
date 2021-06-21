// import { signout } from './ApiUsers'

const auth = {
  isAuthenticated() {
    console.log(typeof window)
    if (typeof window !== "undefined") {
      if (localStorage.getItem('userInfo'))
      return JSON.parse(localStorage.getItem('userInfo'))
    else return false
    }
    else return false
      
  }
}
//   authenticate(jwt, cb) {
//     if (typeof window !== "undefined")
//       sessionStorage.setItem('jwt', JSON.stringify(jwt))
//     cb()
//   },
  
//   clearJWT(cb) {
//     if (typeof window !== "undefined") 
//       sessionStorage.removeItem('jwt')
//     cb()
//     //optional
//     signout().then((data) => {
//       console.log(data)
//       document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
//     })
//   }
// }

export default auth
