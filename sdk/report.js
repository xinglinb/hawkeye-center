import queryString from 'query-string';

export default class Monitor {
  config = {
    pid: 'jnjnj', // 上报数据的属性名，用于服务器获取数据
    performanceReportUrl: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    errorReportUrl: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
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
    const queryData = {
      pid,
      param: JSON.stringify(data),
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
      console.log('timing', timing, JSON.parse(JSON.stringify(timing)));
      console.log('卸载上个页面', timing.fetchStart);
      console.log('dns + 创建TCP连接的时间', timing.connectEnd - timing.domainLookupStart);
      console.log('请求资源的时间', timing.responseEnd - timing.connectEnd);
      console.log('js dom css解析时间', timing.domInteractive - timing.unloadEventEnd);
      console.log('dom 渲染', timing.domComplete - timing.domInteractive);
      console.log('页面加载完成的时间', timing.loadEventStart);
      setTimeout(() => {
        this.request(performanceReportUrl, timing);
      }, 0);
    });
  }

  errorReport = (params) => {
    const { errorReportUrl } = this.config;
    setTimeout(() => {
      this.request(errorReportUrl, {
        ...params,
        navigator: {
          appName: navigator.appName,
          appVersion: navigator.appVersion,
          platform: navigator.platform,
          userAgent: navigator.userAgent,
          language: navigator.language,
        },
      });
    }, 0);
  }

  allErrorReport = () => {
    window.addEventListener('error', ({ error }) => {
      this.errorReport({
        mid: '1111',
        actionType: 'allError',
        massage: this.processStackMsg(error),
      });
    });
  }

  processStackMsg = (error) => {
    let stack = error.stack
      // .replace(/\n/gi, '')
      .split(/\bat\b/)
      .slice(0, 9)
      .join('@')
      .replace(/\?[^:]+/gi, '');
    const msg = error.toString();
    if (stack.indexOf(msg) < 0) {
      stack = `${msg}@${stack}`;
    }
    return stack;
  }
}
