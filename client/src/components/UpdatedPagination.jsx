import styled from 'styled-components';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdatedPagination = ({ numOfPages, currentPage }) => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  let pageArr = [];

  for (let i = 1; i <= numOfPages; i++) {
    pageArr.push(i);
  }

  const pageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        className={`btn page-btn ${activeClass && 'active'}`}
        onClick={() => handlePageNumClick(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    // First Page
    pageButtons.push(
      pageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    );

    // Dots
    if (currentPage > 3) {
      pageButtons.push(
        <span className="page-btn dots" key="dots-prev">
          ...
        </span>
      );
    }

    // One right before current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        pageButton({ pageNumber: currentPage - 1, activeClass: false })
      );
    }

    // Current
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(
        pageButton({ pageNumber: currentPage, activeClass: true })
      );
    }

    // One right after current page
    if (currentPage + 1 !== numOfPages && currentPage !== numOfPages) {
      pageButtons.push(
        pageButton({ pageNumber: currentPage + 1, activeClass: false })
      );
    }

    // Dots
    if (currentPage + 2 < numOfPages) {
      pageButtons.push(
        <span className="page-btn dots" key="dots-after">
          ...
        </span>
      );
    }

    // Last Page
    pageButtons.push(
      pageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    );

    return pageButtons;
  };

  const handlePageNumClick = (pageNum) => {
    // Get the current search params
    const searchParams = new URLSearchParams(search);
    // Add page query params
    searchParams.set('page', pageNum);

    const updatedUrl = `${pathname}?${searchParams.toString()}`;

    navigate(updatedUrl);
  };

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => handlePageNumClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaAngleLeft /> Prev
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button
        className="btn next-btn"
        onClick={() => handlePageNumClick(currentPage + 1)}
        disabled={currentPage === numOfPages}
      >
        Next <FaAngleRight />
      </button>
    </Wrapper>
  );
};

export default UpdatedPagination;

const Wrapper = styled.div``;
