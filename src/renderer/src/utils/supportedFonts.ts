// https://www.zhangxinxu.com/wordpress/2018/02/js-detect-suppot-font-family/
const isSupportFontFamily = (f: string) => {
  const h = 'Arial';
  if (f.toLowerCase() == h.toLowerCase()) {
    return true;
  }
  const e = 'a';
  const d = 100;
  const a = 100, i = 100;
  const c = document.createElement('canvas');
  const b = c.getContext('2d');
  c.width = a;
  c.height = i;
  b.textAlign = 'center';
  b.fillStyle = 'black';
  b.textBaseline = 'middle';
  const g = function (j) {
    b.clearRect(0, 0, a, i);
    b.font = d + 'px ' + j + ', ' + h;
    b.fillText(e, a / 2, i / 2);
    const k = b.getImageData(0, 0, a, i).data;
    return [].slice.call(k).filter(function (l) {
      return l != 0;
    });
  };
  return g(h).join('') !== g(f).join('');
};

const fonts = {
  'PingFang SC': '苹方',
  STHeiti: '华文黑体',
  STXihei: '华文细黑',
  STKaiti: '华文楷体',
  STSong: '华文宋体',
  STLiti: '华文隶书',
  STXingkai: '华文行楷',
  'Microsoft Yahei': '微软雅黑',
  'Microsoft JhengHei': '微软正黑',
  SimSun: '宋体',
  SimHei: '黑体',
  KaiTi: '楷体',
  YouYuan: '幼圆',
  LiSu: '隶书',
  'Source Han Sans CN': '思源黑体',
  'Source Han Serif SC': '思源宋体',
};

const supportedFonts = Object.fromEntries(
  Object.entries(fonts)
    .filter(([id, name]) => isSupportFontFamily(id)),
);

export default supportedFonts;
