import './home.style.scss'
import searchIcon from '../../assets/search.svg'
import {useEffect, useRef, useState} from "react";
import Select from 'react-select';
import BlogCard from "../../component/blogCard/blogCard.component";
import BlogSubscribeCard from "../../component/blogSubscribeCard/blogSubscribeCard.component";
import PaginationButtons from "../../component/paginationButtons/paginationButtons.component";

const Home = () => {
    const [searchValue, setSearchValue] = useState('')
    const [sortingTabsSelected, setSortingTabsSelected] = useState('View all')
    const [sortingDropdownSelected, setSortingDropdownSelected] = useState('All')
    const [filteredBlogs, setFilteredBlogs] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [genres, setGenres] = useState(['1', '2'])
    const [currentPrecision, setCurrentPrecision] = useState(0.5)
    const [blogs, setBlogs] = useState([{url: 'https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1', description: 'placeholder', genre: 'placeholder', author: 'placeholder', type: 'placeholder'}])

    const blogsPrePage = 8
    const lastIndex = currentPage * blogsPrePage
    const firstIndex = lastIndex - blogsPrePage
    const blogsToShow = filteredBlogs.slice(firstIndex, lastIndex)
    const pageCount = Math.ceil(blogs.length / blogsPrePage)
    const onInputSubmit = (event) => {
        if (event.code !== 'Enter') return
        setSearchValue(event.target.value)
    }

    const sortedBlogsList = blogs.sort((a, b) => {
        if (a.description > b.description) {
            return 1;
        }
        if (a.description < b.description) {
            return -1;
        }
    })

    useEffect(() => {
        fetch('http://78.137.54.103:4000/artworks')
            .then((res) => {
                return res.json()
            }).then((data) => {
                setBlogs(data.message)
        })
        fetch('http://78.137.54.103:4000/genres')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                data.message.push('All')
                data.message.sort((a, b) => {
                    if (a > b) {
                        return 1
                    } else {
                        return -1
                    }
                })
                setGenres(data.message);
            }).catch((e) => {
            console.log(e)
        })
    }, []);

    useEffect(() => {
        let newFilteredBlogs = sortedBlogsList
        if (sortingTabsSelected !== 'View all') {
            newFilteredBlogs = newFilteredBlogs.filter((blog) => {
                return blog.type.toLowerCase() === sortingTabsSelected.toLowerCase()
            })
        }



        if (sortingDropdownSelected !== 'All') {
            newFilteredBlogs = newFilteredBlogs.filter((blog) => {
                return blog.genre.toLowerCase() === sortingDropdownSelected.toLowerCase()
            })
        }

        setFilteredBlogs(newFilteredBlogs)
    }, [sortingTabsSelected, sortingDropdownSelected, blogs])

    useEffect(() => {
            fetch('http://78.137.54.103:4000/search-compare', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    query: searchValue,
                    blogs: sortedBlogsList,
                    precision: currentPrecision
                })
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setFilteredBlogs(data.message)
                }).catch((e) => {
                console.log(e)
            })
    }, [searchValue])

    const sortingTabsSelectHandler = (e) => {
        setSortingTabsSelected(e.target.innerText)
        setCurrentPage(1)
    }

    const sortingDropdownSelectHandler = (e) => {
        const sortingValue = e.value
        setSortingDropdownSelected(sortingValue)
    }

    const onPrecisionChange = (e) => {
        const precision = +e.target.value
        if (!precision || precision > 1) return
        setCurrentPrecision(precision)
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
                            <div className='input-with-label' >
                                <img src={searchIcon} className='search-icon'/>
                                <input className='input' onKeyDown={onInputSubmit}/>
                                <input className='input-precision' placeholder='Precision (0-1)' onChange={onPrecisionChange}/>
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
                                 style={sortingTabsSelected === 'Photo' ? {borderBottom: '2px solid #7F56D9'} : {borderBottom: 'none'}}>
                                Photo
                            </div>
                            <div onClick={sortingTabsSelectHandler}
                                 style={sortingTabsSelected === 'Artwork' ? {borderBottom: '2px solid #7F56D9'} : {borderBottom: 'none'}}>
                                Artwork
                            </div>
                            <div onClick={sortingTabsSelectHandler}
                                 style={sortingTabsSelected === 'AI-generated' ? {borderBottom: '2px solid #7F56D9'} : {borderBottom: 'none'}}>
                                AI-generated
                            </div>
                            <div onClick={sortingTabsSelectHandler}
                                 style={sortingTabsSelected === 'Screenshot' ? {borderBottom: '2px solid #7F56D9'} : {borderBottom: 'none'}}>
                                Screenshot
                            </div>
                            <div onClick={sortingTabsSelectHandler}
                                 style={sortingTabsSelected === 'GIF' ? {borderBottom: '2px solid #7F56D9'} : {borderBottom: 'none'}}>
                                GIF
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
                            return <BlogCard img={blog.url} annotation={blog.description}
                                             tag={blog.type} author_name={blog.author} genre={blog.genre}/>
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