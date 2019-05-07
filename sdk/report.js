import Events from './events';
import utils from './utils';

class Monitor extends Events {
  constructor(options) {
    super();
    this.config = {
      dataKey: '', // 上报数据的属性名，用于服务器获取数据
      mergeReport: true, // mergeReport 是否合并上报， false 关闭， true 启动（默认）
      delay: 1000, // 当 mergeReport 为 true 可用，延迟多少毫秒，合并缓冲区中的上报（默认）
      url: '', // 指定错误上报地址
      getPath: '', // get请求路径
      postPath: '', // post请求路径
      random: 1, // 抽样上报，1~0 之间数值，1为100%上报（默认 1）
      defaultMethod: 'get',
      performanceReport: false,
      errorReport: false,
      ...options,
    };
    this.queue = {
      get: [],
      post: [],
    };
    this.getUrl = this.config.url + this.config.getPath;
    this.postUrl = this.config.url + this.config.postPath;

    if (this.config.performanceReport) {
      // 性能上报，在onload后执行
      const oldOnload = window.onload;
      window.onload = (e) => {
        if (oldOnload && typeof oldOnload === 'function') {
          oldOnload(e);
        }
        // 尽量不影响页面主线程
        if (window.requestIdleCallback) {
          window.requestIdleCallback(this.performanceReport);
        } else {
          setTimeout(() => {
            this.performanceReport();
          }, 0);
        }
      };
    }

    if (this.config.errorReport) {
      // 异常上报，重写onError
      this.errorReport();
    }
  }
  report(data, instant) {
    instant ? this.instantlyReport(this.config.defaultMethod, data) : this.sendData(this.config.defaultMethod, data);
  }
  reportByGet(data, instant) {
    instant ? this.instantlyReport('get', data) : this.sendData('get', data);
  }
  reportByPost(data, instant) {
    instant ? this.instantlyReport('post', data) : this.sendData('post', data);
  }
  // 立即发送，跳过判定mergeReport
  instantlyReport(type, data) {
    this[`${type}Request`](utils.serializeObj(data));
  }
  sendData(type, data) {
    if (this.catchData(type, data)) {
      this.delayReport();
    }
  }
  delayReport(cb) {
    // if (!this.trigger('beforeReport')) return;
    const delay = this.config.mergeReport ? this.config.delay : 0;
    setTimeout(() => {
      // if (!this.trigger('beforeSend')) return;
      this.reportSend(cb);
    }, delay);
  }
  // push数据到pool
  catchData = (type, data) => {
    const rnd = Math.random();
    if (rnd >= this.config.random) {
      return false;
    }
    this.queue[type].push(data);
    return this.queue[type];
  }
  reportSend(cb) {
    Promise.all([this.getRequest(), this.postRequest()]).then((urls) => {
      this.trigger('afterReport');
      cb && cb.call(this, urls);
    });
  }
  getRequest(instantData) {
    return new Promise((resolve) => {
      if (this.queue.get.length === 0 && !instantData) {
        resolve();
      } else {
        const parames = instantData || this._getParames('get');
        const url = `${this.getUrl}?${this.config.dataKey}=${parames}`;
        const img = new window.Image();
        img.onload = () => {
          resolve(parames);
        };
        img.src = url;
      }
    });
  }
  postRequest(instantData) {
    return new Promise((resolve) => {
      if (this.queue.post.length === 0 && !instantData) {
        resolve();
      } else {
        const parames = instantData || this._getParames('post');
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = () => {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            resolve(parames);
          }
        };
        xmlhttp.open('POST', this.postUrl, true);
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        const data = {};
        data[this.config.dataKey] = parames;
        xmlhttp.send(JSON.stringify(data));
      }
    });
  }
  _getParames(type) {
    const queue = this.queue[type];
    const mergeReport = this.config.mergeReport;
    const curQueue = mergeReport ? queue : [queue.shift()];
    if (mergeReport) this.queue[type] = [];

    const parames = curQueue.map(obj => utils.serializeObj(obj)).join('|');
    return parames;
  }

  performanceReport = () => {
    // 获取performance navigation 对象
    const timing = performance.getEntriesByType('navigation')[0];
    const performanceOnbj = {
      reportType: 'performance',
      ...timing,
    };
    for (const key in performanceOnbj) {
      if (typeof performanceOnbj[key] === 'number') {
        performanceOnbj[key] = performanceOnbj[key].toFixed(2);
      }
    }
    // 性能上报跳过random
    this.queue.get.push(performanceOnbj);
  }

  errorReport = () => {
    window.addEventListener('error', (msg, url, rowNum, colNum, error) => {
      let stackMsg;
      if (error && error.stack) {
        stackMsg = this.processStackMsg(error);
      }
      const errorObj = {
        reportType: 'error',
        msg,
        url,
        rowNum,
        colNum,
        stackMsg,
      };
      // 异常错误不跳过random
      this.sendData('get', errorObj);
    });
  }
  processStackMsg = (error) => {
    let stack = error.stack
      .replace(/\n/gi, '')
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

export default Monitor;
