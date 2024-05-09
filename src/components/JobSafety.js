import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from "@material-tailwind/react";
function JobSafety() {
    const currentDate = new Date();

    const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);
    const navigate = useNavigate();
    const handleOnClick = () => navigate('/haz');

    const testItems = [
        { id: 1, name: 'Hydro Test' },
        { id: 2, name: 'Fugitive Emission Test' },
        { id: 3, name: 'Validation Test' },
        { id: 4, name: 'Actuator Cycle Test' },
      ];
    
    return (
        <>
            <div className="bg-white py-24 sm:py-10 ">
                <div className=" px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-700 sm:text-l text-center ">JOB SAFETY ANALYSIS</h2>
                </div>

                <div className="flex py-24 jobsafetyResponsive">
                    <div className="flex-1 text-gray-700 text-center px-4 py-2 m-2 text-start">
                        <h1 className="font-bold text-xl px-2">Test Plan</h1>
                        <ul className="list-inside sm:list-outside md:list-inside lg:list-outside xl:list-inside list-decimal">
                            {testItems.map((item) => (
                                <li key={item.id}>{item.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1 text-gray-700 text-center px-4 py-2 m-2">
                        <h3>{formattedDate}</h3>
                    </div>
                </div>
            </div>
            <div className="flex w-max gap-4 float-right mr-10 nextbtn">
                <Button color="red" onClick={handleOnClick}>Next</Button>
            </div>
        </>
    )
}

export default JobSafety