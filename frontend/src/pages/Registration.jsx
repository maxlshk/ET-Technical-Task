import React from 'react'
import { Form, NavLink, useActionData, redirect } from 'react-router-dom'
import AnimatedLayout from './AnimatedLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Datepicker from "tailwind-datepicker-react"

const options = {
    inputNameProp: 'birthday',
    defaultDate: new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate()),
}

function Registration() {
    const [show, setShow] = useState(false)
    const [dateError, setDateError] = useState('')
    const handleChange = (selectedDate) => {
        if (selectedDate > new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate())) {
            setDateError('You must be at least 18 years old to register for an event.')
        } else {
            setDateError('')
        }
    }
    const handleClose = (state) => {
        setShow(state)
    }
    return (
        <section className='flex flex-1 p-8 flex-col'>
            <AnimatedLayout>
                <NavLink to='/' className='inline-flex items-center gap-x-3 text-black'>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <span className='text-2xl'>Back to Events</span>
                </NavLink>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full w-2/5 min-w-72">

                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Register htmlFor an Event
                            </h1>
                            <Form method='post' className="space-y-4 md:space-y-6" autoComplete='off'>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                                    <input type="text" name="name" id="name" placeholder="Max Loshak" minLength={5} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" minLength={5} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name.surname@gamil.com" required />
                                </div>

                                <div>
                                    <label htmlFor="birthday" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your birth date</label>
                                    <Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose} />
                                    {dateError && <p className="text-red-500 text-xs mt-1">{dateError}</p>}
                                </div>

                                <div>
                                    <label htmlFor="bordered-radio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Where did you hear about this event?</label>
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex items-center px-3 border border-gray-200 rounded dark:border-gray-700">
                                            <input id="bordered-radio-1" type="radio" value="Social Media" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                                            <label htmlFor="bordered-radio-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Social Media</label>
                                        </div>
                                        <div className="flex items-center px-3 border border-gray-200 rounded dark:border-gray-700">
                                            <input id="bordered-radio-2" type="radio" value="Friends" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                                            <label htmlFor="bordered-radio-2" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Friends</label>
                                        </div>
                                        <div className="flex items-center px-3 border border-gray-200 rounded dark:border-gray-700">
                                            <input id="bordered-radio-3" type="radio" value="Found Myself" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                                            <label htmlFor="bordered-radio-3" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Found Myself</label>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    disabled={dateError}
                                    className="w-full text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cayan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Create an account
                                </button>
                            </Form>
                        </div>
                    </div>
                </div>
            </AnimatedLayout>
        </section>
    )
}

export default Registration

export async function action({ request, params }) {

    const data = await request.formData();
    let authData = {};

    authData = {
        fullName: data.get('name'),
        email: data.get('email'),
        dateOfBirth: data.get('birthday'),
    };

    const referralSource = data.get('bordered-radio');
    if (referralSource) {
        authData.referralSource = referralSource;
    }

    console.log(authData);

    // const responseCreateUser = await fetch('http://localhost:5000/users', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(authData),
    // });

    // if (responseCreateUser.status === 422 || responseCreateUser.status === 401) {
    //     return responseCreateUser;
    // }

    // if (!responseCreateUser.ok) {
    //     throw json({ message: 'Could not register participant.' }, { status: 500 });
    // }

    // const resData = await responseCreateUser.json();
    // const userId = resData._id;

    // const responseAddParticipant = await fetch(`http://localhost:5000/events/${params.id}/participants/${userId}`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // });

    // if (responseAddParticipant.status === 422 || responseAddParticipant.status === 401) {
    //     return responseAddParticipant;
    // }

    // if (!responseAddParticipant.ok) {
    //     throw json({ message: 'Could not add participant to event.' }, { status: 500 });
    // }

    return redirect('/');
}