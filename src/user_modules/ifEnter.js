const ifEnter = (e, func) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    func();
  }
};

export default ifEnter;
