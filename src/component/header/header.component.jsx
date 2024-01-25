import './header.styles.scss'
import {Fragment, useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import DropDownMenu from "../dropDownMenu/dropDownMenu.component";
import LoginModal from "../loginModal/loginModal.component";
import SignUp from "../signUpModal/signUpModal.component";
import ArtUpload from "../artUploadModal/artUploadModal.component";
import ProfileInfo from "../profileInfo/profileInfo.component";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState({username: 'undefined'})
    const onSelect = (option) => {
        console.log(option)
    }

    const onLoginSubmit = (token) => {
       localStorage.setItem('token', token)
        setIsLoggedIn(true)
    }
    const onSignUpSubmit = (token) => {
        setIsLoggedIn(false)
    }

    const checkToken = async () => {
        const token = localStorage.getItem('token')
        const res = await fetch('http://78.137.54.103:4000/check-token', {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            method: 'POST',
            body: JSON.stringify({"token": token})
        })
        return await res.json()

    }

    useEffect(() => {
        try {
            const token = localStorage.getItem('token')
            if (token.length > 0) {
                checkToken().then(res => {
                    if(res.Status === 'Error') {
                        setIsLoggedIn(false)
                    } else {
                        setIsLoggedIn(true)
                        setUserData(res.Message.user)
                    }
                })
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
                        {!isLoggedIn ? <SignUp onSubmit={onSignUpSubmit}/>: null}
                        {isLoggedIn ? <ProfileInfo username={`Profile: ${userData.username}`}/>: null }
                        {isLoggedIn ? <ArtUpload onSubmit={onSignUpSubmit}/>: null}
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