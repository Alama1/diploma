import {useEffect, useRef, useState} from "react";
import Modal from 'react-modal';
import './artUploadModal.styles.scss'
import {useForm} from "react-hook-form";
import Select from "react-select";

const ArtUpload = ({ onSubmit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [requestError, setRequestError] = useState('')
    const [typeSelected, setTypeSelected] = useState('Painting')
    const [phase, setPhase] = useState(1)
    const [artInfo, setArtInfo] = useState({})
    const [rawArtInfo, setRawArtInfo] = useState({})

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
            height: '550px'
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
        e.type = typeSelected
        e.token = localStorage.getItem('token')
        setRawArtInfo(e)
        const res = await fetch('http://78.137.54.103:4000/artwork', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(e)
        })
        const resBody = await res.json()
        if (resBody.status === 'Success!') {
            setPhase(2)
            setArtInfo(resBody.message)
        }
    }

    const regenerateCaption = async () => {
        const res = await fetch('http://78.137.54.103:4000/artwork', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(rawArtInfo)
        })
        const resBody = await res.json()
        if (resBody.status === 'Success!') {
            setPhase(2)
            setArtInfo(resBody.message)
        }
    }

    const confirmArtwork = async () => {
        const res = await fetch('http://78.137.54.103:4000/confirm-artwork', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({token: artInfo.token})
        })
        if (res.status === 201) {
            alert('Artwork uploaded!')
            setPhase(1)
            setRequestError('')
            setArtInfo({})
            closeModal()
        }
        if (res.status === 428) {
            const response = await res.json()
            setRequestError(response.message)
        }
    }

    const artworkTypes = [
        {
            label: 'Photo',
            value: 'Photo'
        },
        {
            label: 'Artwork',
            value: 'Artwork'
        },
        {
            label: 'AI-generated',
            value: 'AI-generated'
        },
        {
            label: 'Screenshot',
            value: 'Screenshot'
        },
        {
            label: "GIF",
            value: "GIF"
        }
    ]

    const onTypeChanged = (e) => {
        setTypeSelected(e.value)
    }

    return (
        <div>
            <div className='upload-button--title' onClick={openModal}>
                Upload art
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
                            Upload artwork
                        </h1>
                    </div>
                    {phase === 1 ?

                        <form className='upload-modal' onSubmit={handleSubmit(onModalSubmit)}>
                            <div className='upload-input--name'>URL:</div>
                            <div className='input-with-label'>
                                <input className='login-input' {...register('url', {required: true})}/>
                            </div>
                            <div className='upload-input--name'>genre:</div>
                            <div className='input-with-label'>
                                <input className='login-input' {...register('genre', {required: true})}/>
                            </div>
                            <div className='upload-input--name'>type:</div>
                            <Select placeholder='Painting' className='sorting-dropdown-selector' onChange={onTypeChanged} options={artworkTypes}/>
                            <div className='upload-input--name'>author (full name):</div>
                            <div className='input-with-label'>
                                <input className='login-input' {...register('author', {required: true})}/>
                            </div>
                            <button type='submit' className='button--text'>
                                Check!
                            </button>
                        </form>: null
                    }
                    {
                        phase === 2 ?
                            <div>
                                <img src={artInfo.url} width='500px' height='auto'/>
                                <div>
                                    Caption: {artInfo.caption}
                                </div>
                                <div className='confirm-work-button'>
                                    <div className='confirm-work-button--confirm' onClick={confirmArtwork}>
                                        Confirm!
                                    </div>
                                    <div className='confirm-work-button--regenerate' onClick={regenerateCaption}>
                                        Regenerate!
                                    </div>
                                </div>
                            </div> : null
                    }
                    {requestError.length > 0 ? <div style={{backgroundColor: '#ffd2d2', marginTop: '10px'}}><div style={{paddingLeft: '5px'}}>{requestError}</div></div> : null}
                </Modal>
            </div>
        </div>
    );
};

export default ArtUpload