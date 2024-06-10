import createAutoUpdateStorage from '../hooks/createAutoUpdateStorage';

export default createAutoUpdateStorage('lotsSettings', {
  min: 1,
  max: 50,
  count: 10,
});
