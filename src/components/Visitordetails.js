import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@material-tailwind/react";
import { Card,Typography } from "@material-tailwind/react";
import '../assets/hazard.css';
import server from '../Route/server';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TABLE_HEAD = ["Sl no","Name", "Email","Image","Action"];//, "Password"
/*
const TABLE_HEAD = ["Name", "Job", "Employed"];

const TABLE_ROWS = [
    {
        name: "John Michael",
        job: "Manager",
        date: "23/04/18",
    },
    {
        name: "Alexa Liras",
        job: "Developer",
        date: "23/04/18",
    },
    {
        name: "Laurent Perrier",
        job: "Executive",
        date: "19/09/17",
    },
    {
        name: "Michael Levi",
        job: "Developer",
        date: "24/12/08",
    },
    {
        name: "Richard Gran",
        job: "Manager",
        date: "04/10/21",
    },
];*/
function Visitordetails() {

    const navigate = useNavigate();
    const handleOnClick = () => navigate('/sig');

     // Check if userId is present in localStorage
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/login'); // Redirect to login page if userId is not present
        }
    }, [navigate]);


    const [RegisterDetails, setRegisterDetails] = useState([]);
    
    console.log(RegisterDetails);

    useEffect(() => {
        // Fetch Register details from the backend server
        const fetchRegisterDetails = async () => {
            try {
                const response = await server.get('/fetch');
                setRegisterDetails(response.data.documents);
              //  console.log(response.data);
            } catch (error) {
                console.error('Error fetching Register details:', error);
            }
        };

        fetchRegisterDetails();
    }, []);

    const handleDelete = async ({ _id }) => {
        try {
            // Send a request to delete the Register with the given id
            await server.put(`/delete/${_id}`);
            
            // Remove the deleted Register from the state
            setRegisterDetails(RegisterDetails.filter(register => register._id !== _id));
            
            console.log('Deleted successfully');
            toast.success('Deleted successfully');
        } catch (error) {
            console.error('Error deleting Register:', error);
                toast.error(error);
        }
    };

    const handleLogout = async () => {
        try {
            // Make a GET request to the logout endpoint
            const response = await server.get('/logout');
            console.log(response.data); // Logs the response message
            // Optionally, you can handle the response here
            localStorage.removeItem('userId');
        
            navigate('/login');
          
        } catch (error) {
            console.error('Error logging out:', error);
            // Optionally, you can handle the error here
        }
    };

    return (
        <>
            <div className="bg-white py-24 sm:py-10 place-items-center hazard">
                <div className="px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-700 sm:text-l text-center ">User Details</h2><ToastContainer />
                </div>
                <button onClick={handleLogout}>Logout</button>
                <p>Welcome, {localStorage.getItem('userId')}</p>

                <div className="flex justify-items-center inline-flex items-baseline Visitordetails">

                    <div className="flex-1 text-gray-700  px-4 py-2 m-2 text-start  inline-flex items-baseline ">

                        <Card className="h-full w-full overflow-scroll">
                            <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                    <tr>
                                        {TABLE_HEAD.map((head) => (
                                            <th
                                                key={head}
                                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4" >
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal leading-none opacity-70">
                                                    {head}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                {RegisterDetails.length === 0 ? (
        <tr>
            <td className="p-4 border-b border-blue-gray-50 text-center" colSpan="4">
                No Record Found
            </td>
        </tr>
    ) : (
        RegisterDetails.map(({ _id,name, password, email,file }, index) => {
            const sl_no = index + 1;
                                        const isLast = index === RegisterDetails.length - 1;
                                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={_id}>

                                                <td className={classes}>
                                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                                            {sl_no}
                                                        </Typography>
                                                    </td>
                                                
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal">
                                                        {name}
                                                    </Typography>
                                                </td>

                                                {/* <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal">
                                                        {password}
                                                    </Typography>
                                                </td> */}

                                                <td>
                      
                            <img  src={`http://localhost:4001/uploads/${file}`}alt="No Image" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                   
                    </td>

                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal">
                                                        {email}
                                                    </Typography>
                                                </td>

                                                <td className={classes} style={{ paddingRight: '8px' }}>
                                                
            
                                                <Link to={`/register/${_id}`}><Button color="blue" >Edit</Button></Link>&nbsp;&nbsp;&nbsp;

                                                    <Button color="red" onClick={() => handleDelete({ _id })} >Delete</Button>
                                                </td>

                                            </tr>
                                        );
                                    })
                                    )}
                                </tbody>
                            </table>
                        </Card>

                    </div>



                </div>
            </div>
            <div className="flex w-max gap-4 float-right mr-10 my-10 nextbtn">
                <Button color="red" onClick={handleOnClick}>Next</Button>
            </div>
        </>
    )
}

export default Visitordetails