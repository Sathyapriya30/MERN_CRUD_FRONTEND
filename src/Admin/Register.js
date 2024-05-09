import React, { useState } from 'react'
import { Button } from "@material-tailwind/react";
import { useNavigate, useParams } from 'react-router-dom';
import server from '../Route/server';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {

    const navigate = useNavigate();
    const { id } = useParams(); 
    //const handleOnClick = () => navigate('/dashboard');

    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    
    

    useEffect(() => { 
        setLoading(true);
        const fetchRegisterDetails = async () => {
            try { 
                const response = await server.get(`/fetch/${id}`);
                const { name, password, email,file } = response.data.documents;
                console.log(response.data.documents);
                setUsername(name);
                setPassword(password);
                setEmail(email);
                setFile(file);
                setFilePreview(file); // Set file preview
                //setPassword(''); // Clear password state
            } catch (error) {
            setUsername('');
            setPassword('');
            setEmail('');
            setFile(null);
                console.error('Error fetching Register details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRegisterDetails();
    }, [id]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
       // setFilePreview(URL.createObjectURL(selectedFile)); // Set file preview
    };


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    
    const handleOnClick = async () => {
        try {
            
            const formData = new FormData(); // Create a new FormData object
            formData.append('name', name);
            formData.append('password', password);
            formData.append('email', email);
            formData.append('file', file); 
            if (id) {
                // Perform update operation if ID is present
                //await server.put(`/update/${id}`, { name, password, email });
                // Perform update operation if ID is present
            await server.put(`/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
                }
            });

            } else {
                // Perform insert operation if ID is not present
               // await server.post('/insert', { name, password, email });
               await server.post('/insert', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
                }
            });
            }
         
            setUsername('');
            setPassword('');
            setEmail('');  
            setFile(null);
            setFilePreview(null); // Clear file preview

            if (id) {
            navigate('/visi');
            }else{
            navigate('/login');
            }
        } catch (error) {


            if (error.isAxiosError) {
                // Access the error response data
                const errorMessage = error.response.data.error;
                console.error('Error:', errorMessage);
                toast.error(errorMessage);
            } else {
                // If it's not an Axios error, log the original error
                console.error('Error:', error);
                toast.error(error);
            }

            

            //console.error('Error logging in:', error);
            //

            // Handle error (e.g., display error message to user)
        }
    };
    

    return (
        <>
            <div className="md:container md:mx-auto ">

                <div className="grid grid-cols-12 gap-4 loginResponsive">
                    <div className="col-start-2 col-span-4 ">

                        <div className="bg-white py-24 sm:py-10 place-items-center ">
                            <h4 className="block text-center mr-5 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 loginHead">
                             {id ? 'Edit Form' : 'Sign Up'} 
                            </h4>
                            <ToastContainer />

                            <form className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96 " enctype="multipart/form-data" >
                                <div className="flex flex-col gap-6 mb-1">
                                    <h6
                                        className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                                        User Name
                                    </h6>
                                    <div className="relative h-11 w-full min-w-[200px]">
                                        <input placeholder="Username" name="name" id="name" value={name} onChange={handleUsernameChange}
                                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                                        <label
                                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                    </div>


                                    <h6
                                        className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                                        Password
                                    </h6>
                                    <div className="relative h-11 w-full min-w-[200px]">
                                    {id ? 
                                    <input readonly  type="password" placeholder="********" name="password" id="password" value={password}   onChange={handlePasswordChange}
                                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                                       
                                            : 
                                    <input   type="password" placeholder="********" name="password" id="password" value={password} onChange={handlePasswordChange}
                                    className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                               
                                    }
                                         <label
                                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                    </div>

                                    <h6
                                        className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                                        Email
                                    </h6>
                                    <div className="relative h-11 w-full min-w-[200px]">
                                        <input placeholder="Email" name="email" id="email" value={email} onChange={handleEmailChange}
                                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                                        <label
                                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                    </div>


                                    <h6
                                        className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                                        File Upload
                                    </h6>
                                    <div className="relative h-11 w-full min-w-[200px]">
                                    <input type="file" name="file" id="file" onChange={handleFileChange}
                                        // Add any necessary event handlers if needed
                                        //onChange={(e) => setFile(e.target.files[0])} 
                                        className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                    />                           

                                <label  className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                    </div>
          {/* File Preview */}
{filePreview && (
    <div className="mt-4">
        <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">File Preview</h6>
        <img src={`http://localhost:4001/uploads/${filePreview}`} alt="Image" className="mt-2 w-32 h-32 rounded-lg object-cover" />
    </div>
)} 

<input type="text" name="file_old" id="file_old" value='${filePreview}' style={{ display: 'none' }} />

                                </div>

                                    

                                <div className="flex w-max gap-4 float-right  my-10 ">
                                  {/* <Button color="red" onClick={handleOnClick}>Sign In</Button> */}
                                  <Button color="red" onClick={handleOnClick}> {id ? 'Update' : 'Add User'}</Button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Register