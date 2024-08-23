import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);
import JobInfo from './JobInfo';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { FaLocationPin } from 'react-icons/fa6';
import { FaCalendarDays } from 'react-icons/fa6';
import { FaSuitcase } from 'react-icons/fa';
import styled from 'styled-components';
import { Form, Link } from 'react-router-dom';

const JobCard = ({
  _id,
  company,
  position,
  jobLocation,
  jobType,
  jobStatus,
  link,
  createdAt,
}) => {
  // Format day
  const formattedCreatedAt = day(createdAt).format('MMM-DD-YYYY');

  return (
    <Wrapper>
      <header className="header">
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="header-content">
          <div className="header-heading-wrapper">
            <h5>{position}</h5>
            {link && (
              <a href={link} target="_blank" className="job-link">
                <FaExternalLinkAlt />
              </a>
            )}
          </div>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo text={jobLocation} icon={<FaLocationPin />} />
          <JobInfo text={formattedCreatedAt} icon={<FaCalendarDays />} />
          <JobInfo text={jobType} icon={<FaSuitcase />} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>
        <footer className="actions">
          <Link to={`/dashboard/edit-job/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default JobCard;

const Wrapper = styled.div`
  background-color: var(--background-secondary-color);
  padding: 2rem 0.5rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-2);
  display: grid;
  grid-template-rows: 1fr auto;

  .header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);

    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    column-gap: 1rem;
  }

  .main-icon {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    font-size: 1.5rem;
    font-weight: 700;
    background-color: var(--primary-500);
    color: var(--white);
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
  }

  .header-content {
    p {
      text-transform: capitalize;
      margin: 0;
      letter-spacing: var(--letter-spacing);
      color: var(--text-secondary-color);
    }

    .header-heading-wrapper {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      margin-bottom: 0.5rem;

      h5 {
        font-size: 1rem;
      }

      .job-link {
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
          fill: var(--primary-700);
        }
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    margin: 1rem 0 1.5rem;
    gap: 1.5rem;
    padding: 1rem 1.5rem;

    .content-center {
      display: grid;
      row-gap: 0.5rem;

      .status {
        width: 100px;
        padding: 0.5rem;
        margin-top: 0.5rem;
        border-radius: var(--border-radius);
        text-transform: capitalize;
        text-align: center;
      }
    }

    .actions {
      display: flex;
      gap: 0.75rem;
      font-size: 1rem;

      .edit-btn,
      .delete-btn {
        font-size: 0.8rem;
        height: 30px;
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }
  }

  @media (min-width: 768px) {
    .content {
      .content-center {
        grid-template-columns: 1fr 1fr;
      }
    }
  }
`;
