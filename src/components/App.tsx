import './App.css';

import { Routes,Route, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../context/useAuth';
//import Login from '../pages/Login';
import ProtectedLayout from './layouts/ProtectedLayout';
import UserLayout from './layouts/UserLayout';
import UserProfileOverview from '../pages/UserProfile/UserProfileOverview';
// import PageNotFound from '../pages/PageNotFound';
import Home from '../pages/Home';
import HomeLayout from './layouts/HomeLayout';
import PrivateRoutes from '../utilities/PrivateRoutes';
import PageNotFound from '../pages/PageNotFound';
import UserProfile from './user/UserProfile';
import Error from '../pages/Error';
import LoginCallback from './LoginCallback';
import LogoutCallback from './LogoutCallback';
import AccessDeniedLayout from './layouts/AccessDeniedLayout';
import { UserList } from '../pages/UserList/UserList';
import { ApiScopes } from '../pages/ApiScopes/ApiScopes';
import { ManageApiScope } from '../pages/ManageApiScope/ManageApiScope';
import { UserRoleList } from '../pages/RoleList/RoleList';
import { UserRole } from '../pages/ManageRole/ManageRole';
import { ClientDisplay } from '../pages/ClientDisplayList/ClientDisplay';
import { ManageClient } from '../pages/ManageClient/ManageClient';
import { Address } from '../pages/Address/Address';
import { ApiResourcesList } from '../pages/ApiResourcesList/ApiResourcesList';
import {ManageApiResource} from '../pages/ManageApiResource/ManageApiResource';

function App() {
  
  return (
   // <AuthProvider>
   //    <Routes>
   //       <Route element={ <HomeLayout/> }>
   //          <Route path='/' element={ <Home/> }/>
   //          <Route path='login' element={ <Login/> }/>
   //          <Route path='signin-callback' element={ <LoginCallback/>}/>
   //          <Route path='signout-callback' element={ <LogoutCallback/>}/>
   //       </Route>

   //       <Route path='error' element={ <Error/> }></Route>

   //       <Route element={ <ProtectedLayout/> }>
   //          <Route path='user' element={ <UserLayout/> } >
   //             <Route index element={ <UserProfileOverview/> }/>
   //             <Route path='me' element={ <UserProfileOverview/> }/>
   //             <Route path='lists' element={ <ListUser/> }/>
   //          </Route>
   //          <Route path='*' element={ <PageNotFound /> }/>
   //       </Route>

   //       <Route path='access-denied' element={ <AccessDeniedLayout/> }>
   //       </Route>
   //    </Routes>
   // </AuthProvider>
   <AuthProvider>
   <Router>
      <Routes>
          <Route element={<HomeLayout/>}>
             <Route path='/' element={ <Home /> } />
             <Route path='signin-callback' element={ <LoginCallback/>}/>
             <Route path='signout-callback' element={ <LogoutCallback/>}/>
          </Route>

            <Route element={<ProtectedLayout />}>
               <Route path='user' element={<UserLayout />} >
                  <Route index element={<UserProfileOverview />} />
                  <Route path=':userId' element={<UserProfileOverview />} />
                  <Route path='list' element={ <UserList/> }/>
               </Route>
               <Route path='operation'>
                  <Route path='apiscope' element={ <ApiScopes/> }/>
                  <Route path='manageApiScope/:apiScopeId' element={ <ManageApiScope/> }/>
                  <Route path='roleList' element={ <UserRoleList/> }/>
                  <Route path='manageRole/:roleId' element={ <UserRole/> }/>
                  <Route path='clients' element={ <ClientDisplay/> } />
                  <Route path='client/:clientId' element={ <ManageClient/> }/>
                  <Route path='address' element={ <Address/> }/>
                  <Route path='apiResourceList' element={<ApiResourcesList/>}/>
                  <Route path='apiResourceList/resource/:apiResourceId' element={<ManageApiResource/>}/>
               </Route>
            </Route>

          <Route path='error' element={ <Error/> }></Route>

         {/* <Route element={<PrivateRoutes />}>
            <Route path='user' element={ <UserProfile/> }/>
         </Route> */}

         <Route element={<PageNotFound />} path="not-found" />

         <Route path='access-denied' element={ <AccessDeniedLayout/> }></Route>
      </Routes>
   </Router>
   </AuthProvider>
     
   
  );
}

export default App;
