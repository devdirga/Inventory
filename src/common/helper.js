const Helper = {
  clone: (obj) => {
    return JSON.parse(JSON.stringify(obj));
  },
  sleep: (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
};

export default Helper;
