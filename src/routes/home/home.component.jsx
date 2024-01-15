import './home.style.scss'
import searchIcon from '../../assets/search.svg'
import {useEffect, useRef, useState} from "react";
import Select from 'react-select';
import BlogCard from "../../component/blogCard/blogCard.component";
import blogs from '../../blogs.json'
import BlogSubscribeCard from "../../component/blogSubscribeCard/blogSubscribeCard.component";
import PaginationButtons from "../../component/paginationButtons/paginationButtons.component";

const Home = () => {
    const [searchValue, setSearchValue] = useState('')
    const [sortingTabsSelected, setSortingTabsSelected] = useState('View all')
    const [sortingDropdownSelected, setSortingDropdownSelected] = useState('Genres')
    const [filteredBlogs, setFilteredBlogs] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [genres, setGenres] = useState(['1', '2'])

    const blogsPrePage = 8
    const lastIndex = currentPage * blogsPrePage
    const firstIndex = lastIndex - blogsPrePage
    const blogsToShow = filteredBlogs.slice(firstIndex, lastIndex)
    const pageCount = Math.ceil(blogs.length / blogsPrePage)
    const onInputChange = (event) => {
        setSearchValue(event.target.value)
    }

    const sortedBlogsList = blogs.sort((a, b) => {
        if (a.title > b.title) {
            return 1;
        }
        if (a.title < b.title) {
            return -1;
        }
    })

    useEffect(() => {
        fetch('http://127.0.0.1:4000/genres')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setGenres(data.message);
            }).catch((e) => {
                console.log(e)
        })
    }, []);

    useEffect(() => {
        const newFilteredBlogs = sortedBlogsList.filter((blog) => {
            return blog.title.toLowerCase().includes(searchValue.toLowerCase())
        })
        const sorted = newFilteredBlogs.sort((a, b) => {
            if (sortingDropdownSelected === 'Name') {
                if (a.title > b.title) {
                    return 1;
                }
                if (a.title < b.title) {
                    return -1;
                }

            } else {
                if (a.creation_day < b.creation_day) {
                    return 1
                }
                if (a.creation_day > b.creation_day) {
                    return -1
                }

            }
            return 0
        })
        if (sortingTabsSelected === 'View all') {
            setFilteredBlogs(sorted)
            return
        }
        const twiceFiltered = sorted.filter((blog) => {
            return blog.tag.toLowerCase() === sortingTabsSelected.toLowerCase()
        })
        setFilteredBlogs(twiceFiltered)
    }, [searchValue, sortingTabsSelected, sortingDropdownSelected])


    const sortingTabsSelectHandler = (e) => {
        setSortingTabsSelected(e.target.innerText)
        setCurrentPage(1)
    }

    const sortingDropdownSelectHandler = (e) => {
        const sortingValue = e.value
        setSortingDropdownSelected(sortingValue)
    }

    const subscribeButtonHandler = (e) => {
        console.log(e)
    }

    return (
        <div className='home'>
            <div className='home-header'>
                <div className='container'>
                    <div className='content'>
                        <div className='heading-text'>
                            <div className='title'>
                                <div className='top-text'>
                                    Kuzhdenko Maksym
                                </div>
                                <div className='bottom-text'>
                                    The latest writings from our team
                                </div>
                            </div>
                            <div className='text'>
                                The latest industry news, interviews, technologies, and resources.
                            </div>
                        </div>
                        <div className='search'>
                            <div className='input-with-label'>
                                <img src={searchIcon} className='search-icon'/>
                                <input className='input' placeholder='Search' onChange={onInputChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='home-blogs'>
                <div className='container'>
                    <div className='control-panel'>
                        <div className='sorting-tabs'>
                            <div onClick={sortingTabsSelectHandler}
                                 style={sortingTabsSelected === 'View all' ? {borderBottom: '2px solid #7F56D9'} : {borderBottom: 'none'}}>
                                View all
                            </div>
                            <div onClick={sortingTabsSelectHandler}
                                 style={sortingTabsSelected === 'Design' ? {borderBottom: '2px solid #7F56D9'} : {borderBottom: 'none'}}>
                                Photograph
                            </div>
                            <div onClick={sortingTabsSelectHandler}
                                 style={sortingTabsSelected === 'Product' ? {borderBottom: '2px solid #7F56D9'} : {borderBottom: 'none'}}>
                                Painting
                            </div>
                            <div onClick={sortingTabsSelectHandler}
                                 style={sortingTabsSelected === 'Software Engineering' ? {borderBottom: '2px solid #7F56D9'} : {borderBottom: 'none'}}>
                                Screen shot
                            </div>
                            <div onClick={sortingTabsSelectHandler}
                                 style={sortingTabsSelected === 'Customer Success' ? {borderBottom: '2px solid #7F56D9'} : {borderBottom: 'none'}}>
                                Other
                            </div>
                        </div>
                        <div className='sorting-dropdown'>
                            <Select
                                placeholder={sortingDropdownSelected}
                                options={genres.map((item) => {
                                    return {label: item, value: item}
                                })}
                                onChange={sortingDropdownSelectHandler}
                                className='sorting-dropdown-selector'
                            />
                        </div>
                    </div>
                    <div className='content'>
                        {blogsToShow.map((blog) => {
                            return <BlogCard img={blog.image} title={blog.title} annotation={blog.annotation}
                                             tag={blog.tag} author_last_name={blog.author_last_name}
                                             author_first_name={blog.author_first_name} date={blog.creation_day}/>
                        })}
                        <BlogSubscribeCard onButtonPress={subscribeButtonHandler}/>
                    </div>
                    <PaginationButtons currentPage={currentPage} numberOfPages={pageCount} onPageSelect={setCurrentPage}/>
                </div>
            </div>
        </div>
    )
}

export default Home