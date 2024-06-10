// 获取从今天 0 点到现在的秒数
export default (time: Date | string) => {
  if (typeof time === 'object') {
    return time.getHours() * 60 * 60 + time.getMinutes() * 60 + time.getSeconds();
  }
  if (/^(\d+):(\d+)$/.test(time)) {
    time += ':00';
  }
  const exec = /(\d+):(\d+):(\d+)/.exec(time);
  const hours = Number(exec[1]);
  const minutes = Number(exec[2]);
  const seconds = Number(exec[3]);
  return hours * 60 * 60 + minutes * 60 + seconds;
};
