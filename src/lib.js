/**
 * @name lib.js
 * @description Imports dependencies for the Timeline Model Browser library, exposes globals.
 */

/* Stubs to allow the DevTools frontend to work in this context without throwing errors */
import * as stubs from './GlobalStubs.js';

/* Chrome DevTools UI Frontend */
import * as commonObjects from 'chrome-devtools-frontend/front_end/common/Object.js';
import * as utilities from 'chrome-devtools-frontend/front_end/platform/utilities.js';
import * as ParsedURL from 'chrome-devtools-frontend/front_end/common/ParsedURL.js';
import * as UIString from 'chrome-devtools-frontend/front_end/common/UIString.js';
import * as Target from 'chrome-devtools-frontend/front_end/sdk/Target.js';
import * as LayerTreeBase from 'chrome-devtools-frontend/front_end/sdk/LayerTreeBase.js';
import * as SegmentedRange from 'chrome-devtools-frontend/front_end/common/SegmentedRange.js';
import * as TempFile from 'chrome-devtools-frontend/front_end/bindings/TempFile.js';
import * as TracingModel from 'chrome-devtools-frontend/front_end/sdk/TracingModel.js';
import * as ProfileTreeModel from 'chrome-devtools-frontend/front_end/sdk/ProfileTreeModel.js';
import * as TimelineUIUtils from 'chrome-devtools-frontend/front_end/timeline/TimelineUIUtils.js';
import * as TimelineJSProfile from 'chrome-devtools-frontend/front_end/timeline_model/TimelineJSProfile.js';
import * as CPUProfileDataModel from 'chrome-devtools-frontend/front_end/sdk/CPUProfileDataModel.js';
import * as LayerTreeModel from 'chrome-devtools-frontend/front_end/layers/LayerTreeModel.js';
import * as TimelineModel from 'chrome-devtools-frontend/front_end/timeline_model/TimelineModel.js';
import * as SortableDataGrid from 'chrome-devtools-frontend/front_end/ui_lazy/SortableDataGrid.js';
import * as TimelineTreeView from 'chrome-devtools-frontend/front_end/timeline/TimelineTreeView.js';
import * as TimelineProfileTree from 'chrome-devtools-frontend/front_end/timeline_model/TimelineProfileTree.js';
import * as FilmStripModel from 'chrome-devtools-frontend/front_end/components_lazy/FilmStripModel.js';
import * as TimelineIRModel from 'chrome-devtools-frontend/front_end/timeline_model/TimelineIRModel.js';
import * as TimelineFrameModel from 'chrome-devtools-frontend/front_end/timeline_model/TimelineFrameModel.js';

/* Older monkey-patches needed to get this working */
import * as monkeyPatches from '../src/devtools-monkeypatches.js';
// polyfill the bottom-up and topdown tree sorting
import * as ModelTreeViewfrom from '../src/timeline-model-treeview.js';

/* Structured profile data modelling  */
import ModelAPI from '../src/Model.js';

// TODO: switch to directly exposing this global via Webpack.
// https://webpack.github.io/docs/library-and-externals.html
window.TimelineModelBrowser = ModelAPI;

export default ModelAPI;