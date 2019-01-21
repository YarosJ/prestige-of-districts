import bayes from '../Bayes';
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

const input = [
  ['Координаційна рада з питань розвитку підприємництва рекомендувала встановити заборону продажу алкоголю у Краматорську', 0],
  ['Прес-служба прокуратури Донецької області', 0],
  ['У Краматорську вперше відбувся конкурс серед чоловіків на інвалідних візках.', 0],
  ['аварію, що залишила без води Стару частину міста, було швидко ліквідовано.', 1],
  ['Нагадаємо, сьогодні зранку виникла аварійна ситуація на магістральному водопроводі ф300, внаслідок чого була припинена подача води на стару частину міста Краматорська та прилеглі селища.', 1],
  ['Спеціалісти КП «Краматорський водоконал» приклали максимум зусиль, щоб у найкоротші терміни провести ремонтні роботи. Через 3 години порив було ліквідовано. Наразі водопостачання відновлено у повному обсязі.', 1],
  ['Возобновлении подачи технической воды', 1],
  ['Возобновлении подачи технической воды', 1],
  ['Возобновлении подачи технической воды', 1],
  ['Возобновлении подачи технической воды', 1],
];

// const result = "По улице А произошел прорыв воды. Ремонтные работы.";

// const words = tokenizer.tokenize(result);
//
// const check = bayes(input, words);
// console.log(`0: ${check.type0}`);
// console.log(`1: ${check.type1}`);
//
// if (check.type1 > check.type0) {
//   console.log('MATCH: ', result);
// } else console.log('NOT_MATCH: ', result);

function matchTheme(input, result){
  const words = tokenizer.tokenize(result);
  const check = bayes(input, words);
  console.log(check);
  return(check.type1 > check.type0);
}

export default async function (themesArr, parseResults) {
  // console.log(parseResults);
  return parseResults.filter(result => matchTheme(input, result));
}
