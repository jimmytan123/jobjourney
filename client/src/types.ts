import type { JOB_STATUS, JOB_TYPE, USER_TYPE } from './utils/constant';

/** Application status: pending, interview, or declined. */
export type JobStatus = (typeof JOB_STATUS)[keyof typeof JOB_STATUS];
/** Employment category: full-time, part-time, or internship. */
export type JobType = (typeof JOB_TYPE)[keyof typeof JOB_TYPE];
/** Account role used to control access to admin features. */
export type UserRole = (typeof USER_TYPE)[keyof typeof USER_TYPE];

/** Fields used by the frontend from a job's API representation. */
export interface Job {
  /** MongoDB document ID serialized as a string. */
  _id: string;
  /** Name of the company offering the position. */
  company: string;
  /** Title of the position being applied for. */
  position: string;
  /** Location entered for the job. */
  jobLocation: string;
  /** Employment category selected for the job. */
  jobType: JobType;
  /** Current stage of the application. */
  jobStatus: JobStatus;
  /** Optional job listing URL; absent or null when no link is stored. */
  link?: string | null;
  /** Creation timestamp serialized as an ISO 8601 string, rather than a Date. */
  createdAt: string;
}

/** Profile fields used by the frontend for the signed-in user. */
export interface User {
  /** MongoDB document ID serialized as a string. */
  _id: string;
  /** User's first name; the API calls this field `name`. */
  name: string;
  /** User's last name. */
  lastName: string;
  /** Email address associated with the account. */
  email: string;
  /** Location entered in the user's profile. */
  location: string;
  /** Account role used by navigation and access checks. */
  role: UserRole;
  /** Uploaded profile image URL; absent when no avatar is stored. */
  avatar?: string;
}

/** Response from GET /api/v1/users/current. */
export interface CurrentUserResponse {
  /** Profile of the authenticated user. */
  user: User;
}

/** Paginated response from GET /api/v1/jobs. */
export interface JobsResponse {
  /** Jobs on the requested page, after filtering and sorting. */
  jobs: Job[];
  /** Total matching jobs across all pages for the authenticated user. */
  totalJobs: number;
  /** Total pages for the current filters and page size; zero when no jobs match. */
  numOfPages: number;
  /** Requested page number, starting at 1. */
  currentPage: number;
}

/** Response from GET /api/v1/jobs/:id. */
export interface SingleJobResponse {
  /** Job identified by the route's ID. */
  job: Job;
}

/** Application count for one month represented in the statistics chart. */
export interface MonthlyApplication {
  /** Display label in `MMM YY` format, such as `Oct 26`; not an ISO date. */
  date: string;
  /** Number of jobs created by the authenticated user during that month. */
  count: number;
}

/** Response from GET /api/v1/jobs/stats. */
export interface StatsResponse {
  /** User's job totals by status, including zero for statuses with no jobs. */
  jobStatusStats: Record<JobStatus, number>;
  /** Up to six most recent months with applications, ordered oldest to newest. */
  monthlyApplications: MonthlyApplication[];
}

/** Response from GET /api/v1/admin/app-stats. */
export interface AdminStatsResponse {
  /** Total user accounts across the application. */
  usersCount: number;
  /** Total jobs across all users. */
  jobsCount: number;
}

/** Job-list URL parameters; values remain strings for the API to interpret. */
export interface JobSearchParams {
  /** Case-insensitive search expression matched against company and position. */
  search?: string;
  /** Application status filter; `all` or an omitted value disables filtering. */
  jobStatus?: string;
  /** Employment category filter; `all` or an omitted value disables filtering. */
  jobType?: string;
  /** Sort option: `newest`, `oldest`, `a-z`, or `z-a`; defaults to `newest`. */
  sort?: string;
  /** Page number encoded as a string, starting at `1`; defaults to `1`. */
  page?: string;
}

/** Page counts shared by the pagination components. */
export interface PaginationProps {
  /** Number of available pages; zero when there are no matching jobs. */
  numOfPages: number;
  /** Selected page number, starting at 1. */
  currentPage: number;
}

/** Keys used to display field-level validation messages in frontend forms. */
type FormField = 'position' | 'company' | 'jobLocation' | 'email' | 'password'
  | 'firstName' | 'lastName' | 'location' | 'confirmPassword' | 'avatar';
/** Validation messages keyed by field; fields without errors are omitted. */
export type ValidationErrors = Partial<Record<FormField, string>>;

/** User, UI state, and actions shared through the dashboard context. */
export interface DashboardContextValue {
  /** Profile of the authenticated user. */
  user: User;
  /** When true, opens the mobile sidebar and collapses the desktop sidebar. */
  showSidebar: boolean;
  /** Whether the dashboard uses the dark theme. */
  isDarkTheme: boolean;
  /** Switches the theme and saves the selection to localStorage. */
  toggleDarkTheme: () => void;
  /** Toggles the sidebar's open state. */
  toggleSidebar: () => void;
  /** Ends the server session and navigates to login after successful logout. */
  logoutUser: () => Promise<void>;
}

/** Job results and active URL parameters shared with job-list components. */
export interface AllJobsContextValue {
  /** Cached job-list response for the active filters and page. */
  data: JobsResponse;
  /** URL parameters used to populate the search form and fetch job results. */
  searchValues: JobSearchParams;
}
