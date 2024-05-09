import React, { useEffect, useState } from 'react';
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
    List,
    ListItem,

} from "@material-tailwind/react";
import { Routes, Route } from "react-router-dom";
import {

    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

import Logo from './images/bray.png'
import Welcome from "../components/Welcome";

import { useNavigate } from 'react-router-dom';
import JobSafety from "../components/JobSafety";
import Hazards from "../components/Hazards";
import Declaration from "../components/Declaration";
import Signature from "../components/Signature";
import Visitordetails from "../components/Visitordetails";
import Register from "../Admin/Register";
import Login from "../Admin/Login";
import { Dashboard } from "../Admin/Dashboard";


function NavList() {

    const navigate = useNavigate();

    const [isLoggedIn, setLoggedIn] = useState(false);

    const handleRegister = () => {
        setLoggedIn(true);
        navigate('/register');
    };

    const handleLogin = () => {
        setLoggedIn(true);
        navigate('/login');
    };

    const handleLogout = () => {
        navigate('/');
        setLoggedIn(false);
    };

    const handleList = () => {
        navigate('/visi');
        setLoggedIn(false);
    };

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        console.log(userId,'work');

    }, [navigate]);

    return (
        <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
            <Typography
                as="a"
                variant="small"
                color="blue-gray"
                className="font-medium "
            >
                {isLoggedIn ? (
                    
                    <ListItem className="flex items-center gap-2 py-2 pr-4" onClick={handleLogout}>
                        Home
                    </ListItem>
                ) : (
                    <div style={{display:'flex'}}>
                        
                    <ListItem className="flex items-center gap-2 py-2 pr-4" onClick={handleRegister}>
                        Sign Up
                    </ListItem>
                    <ListItem className="flex items-center gap-2 py-2 pr-4" onClick={handleLogin}>
                        Sign In
                    </ListItem>
                    
                    {/* <ListItem className="flex items-center gap-2 py-2 pr-4" onClick={handleList}>
                        List
                    </ListItem> */}
                </div>
                )}
            </Typography>

        </List>
    );
}

export function Header() {


    const navigate = useNavigate();
    const handleOnClick = () => navigate('/');




    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    return (
        <>
            <Navbar className="sticky bg-white top-0 z-10 max-w-full mx-auto rounded-none px-4 py-2 lg:px-4 lg:py-1 h-[70px]">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <img
                        onClick={handleOnClick}
                        className="mr-4 cursor-pointer  lg:ml-2 w-[100px] h-[60px]"
                        src={Logo}
                    >
                    </img>
                    <div className="hidden lg:block">
                        <NavList />
                    </div>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        className="lg:hidden"
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                        ) : (
                            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                        )}
                    </IconButton>
                </div>
                <Collapse open={openNav}>
                    <NavList />
                </Collapse>
            </Navbar>


            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/con" element={<JobSafety />} />
                <Route path="/haz" element={<Hazards />} />
                <Route path="/dec" element={<Declaration />} />
                <Route path="/sig" element={<Signature />} />
                <Route path="/visi" element={<Visitordetails />} />
                <Route path="/register" element={<Register />} />
                <Route path="/register/:id" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes></>
    );
}