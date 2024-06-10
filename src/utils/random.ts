const random = {
  int(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
  },
  pick<T>(...array: T[]) {
    const index = random.int(0, array.length - 1);
    return array[index];
  },
  shuffle<T>(arr: T[]) {
    let i = arr.length;
    while (i) {
      const j = Math.floor(Math.random() * i--);
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  },
};

export default random;
