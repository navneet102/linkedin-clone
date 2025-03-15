import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from "./components/layout/Layout";
import HomePage from './pages/HomePage';
import SignUpPage from './pages/auth/SignUpPage';
import LoginPage from './pages/auth/LoginPage';
import { Toaster, toast } from 'react-hot-toast';
import {useQuery} from "@tanstack/react-query";
import { axiosInstance } from './lib/axios';


function App() {


  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],  // This is used for getting this data elsewhere without calling this again and again
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) {
          return null;
        }
        toast.error(err.response.data.message || "Something went wrong");
      }
    }
  });

  if(isLoading) return null; //To stop flickering effect when switching to pages by navigate method

  return (<Layout>
    <Routes>
      <Route path='/' element={authUser ? <HomePage /> : <Navigate to={"/login"}/>} />
      <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={"/"}/>} />
      <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"}/>} />
    </Routes>
    <Toaster />
  </Layout>
  )
}

export default App;
