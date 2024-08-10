// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, AuthContext } from './components/contexts/AuthContext';
// import StaticRoutes from './components/routes/StaticRoutes';
// import UserRoutes from './components/routes/UserRoutes';
// import ProductPartnerRoutes from './components/routes/ProductPartnerRoutes';
// import AdminRoutes from './components/routes/AdminRoutes';

// function App() {
//   return (
//     <AuthProvider>

//         <AuthContext.Consumer>
//           {({ isLoggedIn, userRole }) => (
//             <Routes>
//               <Route path="/*" element={<StaticRoutes />} />
              
//               {/* User Routes */}
//               {isLoggedIn && userRole === 'USER' && (
//                 <Route path="/user/*" element={<UserRoutes />} />
//               )}

//               {/* Product Partner Routes */}
//               {isLoggedIn && userRole === 'PRODUCTPARTNER' && (
//                 <Route path="/productpartner/*" element={<ProductPartnerRoutes />} />
//               )}

//               {/* Admin Routes */}
//               {isLoggedIn && userRole === 'ADMIN' && (
//                 <Route path="/admin/*" element={<AdminRoutes />} />
//               )}

//               {/* Redirect to home if not logged in or not matching roles */}
//               {!isLoggedIn && <Route path="/user/*" element={<Navigate to="/" />} />}
//               {!isLoggedIn && <Route path="/productpartner/*" element={<Navigate to="/" />} />}
//               {!isLoggedIn && <Route path="/admin/*" element={<Navigate to="/" />} />}
//               {!isLoggedIn && <Route path="*" element={<Navigate to="/" />} />}
//             </Routes>
//           )}
//         </AuthContext.Consumer>

//     </AuthProvider>
//   );
// }

// export default App;


import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './components/contexts/AuthContext';
import StaticRoutes from './components/routes/StaticRoutes';
import UserRoutes from './components/routes/UserRoutes';
import ProductPartnerRoutes from './components/routes/ProductPartnerRoutes';
import AdminRoutes from './components/routes/AdminRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const { isLoggedIn, userRole } = useAuth();

  return (
    <>
    <Routes>
      {/* Static Routes for unauthenticated or logged-in users */}
      {!isLoggedIn ? (
        <Route path="/*" element={<StaticRoutes />} />
      ) : (
        <>
          {/* Redirect based on user roles */}
          {userRole === 'ADMIN' && (
            <Route path="/admin/*" element={<AdminRoutes />} />
          )}
          {userRole === 'PRODUCT_PARTNER' && (
            <Route path="/product_partner/*" element={<ProductPartnerRoutes />} />
          )}
          {userRole === 'USER' && (
            <Route path="/user/*" element={<UserRoutes />} />
          )}
          {/* Default route to redirect logged-in users to their respective routes */}
          <Route path="/*" element={<Navigate to={`/${userRole.toLowerCase()}`} />} />
        </>
      )}
      {/* Default route for unmatched paths */}
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
    <ToastContainer />

    </>
    
  );
};

export default App;

