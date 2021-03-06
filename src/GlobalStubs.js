/**
 * @name GlobalStubs.js
 * @description Stubs out environment variables necessary for the DevTools frontend to function.
 */

// this.window = this.self = this.global = this;
// this.console = console;

// this.WebInspector = {};
// this.Runtime = this.TreeElement = {};
// this.WorkerRuntime = this.Protocol = {};

/* global Protocol UI SDK */

var noop = function() { };
var self = global;
// establish our sandboxed globals
self.Runtime = self.TreeElement = noop;
self.WorkerRuntime = self.Protocol = {};

// from generated externs
self.Accessibility = {};
self.Animation = {};
self.Audits = {};
self.Audits2 = {};
self.Audits2Worker = {};
self.Bindings = {};
self.CmModes = {};
self.Common = {};
self.Components = {};
self.Console = {};
self.Devices = {};
self.Diff = {};
self.Elements = {};
self.Emulation = {};
self.Extensions = {};
self.FormatterWorker = {};
self.Gonzales = {};
self.HeapSnapshotWorker = {};
self.Host = {};
self.LayerViewer = {};
self.Layers = {};
self.Main = {};
self.Network = {};
self.Persistence = {};
self.Platform = {};
self.Profiler = {};
self.Resources = {};
self.Sass = {};
self.Screencast = {};
self.SDK = {};
self.Security = {};
self.Services = {};
self.Settings = {};
self.Snippets = {};
self.SourceFrame = {};
self.Sources = {};
self.Terminal = {};
self.TextEditor = {};
self.Timeline = {};
self.TimelineModel = {};
self.ToolboxBootstrap = {};
self.UI = {};
self.UtilitySharedWorker = {};
self.WorkerService = {};
self.Workspace = {};

// other neccessary stubs
// Note: Paul's original version didn't need to stub out Protocol like this.
// TODO: Double check this doesn't introduce any unwanted side-effects.
Protocol = {};
Protocol.TargetBase = noop;
Protocol.Agents = {};

UI.VBox = noop;
UI.ViewportDataGrid = noop;
UI.ViewportDataGridNode = noop;

SDK.targetManager = {};
SDK.targetManager.mainTarget = noop;
