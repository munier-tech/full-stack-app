import { Outlet } from 'react-router-dom'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

const MainPage = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <div className='mb-20'>
      <Header/>
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainPage
