import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Input } from "@material-tailwind/react";
import HighPressure from '../assets/images/hazardImage/HighPressure.png';
import HighTemperature from '../assets/images/hazardImage/HighTemperature.png';
import LowTemperature from '../assets/images/hazardImage/LowTemperature.png';
import CryogenicTesting from '../assets/images/hazardImage/LowTemperature.png';
import Slips from '../assets/images/hazardImage/Slips.png';
import SuffocationPotential from '../assets/images/hazardImage/SuffocationPotential.png';
import OverheadCrane from '../assets/images/hazardImage/OverheadCrane.png';
import ElectricalHazard from '../assets/images/hazardImage/ElectricalHazard.png';
import '../assets/hazard.css';


import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
} from "@material-tailwind/react";
import { Checkbox } from 'semantic-ui-react'
function Hazards() {

    const navigate = useNavigate();
    const handleOnClick = () => navigate('/dec');

    const hazardOptions = [
        { label: 'High Pressure', imageSrc: HighPressure },
        { label: 'High Temperature', imageSrc: HighTemperature },
        { label: 'Low Temperature', imageSrc: LowTemperature },
        { label: 'Cryogenic Testing', imageSrc: CryogenicTesting },
        { label: 'Slips, Trips, Falls', imageSrc: Slips },
        { label: 'Suffocation Potential', imageSrc: SuffocationPotential },
        { label: 'Overhead Crane', imageSrc: OverheadCrane },
        { label: 'Electrical Hazard', imageSrc: ElectricalHazard },
    ];
    return (
        <>
            <div className="bg-white py-24 sm:py-10 place-items-center hazard">
                <div className=" px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-700 sm:text-l text-center ">Hazards Involved</h2>
                </div>


                <div className="flex flex-wrap justify-center hazardResponsive">
                    {hazardOptions.map((option, index) => (
                        <Card key={index} className="w-96  mb-4">
                            <List>
                                <ListItem>
                                    <div className='hazardDistance '>
                                        <Typography variant="h6" color="blue-gray">
                                            <Checkbox label={<label>{option.label}</label>} />
                                        </Typography>
                                    </div>
                                    <ListItemPrefix>
                                        <Avatar variant="square" size="lg" alt="candice" src={option.imageSrc} />
                                    </ListItemPrefix>
                                </ListItem>
                            </List>
                        </Card>
                    ))}
                </div>
            </div>
            <div className="flex gap-4 float-right mr-10 my-10 nextbtn">
                <Button color="red" onClick={handleOnClick}>Next</Button>
            </div>
        </>
    )
}

export default Hazards