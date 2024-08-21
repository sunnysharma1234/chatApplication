import React from 'react'
import MessageContainer from './MessageContainer'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
const HomePage = () => {
  const {selectedUser} = useSelector(store=>store.user)
  return (
    <div>
      {/* <h1>sunny</h1> */}
      <div className='h-full w-full p-8  flex gap-1 shadow-md bg-green-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100'>
<Sidebar></Sidebar>
<div className='divider lg:divider-horizontal'>
  
</div>
<MessageContainer user={selectedUser}></MessageContainer>
      </div>
    </div>
  )
}

export default HomePage
