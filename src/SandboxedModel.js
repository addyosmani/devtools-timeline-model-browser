/**
 * @name SandboxedModel.js
 * @description Sandboxed model cleaned up from https://github.com/paulirish/devtools-timeline-model/blob/master/lib/timeline-model.js
 */
export default class SandboxedModel {

  init(events) {
    // build empty models. (devtools) tracing model & timeline model
    //   from Timeline.TimelinePanel() constructor
    var tracingModelBackingStorage = new Bindings.TempFileBackingStorage('tracing');
    this._tracingModel = new SDK.TracingModel(tracingModelBackingStorage);
    this._timelineModel = new TimelineModel.TimelineModel(Timeline.TimelineUIUtils.visibleEventsFilter());
    
    if (typeof events === 'string') events = JSON.parse(events);
    // WebPagetest trace files put events in object under key `traceEvents`
    if (events.hasOwnProperty('traceEvents')) events = events.traceEvents;

    // reset models
    //   from Timeline.TimelinePanel._clear()
    this._timelineModel.reset();

    // populates with events, and call TracingModel.tracingComplete()
    this._tracingModel.setEventsForTest(events);

    // generate timeline model
    //   from Timeline.TimelinePanel.loadingComplete()
    var loadedFromFile = true;
    this._timelineModel.setEvents(this._tracingModel, loadedFromFile);

    return this;
  }

  _createGroupingFunction(groupBy) {
    return Timeline.AggregatedTimelineTreeView.prototype._groupingFunction(groupBy);
  }

  timelineModel() {
    return this._timelineModel;
  }

  tracingModel() {
    return this._tracingModel;
  }

  topDown() {
    return this.topDownGroupBy(Timeline.AggregatedTimelineTreeView.GroupBy.None);
  }

  topDownGroupBy(grouping) {
    var filters = [];
    filters.push(Timeline.TimelineUIUtils.visibleEventsFilter());
    filters.push(new TimelineModel.ExcludeTopLevelFilter());
    var nonessentialEvents = [
      TimelineModel.TimelineModel.RecordType.EventDispatch,
      TimelineModel.TimelineModel.RecordType.FunctionCall,
      TimelineModel.TimelineModel.RecordType.TimerFire
    ];
    filters.push(new TimelineModel.ExclusiveNameFilter(nonessentialEvents));

    var groupingAggregator = this._createGroupingFunction(Timeline.AggregatedTimelineTreeView.GroupBy[grouping]);
    var topDownGrouped = TimelineModel.TimelineProfileTree.buildTopDown(this._timelineModel.mainThreadEvents(),
        filters, /* startTime */ 0, /* endTime */ Infinity, groupingAggregator);

    // from Timeline.CallTreeTimelineTreeView._buildTree()
    if (grouping !== Timeline.AggregatedTimelineTreeView.GroupBy.None)
      new TimelineModel.TimelineAggregator().performGrouping(topDownGrouped); // group in-place

    new TimelineModelTreeView(topDownGrouped).sortingChanged('total', 'desc');
    return topDownGrouped;
  }

  bottomUp() {
    return this.bottomUpGroupBy(Timeline.AggregatedTimelineTreeView.GroupBy.None);
  }

  /**
   * @param  {!string} grouping Allowed values: None Category Subdomain Domain URL EventName
   * @return {!TimelineModel.TimelineProfileTree.Node} A grouped and sorted tree
   */
  bottomUpGroupBy(grouping) {
    var topDown = this.topDownGroupBy(grouping);

    var bottomUpGrouped = TimelineModel.TimelineProfileTree.buildBottomUp(topDown);
    new TimelineModelTreeView(bottomUpGrouped).sortingChanged('self', 'desc');

    // todo: understand why an empty key'd entry is created here
    bottomUpGrouped.children.delete('');
    return bottomUpGrouped;
  }

  frameModel() {
    var frameModel = new TimelineModel.TimelineFrameModel(event =>
      Timeline.TimelineUIUtils.eventStyle(event).category.name
    );
    frameModel.addTraceEvents({ /* target */ },
      this._timelineModel.inspectedTargetEvents(), this._timelineModel.sessionId() || '');
    return frameModel;
  }

  filmStripModel() {
    return new Components.FilmStripModel(this._tracingModel);
  }

  interactionModel() {
    var irModel = new TimelineModel.TimelineIRModel();
    irModel.populate(this._timelineModel);
    return irModel;
  }
}

