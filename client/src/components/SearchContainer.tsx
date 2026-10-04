import type { ChangeEvent } from 'react';
import styles from '../assets/styles/DashboardFormPage.module.css';
import FormRow from '../components/FormRow';
import FormRowSelect from '../components/FormRowSelect';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../utils/constant';
import { useAllJobsContext } from '../pages/AllJobs';
import { Form, Link, useSubmit } from 'react-router-dom';

const SearchContainer = () => {
  // Get searchValues for filling default input values
  const { searchValues } = useAllJobsContext();
  const { search, jobStatus, jobType, sort } = searchValues;

  // For submitting form onChange. Sends a request as if a form was submitted. React Router internally updates the URL search params.
  const submit = useSubmit();
  const debounce = (onChange: (form: HTMLFormElement) => void) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      clearTimeout(timeoutId);

      const form = e.currentTarget.form;
      if (!form) return;

      timeoutId = setTimeout(() => {
        // Actual submission invoked here
        onChange(form);
      }, 800); // delay search for 800ms
    };
  };

  return (
    <div className={`${styles.wrapper} ${styles.compact}`}>
      <Form className={styles.dashboardForm}>
        <div className={styles.formCenter}>
          <FormRow
            type="search"
            name="search"
            labelText="Search Keywords"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelText="Job Status"
            name="jobStatus"
            options={['all', ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelText="Job Type"
            name="jobType"
            options={['all', ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelText="Sort"
            name="sort"
            options={Object.values(JOB_SORT_BY)}
            defaultValue={sort}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <Link
            to="/dashboard/jobs"
            className="btn form-btn delete-btn"
            onClick={(e) => e.currentTarget.closest('form')?.reset()}
          >
            Reset
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default SearchContainer;
