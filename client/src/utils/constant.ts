// Constants of job status type
export const JOB_STATUS = {
  PENDING: 'pending',
  INTERVIEW: 'interview',
  DECLINED: 'declined',
} as const;

// Constants of job type
export const JOB_TYPE = {
  FULLTIME: 'full-time',
  PARTTIME: 'part-time',
  INTERNSHIP: 'internship',
} as const;

export const USER_TYPE = {
  USER: 'user',
  ADMIN: 'admin',
  default: 'user',
} as const;

export const JOB_SORT_BY = {
  NEWEST_FIRST: 'newest',
  OLDEST_FIRST: 'oldest',
  ASCENDING: 'a-z',
  DESCENDING: 'z-a',
} as const;
