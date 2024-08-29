import { Wrapper } from '../assets/styles/styledDashboardFormPage';
import FormRow from '../components/FormRow';
import FormRowSelect from '../components/FormRowSelect';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../utils/constant';
import { useAllJobsContext } from '../pages/AllJobs';
import { Form, Link, useSubmit } from 'react-router-dom';

const SearchContainer = () => {
  // Get searchValues for filling default input values
  const { searchValues } = useAllJobsContext();
  const { search, jobStatus, jobType, sort } = searchValues;

  const submit = useSubmit(); // For submitting form onChange

  const debounce = (onChange) => {
    let timeoutId;

    return (e) => {
      clearTimeout(timeoutId);

      const form = e.currentTarget.form;

      timeoutId = setTimeout(() => {
        // Actual submission invoked here
        onChange(form);
      }, 800); // delay search for 800ms
    };
  };

  return (
    <Wrapper type="sm">
      <Form className="dashboard-form">
        <div className="form-center">
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
            onClick={(e) => e.currentTarget.form.reset()}
          >
            Reset
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
