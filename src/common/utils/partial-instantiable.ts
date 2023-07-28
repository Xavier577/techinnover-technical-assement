export default class PartialInstantiable<T> {
  constructor(props?: T) {
    Object.assign(this, props ?? {});
  }
}
