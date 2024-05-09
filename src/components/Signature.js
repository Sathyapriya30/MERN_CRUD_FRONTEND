import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useNavigate } from 'react-router-dom';
import { Button } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import '../assets/hazard.css';
import '../assets/signaturecanvas.css';
import Clock from 'react-live-clock';
function Signature() {

    const navigate = useNavigate();
    const handleOnClick = () => navigate('/visi');

    const signatureCanvas = useRef();

    const [signatureData, setSignatureData] = useState('');


    const clearSignature = () => {
        signatureCanvas.current.clear();
        setSignatureData('');
    };


    const getSignatureData = () => {
        const data = signatureCanvas.current.getTrimmedCanvas().toDataURL('image/png');
        setSignatureData(data);
    };

    const handleSubmit = () => {

        console.log('Submitting signature data:', signatureData);


    };
    return (
        <>
            <div class="md:container md:mx-auto ">
                <div className="bg-white py-24 sm:py-10 place-items-center hazard">
                    <div className=" px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-700 sm:text-l text-center ">Signature</h2>
                    </div>
                    <div class="flex justify-items-center inline-flex items-baseline signature">

                        <div class="flex-1 text-gray-700  px-4 py-2 m-2 text-start   ">
                            <table className=' table-auto text-left'>
                                <tr>
                                    <td>
                                        Name
                                    </td>
                                    <td>
                                        <div className=" mx-10 my-5">
                                            <Input label="Name" className='inputwidth' />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Signature
                                    </td>
                                    <td>
                                        <SignatureCanvas
                                            ref={signatureCanvas}
                                            penColor="black"
                                            canvasProps={{ className: 'signaturecanvas mx-10 my-5' }}
                                        />
                                        <Button color="cyan" className='my-2 clearbtn' onClick={clearSignature}>Clear Signature</Button>

                                        <Button color="cyan" className='my-2 getbtn' onClick={getSignatureData}>Get Signature </Button>
                                       
                                    </td>

                                </tr>

                                <tr>
                                <td>
                                    Time stamp
                                </td>
                                <td>
                                    <div className="flex  gap-4 mx-10">
                                        <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Kolkata'} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                </td>
                                <td>
                                    <div className="flex  gap-4 mx-10">
                                        <Button color="cyan" onClick={handleSubmit}>Submit </Button>
                                    </div>
                                </td>

                            </tr>
                        </table>


                        <div>


                        </div>

                    </div>

                </div>
            </div>
            <div className="flex gap-4  mr-10 my-10 nextbtn">
                <Button color="red" onClick={handleOnClick}>Next</Button>
            </div>
        </div >
        </>
    )
}

export default Signature