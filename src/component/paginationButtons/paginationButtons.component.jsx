import './paginationButtons.style.scss'
import arrowRight from '../../assets/arrow-right.svg'
import arrowLeft from '../../assets/arrow-left.svg'

const PaginationButtons = ({numberOfPages, onPageSelect, currentPage}) => {
    const getAButtons = () => {
        const buttons = []
        for (let i = 0; i < numberOfPages; i++) {
            buttons.push(
                <div onClick={pageClickHandler} className='pagination-buttons' style={currentPage === i + 1 ? {backgroundColor: "#7F56D9", borderRadius: "32px", fontWeight: "600", color: "#fff"} : {background: "none"}}>
                    <div className='some-paddings'>
                        {i + 1}
                    </div>
                </div>)
        }
        return buttons
    }

    const previousButtonHandler = () => {
        if (currentPage <= 1) {
            onPageSelect(currentPage)
            return
        }
        onPageSelect(currentPage - 1)
    }
    const nextButtonHandler = () => {
        if (currentPage >= numberOfPages) {
            onPageSelect(currentPage)
            return
        }
        onPageSelect(currentPage + 1)
    }

    const pageClickHandler = (e) => {
        onPageSelect(parseInt(e.target.innerText))
    }

    return (
        <div className='pagination'>
            <div className='nav-buttons'>
                <div className='button' onClick={previousButtonHandler}>
                    <img className='arrow' alt='Arrow left' src={arrowLeft}/>
                    <p className='button-text'>Previous</p>
                </div>
            </div>
            <div className='pagination-numbers'>
                {getAButtons()}
            </div>
            <div className='nav-buttons'>
                <div className='button' onClick={nextButtonHandler}>
                    <p className='button-text'>Next</p>
                    <img className='arrow' alt='Arrow right' src={arrowRight}/>
                </div>
            </div>
        </div>
    )
}

export default PaginationButtons