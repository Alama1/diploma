import './header.styles.scss'
import {Fragment, useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import DropDownMenu from "../dropDownMenu/dropDownMenu.component";
import LoginModal from "../loginModal/loginModal.component";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const onSelect = (option) => {
        console.log(option)
    }

    const onLoginSubmit = (token) => {
       localStorage.setItem('token', token)
        setIsLoggedIn(true)
    }

    useEffect(() => {
        try {
            const token = localStorage.getItem('token')
            if (token.length > 0) {
                setIsLoggedIn(true)
            }
        } catch (e) {
            setIsLoggedIn(false)
        }
    }, [])

    return (
        <Fragment>
            <div className='header'>
                <div className='container'>
                    <div className='content'>
                        <div className='logo'>
                            <div className='logo--wrap'>
                                <div className='logo--img'/>
                                <a className='logo--name'>
                                    Diploma 2024
                                </a>
                            </div>
                        </div>
                        <div className='navigation'>
                            <div className='home-button'>
                                Home
                            </div>
                            <div>
                                <DropDownMenu text='Products' onSelect={onSelect} options={[
                                    {label: 'Product 1', value: 'option1'},
                                    {label: 'Product 2', value: 'option2'},
                                    {label: 'Product 3', value: 'option3'},]}/>
                            </div>
                            <div>
                                <DropDownMenu text='Resources' onSelect={onSelect} options={[
                                    {label: 'Resource 1', value: 'option1'},
                                    {label: 'Resource 2', value: 'option2'},
                                    {label: 'Resource 3', value: 'option3'},]}/>
                            </div>
                            <div>
                                Pricing
                            </div>
                        </div>
                    </div>
                    <div className='navigation-buttons'>
                        {!isLoggedIn ? <LoginModal onSubmit={onLoginSubmit}/>: null}
                        <div className='sign-up-button'>
                            Sign up
                        </div>
                    </div>
                </div>
            </div>
            <Outlet/>
        </Fragment>
    )
}

const login = (event) => {
}

export default Header