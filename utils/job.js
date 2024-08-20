import { USER_TYPE } from './constant.js';

export const isAllowToRequest = (job, requestedUser) => {
  let isAllowed = true;

  // Check if the requested account is an admin
  const isAdmin = requestedUser.role === USER_TYPE.ADMIN;
  // Check if the requested account is the user who create the job
  const isJobOwner = requestedUser.userId === job.createdBy.toString();

  // Block user to access the resource if he isn't an admin and isn't the creator
  if (!isAdmin && !isJobOwner) {
    isAllowed = false;
  }

  return isAllowed;
};
