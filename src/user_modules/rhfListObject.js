import { v4 as uuid } from "uuid";
import populateObject from "./populateObject";

// const populateObject = (obj1 = {}, obj2 = {}) => {
//   Object.entries(obj1).forEach(([key, value]) => {
//     obj1[key] = obj2.hasOwnProperty(key) ? obj2[key] : value;
//   });

//   return obj1;
// };

class rhfListObject {
  constructor(props) {
    let objectType, state, setState, defaultValues;
    ({ objectType, state, setState, defaultValues = {} } = props);

    delete defaultValues.id;
    // ({ id, ...defaultValues } = defaultValues);

    state[objectType] = state[objectType] ?? {};

    this.state = state;
    this.setState = setState;
    this.defaultValues = defaultValues;

    this.objectState = state[objectType];
    this.keys = Object.keys(defaultValues);

    this.changed = [];
    this.unchanged = [];

    // this.updateChanged();
  }

  setFieldValue(id, name, value, params = { shouldValidate: true }) {
    let { setValue } = this.objectState.controls[id];
    setValue(name, value, params);
  }

  triggerFieldIfChanged() {
    let stateControls = this.objectState?.controls ?? {};
    Object.entries(stateControls).forEach(([id, controls]) => {
      Object.entries(controls.getValues()).forEach(([name, value]) => {
        let testValue = this.defaultValues?.[name] ?? "";
        if (value !== testValue) this.setFieldValue(id, name, value);
      });
    });
  }

  addItem() {
    this.objectState.values = this.objectState.values ?? {};
    let objects = this.objectState.values;

    let newId = uuid();
    let newObject = { [newId]: { ...this.defaultValues, id: newId } };
    Object.assign(objects, newObject);

    this.objectState.values = objects;
    this.setState({ ...this.state });
  }

  async isValid() {
    let valid = true;
    for (let controls of Object.values(this.objectState?.controls ?? {})) {
      await controls.trigger();
      if (Object.keys(controls.errors).length !== 0) valid = false;
    }
    return valid;
  }

  getValues() {
    let values = {};
    let stateControls = this.objectState?.controls ?? {};
    Object.entries(stateControls).forEach(([id, controls]) => {
      values[id] = controls.getValues();
    });
    return values;
  }

  getObjects() {
    let templateDatarow = this.defaultValues;
    let values = this.getValues();
    let objects = {};

    Object.entries(values).forEach(([id, fieldValues]) => {
      console.log(id);
      objects[id] = populateObject({ ...templateDatarow, id }, fieldValues);
    });
    console.log(objects);
    return objects;
  }

  // updateChanged() {
  //   this.changed = [];
  //   this.unchanged = [];
  //   Object.values(this.objectState.values).forEach((object) => {
  //     const match = this.keys.every((key) =>{

  //       return object.values?[key]  === undefined
  //     });
  //     const changedArray = match ? this.unchanged : this.changed;
  //     changedArray.push(object);
  //   });
  // }

  // async isValid() {
  //   await this.trigger();
  //   return Object.keys(this.errors).length === 0;
  // }

  // trigger() {
  //   return new Promise(async (resolve) => {
  //     for (let listItem of Object.values(this.formListState)) {
  //       await listItem.trigger();
  //     }
  //     resolve(true);
  //   });
  // }

  // triggerChanged() {
  //   this.updateChanged();
  //   this.changed.forEach((listItem) => listItem.trigger());
  // }

  // get errors() {
  //   const rtn = {};

  //   Object.entries(this.formListState).forEach(([id, listItem]) => {
  //     if (Object.keys(listItem.errors).length !== 0) rtn[id] = listItem.errors;
  //   });
  //   return rtn;
  // }

  // getValues() {
  //   const objs = {};

  //   Object.entries(this.formListState).forEach(([id, object]) => {
  //     objs[id] = object.getValues();
  //   });
  //   return objs;
  // }

  // addItem() {
  //   const id = uuid();
  //   this.formListState[id] = { values: { ...this.defaultValues, id } };
  //   this.setFormListState({ ...this.formListState });
  //   this.triggerChanged();
  // }

  // removeItem(id) {
  //   delete this.formListState[id];
  //   this.setFormListState({ ...this.formListState });
  // }

  // reset() {
  //   this.setFormListState({});
  // }
}
export default rhfListObject;
