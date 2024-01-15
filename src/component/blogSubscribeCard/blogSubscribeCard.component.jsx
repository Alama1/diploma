import './blogSubscribeCard.style.scss'
import icon from '../../assets/telegram.svg'
import {useState} from "react";

const BlogSubscribeCard = ({ onButtonPress }) => {
    const [email, setEmail] = useState()

    const emailChangeHandler = (e) => {
        setEmail(e.target.value)
    }
    return(
        <div className='subscribe-card'>
            <div className='icon-wrapper'>
                <img alt='Subscribe icon' className='subscribe-icon' src={icon}/>
            </div>
            <div className='card-text'>
                <div className='heading-and-text'>
                    <p className='title'>
                        Weekly newsletter
                    </p>
                    <p className='text'>No spam. Just the latest releases and tips, interesting articles, and exclusive interviews in your inbox every week.
                    </p>
                </div>
                <div className='email-capture'>
                    <div className='input-field'>
                        <input className='input' placeholder='Enter your email' onChange={emailChangeHandler}/>
                        <p className='text'>
                            Read about our privacy policy.
                        </p>
                    </div>
                    <div className='button' onClick={() => {onButtonPress(email)}}>
                        Subscribe
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogSubscribeCard