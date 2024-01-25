import './blogCard.style.scss'
import arrow from '../../assets/arrow-up-right.svg'

const BlogCard = ( { img, tag, annotation, author_name} ) => {
    return (
        <div className='blog-card'>
            <img alt='Blog card image' src={img} className='blog-card--image'/>
            <div className='blog-card-content'>
                <div className='main-text'>
                    <div className='tag'>
                        {tag}
                    </div>
                    <div className='heading-and-annotation'>
                        <div className='heading'>
                        </div>
                        <a className='annotation'>
                            {annotation}
                        </a>
                    </div>
                </div>
            </div>
            <div className='blog-card--footer'>
                <div className='author'>
                    <img className='avatar' alt='Author avatar' src='https://southernautomotivegroup.com.au/wp-content/uploads/2015/04/generic-placeholder-person-300x300.png'/>
                    <div className='author-name-and-data'>
                        <a className='author-name'>{`${author_name}`}</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogCard