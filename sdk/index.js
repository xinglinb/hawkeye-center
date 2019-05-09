import Monitor from './report';

const moniter = new Monitor(window.hawkEyeConfig || {});

const errorReport = moniter.errorReport;

window.errorReport = errorReport;

export default errorReport;
