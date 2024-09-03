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
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .page-btn {
    color: var(--primary-500);
    border-color: transparent;
    width: 45px;
    height: 40px;
    font-weight: 700;
    font-size: 1.25rem;
    background-color: var(--background-secondary-color);
  }

  .active {
    background-color: var(--primary-500);
    color: var(--white);
  }
`;
