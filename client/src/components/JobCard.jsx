import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);
import JobInfo from './JobInfo';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { FaLocationPin } from 'react-icons/fa6';
import { FaCalendarDays } from 'react-icons/fa6';
import { FaSuitcase } from 'react-icons/fa';
import styles from './JobCard.module.css';
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
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.mainIcon}>{company.charAt(0)}</div>
        <div className={styles.headerContent}>
          <div className={styles.headerHeadingWrapper}>
            <h5>{position}</h5>
            {link && (
              <a href={link} target="_blank" className={styles.jobLink}>
                <FaExternalLinkAlt />
              </a>
            )}
          </div>
          <p>{company}</p>
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles.contentCenter}>
          <JobInfo text={jobLocation} icon={<FaLocationPin />} />
          <JobInfo text={formattedCreatedAt} icon={<FaCalendarDays />} />
          <JobInfo text={jobType} icon={<FaSuitcase />} />
          <div className={`${styles.status} ${jobStatus}`}>{jobStatus}</div>
        </div>
        <footer className={styles.actions}>
          <Link
            to={`/dashboard/edit-job/${_id}`}
            className={`btn ${styles.editBtn}`}
          >
            Edit
          </Link>
          <Form method="post" action={`../delete-job/${_id}`}>
            <button type="submit" className={`btn ${styles.deleteBtn}`}>
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </div>
  );
};

export default JobCard;
