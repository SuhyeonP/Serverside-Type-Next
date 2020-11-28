const backUrl = process.env.NODE_ENV === 'production' ? 'http://localhost:3050' : 'http://localhost:3050';

export { backUrl };

export default {
  backUrl,
};
