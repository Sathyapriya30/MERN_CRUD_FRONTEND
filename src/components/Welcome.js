import React from 'react'
import '../assets/welcome.css';
import { Button } from "@material-tailwind/react";
import {useNavigate} from 'react-router-dom';
function Welcome() {
    
    const navigate = useNavigate();
    const handleOnClick = () => navigate('/con');
    return (
        <>
            <div className="mx-auto max-w-screen-xxl px-4 py-2 welcomebody">
                <div class="animated-title">
                    <div class="text-top ">
                        <div>
                            <span className='welcomeText my-5'>Welcome to </span>
                            <span className='my-5'>Bray India R&D Lab </span>
                        </div>
                    </div>

                </div>
            </div>
            <div className="flex w-max gap-4 float-right mr-10 nextbtn">
                <Button color="red" onClick={handleOnClick}>Next</Button>
            </div>
        </>
    )
}

export default Welcome