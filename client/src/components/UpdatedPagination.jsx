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

  // Helper method for page number button
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

  // Render an array of JSX buttons element
  const renderPageButtons = () => {
    const pageButtons = [];

    // First Page btn
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

    // The one right before current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        pageButton({ pageNumber: currentPage - 1, activeClass: false })
      );
    }

    // Current page btn
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(
        pageButton({ pageNumber: currentPage, activeClass: true })
      );
    }

    // The one right after current page
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

    // Last Page btn
    pageButtons.push(
      pageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    );

    return pageButtons;
  };

  // Handler when the page btn being clicked
  const handlePageNumClick = (pageNum) => {
    // Get the current search params
    const searchParams = new URLSearchParams(search);
    // Add page query params
    searchParams.set('page', pageNum);

    const updatedUrl = `${pathname}?${searchParams.toString()}`;

    // Navigate to the updated URL
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

const Wrapper = styled.div`
  height: 5rem;
  margin: 2rem 0.5rem 0 0.5rem;
  display: flex;
  justify-content: end;
  gap: 0.8rem;
  align-items: center;
  flex-wrap: wrap;

  .btn {
    border-radius: 0;
  }

  .btn:disabled {
    pointer-events: none;
    background-color: var(--primary-400);
  }

  .prev-btn,
  .next-btn {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    justify-content: center;
    height: 40px;
    width: 80px;
    font-weight: 700;
  }

  .btn-container {
    background-color: var(--background-secondary-color);
    display: flex;
    align-items: center;
  }

  .page-btn {
    color: var(--primary-500);
    background-color: transparent;
    border-color: transparent;
    width: 45px;
    height: 40px;
    font-weight: 700;
    font-size: 1.25rem;
  }

  .active {
    background-color: var(--primary-500);
    color: var(--white);
  }

  .dots {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
