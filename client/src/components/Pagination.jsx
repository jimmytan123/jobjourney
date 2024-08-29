import styled from 'styled-components';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const Pagination = ({ numOfPages, currentPage }) => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  let pageArr = [];

  for (let i = 1; i <= numOfPages; i++) {
    pageArr.push(i);
  }

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
      <div className="btn-container">
        {pageArr.map((pageNum) => {
          return (
            <button
              key={pageNum}
              className={`btn page-btn ${pageNum === currentPage && 'active'}`}
              onClick={() => handlePageNumClick(pageNum)}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
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

export default Pagination;

const Wrapper = styled.div``;
