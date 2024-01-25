import './profileInfo.style.scss'

const ProfileInfo = ({ username }) => {


    return (
        <div className='profile-info'>
            {username}
        </div>
    )
};

export default ProfileInfo