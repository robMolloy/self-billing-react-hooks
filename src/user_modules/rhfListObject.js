import { v4 as uuid } from "uuid";

class rhfListObject {
  constructor(props) {
    let formListState, setFormListState, defaultValues;
    ({ formListState, setFormListState, defaultValues = {} } = props);

    delete defaultValues.id;
    // ({ id, ...defaultValues } = defaultValues);

    this.formListState = formListState;
    this.setFormListState = setFormListState;
    this.defaultValues = defaultValues;

    this.keys = Object.keys(this.defaultValues);

    this.changed = [];
    this.unchanged = [];
  }

  updateChanged() {
    this.changed = [];
    this.unchanged = [];
    Object.values(this.formListState).forEach((object) => {
      const match = this.keys.every(
        (key) => this.defaultValues[key] === object.values[key]
      );
      const changedArray = match ? this.unchanged : this.changed;
      changedArray.push(object);
    });
  }

  async isValid() {
    await this.trigger();
    return Object.keys(this.errors).length === 0;
  }

  trigger() {
    return new Promise(async (resolve) => {
      for (let listItem of Object.values(this.formListState)) {
        await listItem.trigger();
      }
      resolve(true);
    });
  }

  triggerChanged() {
    this.updateChanged();
    this.changed.forEach((listItem) => listItem.trigger());
  }

  get errors() {
    const rtn = {};

    Object.entries(this.formListState).forEach(([id, listItem]) => {
      if (Object.keys(listItem.errors).length !== 0) rtn[id] = listItem.errors;
    });
    return rtn;
  }

  getValues() {
    const objs = {};

    Object.entries(this.formListState).forEach(([id, object]) => {
      objs[id] = object.getValues();
    });
    return objs;
  }

  addItem() {
    const id = uuid();
    this.formListState[id] = { values: { ...this.defaultValues, id } };
    this.setFormListState({ ...this.formListState });
    this.triggerChanged();
  }

  removeItem(id) {
    delete this.formListState[id];
    this.setFormListState({ ...this.formListState });
  }

  reset() {
    this.setFormListState({});
  }
}
export default rhfListObject;
