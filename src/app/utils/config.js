export const BACKEND_URL = 'https://stu.globalknowledgetech.com:4004/nl';
export const RESULTS_API_URL = 'https://stu.globalknowledgetech.com:8503/api/readiness-survey';

export const getNewsletterOptions = (newsletterId) => {
  const options = [];
  const normalizedId = newsletterId ? newsletterId.trim().toUpperCase() : '';
  
  if (normalizedId !== 'AI') options.push('YoupowerQ AI');
  if (normalizedId !== 'QC') options.push('YoupowerQ QC');
  if (normalizedId !== 'ET') options.push('YoupowerQ ET');
  return options;
};

export const getRedirectUrl = (newsletterId) => {
  switch(newsletterId) {
    case 'QC':
      return 'https://youpowerq-qc.beehiiv.com/';
    case 'ET':
      return 'https://youpowerq-et.beehiiv.com/';
    default:
      return 'https://youpowerq.beehiiv.com/';
  }
};