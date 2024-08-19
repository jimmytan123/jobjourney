import bcrypt from 'bcryptjs';

export const getHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

export const isPasswordMatched = async (passwordInput, savedPassword) => {
  // Compare the hased version of both passwords
  return await bcrypt.compare(passwordInput, savedPassword);
};
