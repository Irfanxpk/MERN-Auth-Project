import {  Route, Routes } from 'react-router-dom'

import AdminHome from '../pages/admin/AdminHome'

const AdminRoute = () => {
    return (
        
            <Routes>
               
                    <Route path="/" element={<AdminHome />} />

            
             
            </Routes>
    
    )
}

export default AdminRoute