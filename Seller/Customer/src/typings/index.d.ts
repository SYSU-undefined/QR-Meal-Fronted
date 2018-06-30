import * as V from "./mpvue/vue";
import * as Options from "./mpvue/options";
import * as Plugin from "./mpvue/plugin";
import * as VNode from "./mpvue/vnode";
import * as ReqWrap from "../utils/request";

declare namespace mpvue {
  type CreateElement = V.CreateElement;

  type Component = Options.Component;
  type AsyncComponent = Options.AsyncComponent;
  type ComponentOptions<V extends Vue> = Options.ComponentOptions<V>;
  type FunctionalComponentOptions = Options.FunctionalComponentOptions;
  type RenderContext = Options.RenderContext;
  type PropOptions = Options.PropOptions;
  type ComputedOptions<V extends Vue> = Options.ComputedOptions<V>;
  type WatchHandler<V extends Vue> = Options.WatchHandler<V, any>;
  type WatchOptions = Options.WatchOptions;
  type DirectiveFunction = Options.DirectiveFunction;
  type DirectiveOptions = Options.DirectiveOptions;

  type PluginFunction<T> = Plugin.PluginFunction<T>;
  type PluginObject<T> = Plugin.PluginObject<T>;

  type VNodeChildren = VNode.VNodeChildren;
  type VNodeChildrenArrayContents = VNode.VNodeChildrenArrayContents;
  type VNode = VNode.VNode;
  type VNodeComponentOptions = VNode.VNodeComponentOptions;
  type VNodeData = VNode.VNodeData;
  type VNodeDirective = VNode.VNodeDirective;
}

// TS cannot merge imported class with namespace, declare a subclass to bypass
declare class Vue extends V.Vue {}

declare global {
  type MpVueOption = mpvue.ComponentOptions<Vue>;
  type Req = ReqWrap.Request;
}