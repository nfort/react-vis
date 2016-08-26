import moment from 'moment';

export function getRandomSeriesData(total) {
  const result = [];
  for (let i = 0; i <= total; i++) {
    result.push({
      desktop: getRandomData(i),
      mobile: getRandomData(i),
      plan: getRandomData(i, 25000),
      xAxisLabel: moment().add(i, 'days').unix()
    });
  }
  return result;
}

export function getRandomData(x, fixY) {
  let lastY = (Math.random() * 30 - 20) * 1000;
  let y = Math.abs(Math.random() * lastY - lastY / 2 + lastY);
  return {
    x: x,
    y: fixY ? fixY : y
  }
}

export function getRandomDataPercent(total) {
  let lastY = (Math.random() * 30 - 20);
  let y = Math.abs(Math.random() * lastY - lastY / 2 + lastY);

  const result = [];
  for (let i = 0; i <= total; i++) {
    result.push({
      x: i,
      y: (Math.random() * 50 - 20)
    });
  }
  return result;
}

