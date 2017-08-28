import constants from '../constants';

export default moduleName => actionName =>
  `${constants.APP_NAME}/${moduleName}/${actionName}`;
