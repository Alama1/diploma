import './dropDownMenu.style.scss'
import dropDownIcon from '../../assets/dropdown.svg'
import {useEffect, useRef, useState} from "react";
import Modal from 'react-modal';

const DropDownMenu = ({ options, onSelect, text }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const buttonRef = useRef(null);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '4px'
        },
    };
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onSelect(option);
        closeModal();
    };

    return (
        <div>
            <div className="dropdown-toggle" onClick={openModal}>
                {text} <img alt='dropdown icon' src={dropDownIcon} className='dropdown-icon'/>
            </div>
            <div className='modal'>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Options Modal"
                    style={customStyles}
                    ariaHideApp={false}
                >
                    {options.map((option) => {
                        return <h2 key={option.value} onClick={() => {handleOptionClick(option.value)}}>{option.label}</h2>
                    })}
                </Modal>
            </div>
        </div>
    );
};

export default DropDownMenu