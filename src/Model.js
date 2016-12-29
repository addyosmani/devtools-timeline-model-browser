import SandboxedModel from './SandboxedModel.js';

export default class ModelAPI {

  constructor(events) {
    // TODO: Merge the ModelAPI and Sandboxed Models as this abstraction made more sense in Node
    this.sandbox = new SandboxedModel();
    this.sandbox.init(events);
  }

  timelineModel() {
    return this.sandbox.timelineModel();
  }

  tracingModel() {
    return this.sandbox.tracingModel();
  }

  topDown() {
    return this.sandbox.topDown();
  }

  topDownGroupBy(grouping) {
    return this.sandbox.topDownGroupBy(grouping);
  }

  bottomUp() {
    return this.sandbox.bottomUp();
  }

  /**
   * @ param  {!String} grouping Allowed values: None Category Subdomain Domain URL Name
   * @ return {!WebInspector.TimelineProfileTree.Node} A grouped and sorted tree
   */
  bottomUpGroupBy(grouping) {
    return this.sandbox.bottomUpGroupBy(grouping);
  }

  frameModel() {
    return this.sandbox.frameModel();
  }

  filmStripModel() {
    return this.sandbox.filmStripModel();
  }


  interactionModel() {
    return this.sandbox.interactionModel();
  }
}
