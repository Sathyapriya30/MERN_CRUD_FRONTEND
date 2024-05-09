import React, { useState } from 'react';
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import './dashboard.css';
export function JobSafetyAdmin() {

    const [inputFields, setInputFields] = useState([{ id: 1, value: '' }]);

    const handleAddField = () => {
        setInputFields([...inputFields, { id: inputFields.length + 1, value: '' }]);
    };

    const handleInputChange = (id, event) => {
        const newInputFields = inputFields.map((field) => {
            if (field.id === id) {
                return { ...field, value: event.target.value };
            }
            return field;
        });
        setInputFields(newInputFields);
    };
    return (
        <>
            <div className="container mx-auto mt-8">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-700 sm:text-l text-center ">Add Job Safety Analysis</h2>
                </div>
                <div class="flex justify-items-center inline-flex items-baseline dashboardJobSafety">

                    <div class="flex-1 text-gray-700  px-4 py-2 m-2 text-start ">
                        <form>
                            {inputFields.map((field) => (
                                <div key={field.id} className='my-2'>
                                    <Input
                                        type="text"
                                        className="p-y "
                                        label={`Test Plan${field.id}`}
                                        value={field.value}
                                        onChange={(event) => handleInputChange(field.id, event)}
                                    />
                                </div>
                            ))}

                            <Button
                                className="bg-blue-500 text-white p-2 rounded"
                                onClick={handleAddField}
                            >
                                Add Test Plan
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}


export function HazardAdmin() {
    const [inputFields, setInputFields] = useState([{ id: 1, value: '', image: null }]);

    const handleAddField = () => {
        setInputFields([...inputFields, { id: inputFields.length + 1, value: '', image: null }]);
    };

    const handleInputChange = (id, event) => {
        const newInputFields = inputFields.map((field) => {
            if (field.id === id) {
                return { ...field, value: event.target.value };
            }
            return field;
        });
        setInputFields(newInputFields);
    };

    const handleImageChange = (id, event) => {
        const newInputFields = inputFields.map((field) => {
            if (field.id === id) {
                return { ...field, image: event.target.files[0] };
            }
            return field;
        });
        setInputFields(newInputFields);
    };
    return (
        <>
            <div className="container mx-auto mt-8">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-700 sm:text-l text-center ">Add Hazards Involved</h2>
                </div>
                <div class="flex justify-items-center inline-flex items-baseline dashboardHazard">

                    <div class="flex-1 text-gray-700  px-4 py-2 m-2 text-start ">
                        <form>
                            {inputFields.map((field) => (
                                <div key={field.id} className="flex items-center gap-10 my-2 justify-items-center inline-block dashhazard">
                                    <Input
                                        type="text"
                                        className="border p-2 inputdashboardhazard"
                                        label={`Hazard ${field.id}`}
                                        value={field.value}
                                        onChange={(event) => handleInputChange(field.id, event)}
                                    />

                                    <span className='inputdashboardhazardAlign'>

                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
                                            Logo
                                        </label>
                                        <input
                                            className="inputdashboardhazard block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mt-2"
                                            id="file_input"
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) => handleImageChange(field.id, event)}
                                        />

                                    </span>

                                </div>
                            ))}

                            <Button

                                className="bg-blue-500 text-white p-2 rounded"
                                onClick={handleAddField}
                            >
                                Add Hazard
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export function Dashboard() {




    const data = [
        {
            label: "Job Safety Analysis",
            value: "JobSafetyAnalysis",
            desc: <JobSafetyAdmin />,
        },
        {
            label: "Hazard",
            value: "Hazard",
            desc: <HazardAdmin />,
        },

    ];
    return (
        <Tabs value="JobSafetyAnalysis" activeIndex={data.findIndex(item => item.value === "JobSafetyAnalysis")}>
            <TabsHeader>
                {data.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                        <div className="flex items-center gap-2">

                            {label}
                        </div>
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody>
                {data.map(({ value, desc }) => (
                    <TabPanel key={value} value={value}>
                        {desc}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}