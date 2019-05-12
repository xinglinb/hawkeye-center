import queryString from 'query-string';

export default class Monitor {
  config = {
    pid: 0, // 上报数据的属性名，用于服务器获取数据
    performanceReportUrl: 'http://127.0.0.1:3001/report/performanceData',
    errorReportUrl: 'http://127.0.0.1:3001/report/errorData',
    random: 1, // 抽样上报，1~0 之间数值，1为100%上报（默认 1）
    performanceReport: true,
    errorReport: true,
  };

  constructor(options = {}) {
    this.config = {
      ...this.config,
      ...options,
    };

    if (this.config.performanceReport) {
      this.performanceReport();
    }

    if (this.config.errorReport) {
      // 异常上报，重写onError
      this.allErrorReport();
    }
  }

  request = (url, data) => {
    const { pid } = this.config;
    const navigatorData = {
      navigator_appVersion: navigator.appVersion, // 浏览器的版本
      navigator_platform: navigator.platform, // 浏览器所在的系统平台
      navigator_vendor: navigator.vendor, // 浏览器的品牌
      navigator_language: navigator.language, // 浏览器的主语言
    };
    const queryData = {
      pid,
      param: JSON.stringify(data),
      navigator: JSON.stringify(navigatorData),
      create_time: +new Date(),
    };
    let imgDom = document.createElement('img');
    imgDom.src = `${url}?${queryString.stringify(queryData)}`;
    imgDom.addEventListener('load', () => {
      imgDom = null;
    });
  }

  performanceReport = () => {
    const { performanceReportUrl } = this.config;

    window.addEventListener('load', () => {
      const timing = performance.getEntriesByType('navigation')[0];
      const resJs = performance.getEntries()
        .filter(item => item.initiatorType === 'script')
        .reduce((acc, item) => acc + item.duration, 0);

      const params = {
        timing: JSON.stringify(timing),
        unload_prePage: timing.fetchStart, // 卸载上个页面
        dns_tcp: timing.connectEnd - timing.domainLookupStart, // dns + 创建TCP连接的时间
        res_html: timing.responseEnd - timing.connectEnd, // 请求html的时间
        res_js: resJs, // 请求js的时间
        parse_resources: timing.domInteractive - timing.unloadEventEnd - resJs, // js dom css解析时间
        dom_render: timing.domComplete - timing.domInteractive, // dom 渲染
        all_time: timing.loadEventStart, // 页面加载完成的时间
      };

      setTimeout(() => {
        this.request(performanceReportUrl, params);
      }, 0);
    });
  }

  errorReport = (params) => {
    const { errorReportUrl } = this.config;
    setTimeout(() => {
      this.request(errorReportUrl, params);
    }, 0);
  }

  allErrorReport = () => {
    window.addEventListener('error', ({ error }) => {
      const message = error.toString();
      const stack = this.processStackMsg(error);
      this.errorReport({
        mid: 0,
        actionType: 'allError',
        stack,
        message,
      });
    });
  }

  processStackMsg = (error) => {
    const stack = error.stack
      // .replace(/\n/gi, '')
      .split(/\bat\b/)
      .slice(0, 9)
      .join('@')
      .replace(/\?[^:]+/gi, '');
    return `@${stack}`;
  }
}
