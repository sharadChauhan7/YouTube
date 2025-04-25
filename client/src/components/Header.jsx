import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function Header() {
    const navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user'));
    function handleLogout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        navigate('/');
    }
    const[showLogout, setShowLogout] = React.useState(false);
  return (

    <div className='flex justify-between items-center bg-black p-4'>
      <div className='flex items-center'>

        <p className='text-white text-2xl mr-4'>
         <MenuIcon className = "px-2 text-white text-4xl" fontSize='3rem'/>
        </p>
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png" alt="logo" className='h-10 w-10' />
        <h1 onClick={()=>{navigate('/')}} className='text-white text-2xl font-bold ml-2'>YouTube</h1>
      </div>
      <input type="text" placeholder='Search' className='p-2 rounded-md bg-white w-1/3' />
        <div className='flex items-center'>
            {user ? (
                <>
            <div className='flex items-center' onClick={() => setShowLogout(!showLogout)}>
                <AccountCircleIcon fontSize='large' className='text-white'/>
                <p className='text-white ml-2'>{user.name}</p>
            </div>
            {showLogout && (
            <div className='flex flex-col bg-white absolute top-16 right-4 p-4 rounded-md shadow-lg'>
                <button onClick={handleLogout} className='  px-2 text-black'>Logout</button>
                <button onClick={() => setShowLogout(false)} className=' px-2 text-black'>Cancel</button>
            </div>) }</>

            ) : (
            <button onClick={() => navigate('/login')} className='bg-red-600 text-white px-4 py-2 rounded-md'>Login</button>
            )}
        </div>
    </div>

  )
}

export default Header