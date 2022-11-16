import React, { useState } from 'react'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar'

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overfow-hidden">
       
       {/* SIDEBER */}
       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

       {/* CONTENT */}
       <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

          {/* HEADER */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
          <main>
            {/* WELCOME BANNER */}

          </main>
       </div>
    </div>
  )
}

export default Dashboard