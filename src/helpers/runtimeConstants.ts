export default {
  isLocal: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
  devUseProdApi: Boolean(localStorage && localStorage.getItem('dev-useProdApi')),
};
