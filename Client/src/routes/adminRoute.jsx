import {  Route, Routes } from 'react-router-dom'

import AdminHome from '../pages/admin/AdminHome'
import AdminLogin from '../pages/admin/AdminLogin'

const AdminRoute = () => {
    return (
        
            <Routes>
               
                    <Route path="/" element={<AdminHome />} />
                    <Route path="/login" element={<AdminLogin  />} />
                        
            
             
            </Routes>
    
    )
}

export default AdminRoute