import fsP from 'fs/promises';

const csvText = await fsP.readFile('./tools/city-list-generator/China-City-List-latest.csv', 'utf8');
// 前两行不是数据
const csv = csvText.split('\n')
        .splice(2)
        .filter(it => it)
        .map(row => row.split(','));

//     0       1      2   3   4    5      6     7       8      9        10          11         12       13
// 101010100,Beijing,北京,CN,China,中国,Beijing,北京市,Beijing,北京市,Asia/Shanghai,39.904987,116.405289,110000

const result = [];

for (const row of csv) {
  // 省
  let province = result.find(it => it.value === row[6]);
  if (!province) {
    province = {
      label: row[7],
      value: row[6],
      children: [],
    };
    result.push(province);
  }

  // 市
  // 直辖市可以不用增加一级
  let city = row[6] === row[8] ? province : province.children.find(it => it.value === row[8]);
  if (!city) {
    city = {
      label: row[9],
      value: row[8],
      children: [],
    };
    province.children.push(city);
  }

  // 地区
  city.children.push({
    label: row[2],
    value: row[3] + row[0],
  });
}

await fsP.writeFile('./src/renderer/src/data/cities.json', JSON.stringify(result, undefined, 2), 'utf8');
