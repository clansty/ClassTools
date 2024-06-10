export default (namesStr: string) => {
  return namesStr.split(/[\s\n]/)
    .filter(them => !!them)
    .filter(them => !['姓名'].includes(them));
}
