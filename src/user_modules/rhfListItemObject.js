class rhfListItemObject {
  constructor(props) {
    let formListState, setFormListState, id, defaultValues, form;
    ({ formListState, setFormListState, id, defaultValues, form } = props);

    this.id = id;
    delete defaultValues.id;

    this.form = form;
    this.formListState = formListState;
    this.setFormListState = setFormListState;
    this.item = formListState[id];
    this.defaultValues = defaultValues;
    this.keys = Object.keys(defaultValues);
  }

  triggerIfChanged = () => {
    const match = this.keys.every(
      (key) => this.defaultValues[key] === this.item.values[key]
    );
    if (!match) this.formListState[this.id].trigger();
  };

  setState = (name, value) => {
    this.formListState[this.id].values[name] = value;
    this.setFormListState(this.formListState);
  };

  setValue = (name, value, params = { shouldValidate: true }) => {
    this.item.setValue(name, value, params);
    this.setState(name, value);
  };

  remove() {
    delete this.formListState[this.id];
    this.setFormListState({ ...this.formListState });
  }
}

export default rhfListItemObject;
