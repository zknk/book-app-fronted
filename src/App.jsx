
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
// import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AuthProvider } from './Context/AuthContext'
// import { AuthProvide } from './context/AuthContext'
import { useEffect, useState } from 'react'
// import Loading from './components/Loading'




function App() {

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {

//     // const timer = setTimeout(() => {
//     //   setLoading(false);
//     // }, 2000); 

//     // Cleanup timer
//     // return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return <Loading />; 
//   }


  return (
    <>   
    <AuthProvider>
         <Navbar/>
         <main className='min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary'>
         <Outlet />
       </main>
       <Footer />
       </AuthProvider>
    </>
  )
}

export default App