import {useEffect, useRef, useState} from "react";
import Modal from 'react-modal';
import './signUpModal.styles.scss'
import {useForm} from "react-hook-form";

const SignUp = ({ onSubmit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [requestError, setRequestError] = useState('')

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '4px',
            width: '500px',
            height: '300px'
        },
    };
    const openModal = () => {
        setIsModalOpen(true);
    };

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const onModalSubmit = async (e) => {
        const res = await fetch('http://78.137.54.103:4000/user', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(e)
        })
        const resBody = await res.json()
        if (resBody.status === 'Error') {
            setRequestError(resBody.message)
            return
        }
        closeModal()
        onSubmit(resBody.message.token)
    }

    return (
        <div>
            <div className='sign-up-button' onClick={openModal}>
                Sign up
            </div>
            <div className='modal'>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Options Modal"
                    style={customStyles}
                    ariaHideApp={false}
                >
                    <div>
                        <h1 className='login-header'>
                            Sign up
                        </h1>
                    </div>
                    <form onSubmit={handleSubmit(onModalSubmit)}>
                        <div className='login-input--name'>Email:</div>
                        <div className='input-with-label'>
                            <input className='login-input' {...register('email', {required: true})}/>
                        </div>
                        <div className='login-input--name'>Username:</div>
                        <div className='input-with-label'>
                            <input className='login-input' {...register('username', {required: true})}/>
                        </div>
                        <div className='login-input--name'>Password:</div>
                        <div className='input-with-label'>
                            <input className='login-input' type='password' {...register('password', {required: true})}/>
                        </div>
                        <button type='submit' className='button--text'>
                            Login!
                        </button>
                    </form>
                    {requestError.length > 0 ? <div>{requestError}</div> : null}
                </Modal>
            </div>
        </div>
    );
};

export default SignUp