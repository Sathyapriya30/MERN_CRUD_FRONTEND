import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from "@material-tailwind/react";

import '../assets/hazard.css';

function Declaration() {

    const navigate = useNavigate();
    const handleOnClick = () => navigate('/sig');
    return (
        <>


            <div className="bg-white py-24 sm:py-10 ">
                <div className=" px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-700 sm:text-l text-center ">Declaration</h2>
                </div>

                <div className="flex py-4  Declaration_list">
                    <div className="flex-1 text-gray-700 text-center px-4 py-2 m-2 text-start">
   
                        <ul class=" space-y-1 text-gray-900 list-none list-inside ">
                            <li>
                                <input type="checkbox" class="accent-pink-500" /> I understand the hazards involved in this JSA.
                            </li>
                            <li>
                                <input type="checkbox" class="accent-pink-500" /> I understand that performing steps outside of approved procedures may pose hazards that have not been evaluated nor authorized.
                            </li>
                            <li>
                                <input type="checkbox" class="accent-pink-500" /> I will contact the person who authorized my work prior to continuing, if the scope of work changes or new hazards are introduced.
                            </li>
                            <li>
                                <input type="checkbox" class="accent-pink-500" /> I understand my stop work authority and responsibility.
                            </li>
                            <li>
                                <input type="checkbox" class="accent-pink-500" /> I understand that only trained and qualified personnel are authorized to operate test equipment.
                            </li>

                        </ul>
                    </div>
                  
                </div>
            </div>
            <div className="flex w-max gap-4 float-right mr-10 nextbtn">
                <Button color="red" onClick={handleOnClick}>Next</Button>
            </div>
          
        </>
    )
}

export default Declaration