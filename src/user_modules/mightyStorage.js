class mightyStorage {
  static getAllItems() {
    let allData = {};
    let keys = Object.keys(localStorage);
    keys.forEach((key) => (allData[key] = this.getItem(key)));
    return allData;
  }

  static getItem(key, ifnull = null) {
    let localData = localStorage.getItem(key);
    localData = localData === null ? ifnull : JSON.parse(localData);
    return localData;
  }

  static setItem(key, item) {
    let newData = JSON.stringify(item);
    return localStorage.setItem(key, newData);
  }

  static pushItem(key, item) {
    let localData = this.getItem(key, []);
    localData.push(item);
    return this.setItem(key, localData);
  }

  static filterItem(key, item) {
    let localData = this.getItem(key, []);
    localData = localData.filter(
      (localItem) => JSON.stringify(localItem) !== JSON.stringify(item)
    );
    return this.setItem(key, localData);
  }

  static addItem(key, item) {
    item = { [item.id]: item };
    let localData = this.getItem(key, {});
    return this.setItem(key, { ...localData, [item.id]: item });
  }

  static deleteItem(key, id) {
    let localData = this.getItem(key, []);
    delete localData[id];
    return this.setItem(key, localData);
  }
}

export default mightyStorage;
