import type { PaginationProps } from '../types';
import styles from './UpdatedPagination.module.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdatedPagination = ({ numOfPages, currentPage }: PaginationProps) => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const pageArr = [];

  for (let i = 1; i <= numOfPages; i++) {
    pageArr.push(i);
  }

  // Helper method for page number button
  const pageButton = ({ pageNumber, activeClass }: { pageNumber: number; activeClass: boolean }) => {
    return (
      <button
        key={pageNumber}
        className={`btn ${styles.pageBtn} ${activeClass ? styles.active : ''}`}
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
        <span className={`${styles.pageBtn} ${styles.dots}`} key="dots-prev">
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
        <span className={`${styles.pageBtn} ${styles.dots}`} key="dots-after">
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
  const handlePageNumClick = (pageNum: number) => {
    // Get the current search params
    const searchParams = new URLSearchParams(search);
    // Add page query params
    searchParams.set('page', String(pageNum));

    const updatedUrl = `${pathname}?${searchParams.toString()}`;

    // Navigate to the updated URL
    navigate(updatedUrl);
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={`btn ${styles.prevBtn}`}
        onClick={() => handlePageNumClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaAngleLeft /> Prev
      </button>
      <div className={styles.btnContainer}>{renderPageButtons()}</div>
      <button
        className={`btn ${styles.nextBtn}`}
        onClick={() => handlePageNumClick(currentPage + 1)}
        disabled={currentPage === numOfPages}
      >
        Next <FaAngleRight />
      </button>
    </div>
  );
};

export default UpdatedPagination;
