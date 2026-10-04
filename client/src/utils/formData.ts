export const getFormString = (formData: FormData, name: string): string => {
  const value = formData.get(name);
  return typeof value === 'string' ? value : '';
};

// Text-only forms must not treat uploaded files as string field values.
export const getTextFormData = (formData: FormData): Record<string, string> =>
  Object.fromEntries(
    [...formData].filter((entry): entry is [string, string] =>
      typeof entry[1] === 'string'
    )
  );
