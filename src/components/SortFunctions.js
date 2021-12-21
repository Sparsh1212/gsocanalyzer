export function sort0(a, b) {
    return (b.year.length - a.year.length);
  }

export function sort1(a, b) {
    const findSum = (a) => {
        var sum = 0;
        a.year.map((instance) => {
          sum += a.project[instance - 2009];
        })
        return sum;
    }
    return (findSum(b) - findSum(a));
  }

export function sort2(a, b) {
    const findAvg = (a) => {
      var sum = 0;
      a.year.map((instance) => {
        sum += a.project[instance - 2009];
      })
      return (sum/(a.year.length));
    }
    return (findAvg(b) - findAvg(a));
  }