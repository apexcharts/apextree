declare abstract class BaseChart {
  /** @internal */
  protected element: HTMLElement;
  /** Destroys the chart instance and cleans up DOM resources. */
  destroy(): void;
  /** Returns the unique identifier for this chart instance. */
  getInstanceId(): string;
}
/** @internal */
declare class ChartContext {
  constructor(element: HTMLElement, instanceId?: string);
  isShadowDOM(): boolean;
  getInstanceId(): string;
  destroy(): void;
}
/** @internal */
declare class Circle extends WrappedEl {}
/** @internal */
declare interface CircleAttr {}
/** @internal */
declare class ForeignObject extends WrappedEl {}
/** @internal */
declare class G extends WrappedEl {}
/** @internal */
declare class Path extends WrappedEl {}
/** @internal */
declare class Rect extends WrappedEl {}
/** @internal */
declare class SvgCanvas {}
/** @internal */
declare class Text_2 extends WrappedEl {}
/** @internal */
declare interface TextAttr { dx?: number; dy?: number; x?: number; y?: number; }
/** @internal */
declare class WrappedEl {}











declare type TextDirection = 'ltr' | 'rtl' | 'auto';



/**
 * WCAG 2.1 AA accessibility options for the tree chart.
 *
 * Controls ARIA role/label semantics on the SVG root and enables keyboard
 * navigation. Disable only when rendering inside a container that already
 * provides its own accessibility layer.
 */
export declare interface A11yOptions {
    /** Enable ARIA semantics and keyboard navigation. Default: true */
    readonly enabled?: boolean;
    /** Override the default `aria-label` ("Organizational chart") on the root SVG. */
    readonly label?: string;
}

declare class ApexTree extends BaseChart {
    graph: Graph;
    options: TreeOptions;
    private searchControl;
    private breadcrumbControl;
    /**
     * Create a new ApexTree instance.
     *
     * Dimensions are applied to the host element immediately. Call `render()` to
     * build the SVG tree after construction.
     *
     * @param element - The `HTMLElement` that will contain the tree SVG.
     * @param options - Partial `TreeOptions` to override defaults. Any omitted
     *   field falls back to its default value (see `DefaultOptions`).
     *
     * @example
     * ```ts
     * import { ApexTree } from 'apextree';
     * const tree = new ApexTree(document.getElementById('chart')!, {
     *   direction: 'top',
     *   nodeWidth: 120,
     *   nodeHeight: 40,
     * });
     * ```
     */
    constructor(element: HTMLElement, options?: Partial<TreeOptions>);
    /**
     * Set the global ApexCharts license key.
     *
     * Call this once before creating any chart instance, typically at app startup.
     * Without a valid license the chart renders with a watermark.
     *
     * @param key - The license key string provided by ApexCharts.
     *
     * @example
     * ```ts
     * import { ApexTree } from 'apextree';
     * ApexTree.setLicense('YOUR_LICENSE_KEY');
     * ```
     */
    static setLicense(key: string): void;
    private setupElementDimensions;
    /**
     * Handle watermark display based on license validation
     */
    private handleWatermark;
    /**
     * Render the tree into the element supplied in the constructor.
     *
     * Constructs the internal graph layout and writes the SVG to the DOM.
     * If `options.enableToolbar` is `true`, the zoom/pan/export toolbar is also
     * rendered inside the container.
     *
     * @param data - The root `NestedNode` of the tree hierarchy. Each node must
     *   have a unique `id` and a `name` (used as the display label). Nest children
     *   recursively via the `children` array.
     * @returns The internal `Graph` instance, which exposes `zoom()`, `fitScreen()`,
     *   and `exportToSvg()` for programmatic control after render.
     *
     * @throws {Error} If the container element is not found.
     *
     * @example
     * ```ts
     * tree.render({
     *   id: 'ceo',
     *   name: 'Alice',
     *   children: [
     *     { id: 'vp1', name: 'Bob', children: [] },
     *     { id: 'vp2', name: 'Carol', children: [] },
     *   ],
     * });
     * ```
     */
    render(data: NestedNode): Graph;
}
export { ApexTree }
export default ApexTree;

/**
 * Layout, canvas, and general behaviour options for the tree chart.
 *
 * This is the largest sub-group. It covers canvas dimensions, spacing between
 * nodes, grow direction, animation, the zoom/pan toolbar, and leaf-node
 * grouping. Compose with the other sub-option interfaces via `TreeOptions`.
 */
export declare interface CommonOptions {
    /** WCAG accessibility options. Disable or customise the SVG `aria-label`. */
    readonly a11y?: A11yOptions;
    /** Arbitrary CSS injected onto the SVG root container element. */
    readonly canvasStyle: string;
    /** Vertical distance between a parent node and its children in pixels. @default 50 */
    readonly childrenSpacing: number;
    /** CSS class name for the root SVG container element. @default 'root' */
    readonly containerClassName: string;
    /** Key in the data object used as the node display label. @default 'name' */
    readonly contentKey: string;
    /** Direction the tree grows from the root. `'top'` | `'bottom'` | `'left'` | `'right'`. @default 'top' */
    readonly direction: TreeDirection;
    /** Animate node expansion/collapse transitions. @default true */
    readonly enableAnimation: boolean;
    /**
     * Show a breadcrumb trail above the chart. The breadcrumb updates on node
     * click to show the path from root to the selected node. Clicking a segment
     * re-centers the camera on that ancestor.
     * @default false
     */
    readonly enableBreadcrumb: boolean;
    /**
     * Re-fit the viewBox to the new tree bounds when a node is collapsed or
     * expanded. When `true` (the default) the camera smoothly animates to the
     * tightest bounding box that contains all visible nodes. Set to `false` to
     * keep the viewBox fixed after collapse/expand interactions.
     * @default true
     */
    readonly enableExpandCollapseZoom: boolean;
    /**
     * Show a search input inside the toolbar area. When enabled, typing filters
     * nodes by the resolved label (string content from `contentKey`, or `name`
     * when content is an object). Matching nodes get highlighted and the path
     * from each match to the root is lineage-highlighted. Pressing Enter centers
     * the camera on the first match.
     * @default false
     */
    readonly enableSearch: boolean;
    /**
     * Node selection behaviour. See {@link TreeSelectionMode}.
     *
     * When enabled, clicking a node applies an `aria-selected="true"` attribute
     * and a visible ring, and the selected id(s) are retrievable via
     * `tree.graph.getSelection()` / programmable via `tree.graph.setSelection()`.
     * @default false
     */
    readonly enableSelection: TreeSelectionMode;
    /** Show the zoom/pan toolbar. @default false */
    readonly enableToolbar: boolean;
    /**
     * Enable Ctrl/⌘ + mouse-wheel (or trackpad pinch) zoom and drag-to-pan on the
     * canvas. A plain wheel without a modifier still scrolls the page. Set to
     * `false` to lock the viewport (useful when embedding the chart inside a
     * scrollable page).
     * @default true
     */
    readonly enableZoomPan: boolean;
    /** Stack leaf nodes vertically instead of spreading them horizontally. @default false */
    readonly groupLeafNodes: boolean;
    /** Height of the canvas. Use `'auto'` to size to content. @default 'auto' */
    readonly height: number | string;
    /** Highlight the hovered node and its connecting edges. @default true */
    readonly highlightOnHover: boolean;
    /** Localization and text-direction (RTL) options. See {@link LocaleOptions}. @default { direction: 'ltr' } */
    readonly locale?: LocaleOptions;
    /**
     * Horizontal padding around the rendered tree, in pixels. Adds breathing
     * room between the leftmost/rightmost nodes (and any external labels that
     * extend past them) and the SVG viewBox edge.
     * @default 100
     */
    readonly paddingX: number;
    /**
     * Vertical padding around the rendered tree, in pixels. Adds breathing
     * room above the root and below the deepest leaves — useful when leaf
     * nodes have rotated `externalLabel` content that extends past the
     * marker bounds.
     * @default 100
     */
    readonly paddingY: number;
    /** Horizontal distance between sibling nodes in pixels. @default 50 */
    readonly siblingSpacing: number;
    /**
     * Built-in theme preset. See {@link TreeTheme}.
     *
     * `'light'` uses the default soft-neutral palette; `'dark'` swaps to a
     * dark-mode palette with slate backgrounds; `'custom'` disables the
     * built-in CSS variable injection so host-page variables win cleanly.
     * @default 'light'
     */
    readonly theme: TreeTheme;
    /** Internal SVG viewport height in pixels. @default 600 */
    readonly viewPortHeight: number;
    /** Internal SVG viewport width in pixels. @default 800 */
    readonly viewPortWidth: number;
    /** Width of the canvas. Accepts a pixel number or CSS percentage string. @default '100%' */
    readonly width: number | string;
}

/**
 * English defaults for every {@link TreeMessages} string. These reproduce the
 * exact text the tree rendered before localization support, so a chart with no
 * `locale.messages` overrides is visually and semantically unchanged.
 */
export declare const DEFAULT_TREE_MESSAGES: TreeMessages;

/**
 * Controls how edge (connector) colors are determined.
 *
 * - `'default'` — all edges use the global `edgeColor` option (default behaviour).
 * - `'node'`    — each edge inherits the `borderColor` of the child node it
 *                 connects into, giving every branch a color that matches its
 *                 destination node. Per-node `borderColor` overrides are
 *                 respected; the global `borderColor` is used as the fallback.
 */
export declare type EdgeColorMode = 'default' | 'node';

export declare interface EdgeOptions {
    /** Color of the connecting lines between nodes. @default '#D0D5DD' */
    readonly edgeColor: string;
    /** Color of connecting lines when highlighted on hover. @default '#5C6BC0' */
    readonly edgeColorHover: string;
    /**
     * Determines how edge colors are resolved. See {@link EdgeColorMode}.
     * @default 'default'
     */
    readonly edgeColorMode: EdgeColorMode;
    /**
     * Shape of the connecting lines. See {@link EdgeStyle}.
     * @default 'orthogonal'
     */
    readonly edgeStyle: EdgeStyle;
    /** Stroke width of connecting lines in pixels. @default 1 */
    readonly edgeWidth: number;
}

/**
 * Options for the edges (connecting lines) drawn between parent and child nodes.
 *
 * Controls color, hover highlight color, and stroke width.
 */
/**
 * Shape of the connecting lines drawn between parent and child nodes.
 *
 * - `'orthogonal'` — right-angle elbows with rounded corners (default; matches
 *   the traditional org-chart look).
 * - `'curved'` — smooth cubic Bézier curve from parent to child, similar to
 *   d3-org-chart's compact vertical diagonal.
 * - `'straight'` — a direct line from parent anchor to child anchor.
 *
 * The `'curved'` and `'straight'` options don't apply to the side-bracket
 * connector drawn for grouped leaf nodes (that connector stays orthogonal
 * because its purpose is to visually stack siblings).
 */
export declare type EdgeStyle = 'curved' | 'orthogonal' | 'straight';

/**
 * Options for an external label rendered outside the node bounds.
 *
 * When `enabled` is true, the node's resolved content (the value at
 * `contentKey`) is rendered as an SVG `<text>` element positioned relative
 * to the node, instead of inside the node card. This is what enables looks
 * like the Highcharts "inverted treegraph" — small marker nodes with their
 * labels floating above, beside, or below the marker, optionally rotated.
 *
 * The in-node `nodeTemplate` is suppressed for any node where
 * `externalLabel.enabled` resolves to `true`. The node box itself still
 * renders (background, border, border-radius), so combine with a small
 * `nodeWidth` / `nodeHeight` and `borderRadius: '50%'` to get a circular
 * marker look.
 *
 * Defaults to `enabled: false` — existing integrations are unaffected.
 */
export declare interface ExternalLabelOptions {
    /**
     * Horizontal placement of the label relative to the node.
     *
     * - `'left'`   — label sits to the left of the node (text is right-anchored)
     * - `'center'` — label is centered on the node horizontally (default)
     * - `'right'`  — label sits to the right of the node (text is left-anchored)
     *
     * @default 'center'
     */
    readonly align?: 'center' | 'left' | 'right';
    /**
     * Render the node's label outside the node bounds. When `false` (default),
     * the in-node `nodeTemplate` is used as before.
     * @default false
     */
    readonly enabled: boolean;
    /** Override the global `fontColor` for the external label only. */
    readonly fontColor?: string;
    /** Override the global `fontFamily` for the external label only. */
    readonly fontFamily?: string;
    /** Override the global `fontSize` for the external label only. */
    readonly fontSize?: string;
    /** Override the global `fontWeight` for the external label only. */
    readonly fontWeight?: string;
    /** Additional horizontal pixel offset applied after `align`. @default 0 */
    readonly offsetX?: number;
    /** Additional vertical pixel offset applied after `verticalAlign`. @default 0 */
    readonly offsetY?: number;
    /**
     * Rotation in degrees, applied around the label anchor. Use `90` for vertical
     * leaf labels (reading top-to-bottom) and `-90` for bottom-to-top text.
     * @default 0
     */
    readonly rotation?: number;
    /**
     * Vertical placement of the label relative to the node.
     *
     * - `'top'`    — label sits above the node (text is bottom-anchored)
     * - `'middle'` — label is centered on the node vertically (default)
     * - `'bottom'` — label sits below the node (text is top-anchored)
     *
     * @default 'middle'
     */
    readonly verticalAlign?: 'bottom' | 'middle' | 'top';
}

/**
 * Typography options applied to the text rendered inside each node.
 *
 * These map directly to CSS font properties. Override at the `TreeOptions`
 * level for a uniform chart typeface, or use a custom `nodeTemplate` for
 * full per-node control.
 */
export declare interface FontOptions {
    /** CSS color for node text. @default '#000000' */
    readonly fontColor: string;
    /** CSS font-family for node text. Falls back to the page default when empty. */
    readonly fontFamily: string;
    /** CSS font-size for node text, e.g. `'14px'`. @default '14px' */
    readonly fontSize: string;
    /** CSS font-weight for node text. @default '400' */
    readonly fontWeight: string;
}

declare class Graph extends Paper {
    options: TreeOptions;
    private data;
    private graph;
    private nodeMap;
    /** Options resolved with CSS custom property overrides for the current render pass. */
    private renderOptions;
    /** Resolved, localized user-facing strings. Recomputed when options change. */
    private messages;
    /** Keyboard navigator instance (created lazily when a11y is enabled). */
    private keyboardNavigator;
    /** Breadcrumb listener invoked on node click when `enableBreadcrumb` is on. */
    private breadcrumbHandler;
    /** Selection state manager (created lazily on first render; reused across renders). */
    private selectionController;
    /** Tracks which node IDs were visible before the last render (for diff animation). */
    private prevNodeIds;
    /** True after the first rAF fires — before this, viewBox changes snap instantly. */
    private initialSetupDone;
    /** Handle for an in-flight viewBox animation — cancelled when a new one starts. */
    private viewBoxAnim;
    /**
     * Accumulated graph-level node positions across collapse/expand operations.
     * Unlike a per-operation snapshot, this map is never cleared — it retains
     * positions for nodes that were hidden in earlier operations so they can be
     * restored when those nodes reappear (e.g. expand after collapse).
     */
    private savedGraphPositions;
    constructor(element: HTMLElement, options: TreeOptions, chartContext: ChartContext);
    /** Resolved, localized strings for this chart (English defaults + `locale.messages`). */
    getMessages(): TreeMessages;
    /** Whether the current `locale.direction` resolves to right-to-left. */
    getIsRtl(): boolean;
    /**
     * Snapshot graph-level (x, y) for every node in the current layout.
     * Called before setGraphNodesAndEdges() destroys the old graph.
     */
    private mergeGraphPositions;
    private calculateLayout;
    /**
     * Mirror every laid-out node horizontally around the layout's center so the
     * tree reads right-to-left. Edges and leaf groups derive their geometry from
     * node positions, so flipping `node.x` mirrors the whole drawing. Tuned for
     * the vertical ('top'/'bottom') directions where sibling order should reverse.
     */
    private mirrorLayoutForRtl;
    private resetGraph;
    private setGraphNodesAndEdges;
    private setNodesRecursively;
    /**
     * Build a depth map for all current graph nodes (root = 0).
     * Used to drive rank-wave stagger delays during entrance animations.
     */
    private buildDepthMap;
    /**
     * Compute the tight bounding box from the fresh layout node positions.
     * Used to drive viewBox fitting after collapse/expand.
     */
    private computeRenderedBoundingBox;
    /**
     * After the SVG is added to the DOM, query all node `<g>` elements and
     * run entrance animations for nodes that are new (not in prevNodeIds).
     *
     * For expand mode we only animate new nodes (descendants of changedNodeId).
     * For initial render all nodes animate.
     * For data-update only genuinely new node IDs animate.
     * For collapse and layout-change no entrance animation runs.
     */
    private runNodeEntranceAnimations;
    /**
     * After node animations settle, run draw-on animations for all edge paths
     * that connect to newly-visible nodes.
     */
    private runEdgeAnimations;
    changeLayout(direction?: TreeDirection): void;
    collapse(nodeId: string): void;
    construct(data: NestedNode): void;
    expand(nodeId: string): void;
    fitScreen(): void;
    /** Expose the resolved node map so external controls (search, breadcrumb) can traverse. */
    getNodeMap(): Record<string, Node_2>;
    /**
     * Create the selection controller if the user has opted in, or sync its
     * mode to the current `enableSelection` value when it already exists.
     * Lazily constructed so users who never use selection pay zero cost.
     */
    private ensureSelectionController;
    /**
     * Register a callback invoked with the node id on every node click, or with
     * `null` to clear. Used by the optional breadcrumb control.
     */
    setBreadcrumbHandler(handler: ((nodeId: string | null) => void) | null): void;
    /**
     * Return the current list of selected node ids in insertion order.
     * Returns an empty array when selection is disabled or nothing is selected.
     */
    getSelection(): string[];
    /**
     * Replace the selection with the given ids. No-op when `enableSelection`
     * is `false`. In `'single'` mode only the first id is applied.
     */
    setSelection(ids: string[]): void;
    /** Clear the current selection. */
    clearSelection(): void;
    /**
     * Register a listener invoked with the new selection array whenever it
     * changes. Pass `null` to unregister.
     */
    onSelectionChange(listener: ((ids: string[]) => void) | null): void;
    /**
     * Wire keyboard shortcuts (`/` focus search, `Esc` clear search) into the
     * keyboard navigator. Safe to call before the navigator exists — the
     * handlers will be picked up on the next render().
     */
    setKeyboardShortcutHandlers(handlers: {
        onFocusSearch?: () => void;
        onClearSearch?: () => void;
    }): void;
    private pendingShortcutHandlers;
    /** Root node id of the currently rendered tree. */
    getRootNodeId(): string;
    /**
     * Resolve the displayable label for a node: string content at `contentKey`,
     * `.name` when content is an object, else `node.name`. Mirrors the label
     * lookup used by the keyboard type-ahead.
     */
    getNodeLabel(nodeId: string): string;
    /**
     * Return every non-pseudo node id whose resolved label contains `query`
     * (case-insensitive). Empty query returns no matches.
     */
    findNodesByQuery(query: string): string[];
    /**
     * Apply search highlight state to the DOM: highlights every match's
     * lineage back to root, tags matched nodes with `data-apextree-match`.
     * Pass an empty array to clear the state.
     */
    setSearchHighlight(matchIds: string[]): void;
    /**
     * Center the camera on a specific node, keeping the current zoom level.
     * Used by search (Enter key), breadcrumb clicks, and the `f` keyboard shortcut.
     * Animates when `enableAnimation` is on, snaps otherwise.
     */
    centerOnNode(nodeId: string): void;
    render({ mode }?: {
        mode?: 'initial' | 'expand' | 'collapse' | 'data-update';
    }): void;
}

/**
 * Localization and text-direction options.
 *
 * With the defaults (`direction: 'ltr'`, no message overrides) the output is
 * byte-for-byte identical to builds that predate i18n support.
 */
export declare interface LocaleOptions {
    /**
     * Text and layout direction. `'rtl'` mirrors the tree horizontally and sets
     * `dir="rtl"` on the container (so node text and the search/breadcrumb chrome
     * flow right-to-left); `'auto'` defers to the document/element direction.
     * RTL mirroring is tuned for the vertical (`'top'`/`'bottom'`) growth directions.
     * @default 'ltr'
     */
    readonly direction?: TextDirection;
    /** Overrides for user-facing strings. See {@link TreeMessages}. */
    readonly messages?: Partial<TreeMessages>;
}

/**
 * Recursive node structure passed to `ApexTree.render()`.
 *
 * Each node must have a unique `id` and a `name` for the display label.
 * Nest children recursively via the `children` array. Use the generic
 * parameter `T` to attach arbitrary data to each node (accessible via
 * the `data` field).
 *
 * @typeParam T - Type of the custom data payload attached to each node.
 *   Defaults to `undefined` when no custom data is needed.
 *
 * @example
 * ```ts
 * const orgChart: NestedNode = {
 *   id: 'ceo', name: 'Alice',
 *   children: [
 *     { id: 'vp1', name: 'Bob', children: [] },
 *   ],
 * };
 * ```
 */
export declare interface NestedNode<T = undefined> {
    /** Child nodes. Pass an empty array `[]` for leaf nodes. */
    readonly children: Array<NestedNode<T>>;
    /** Arbitrary data payload attached to this node. Available in callbacks. */
    readonly data: T;
    /** Unique identifier for this node. Must be stable across renders. */
    readonly id: string;
    /** Display label rendered inside the node element. */
    readonly name: string;
    /** Per-node overrides for font, border, tooltip, and other visual options. */
    readonly options?: FontOptions & NodeOptions & TooltipOptions;
}

declare interface Node_2<T = undefined> {
    x: number;
    y: number;
    width: number;
    height: number;
    readonly children: Array<string>;
    readonly data: T;
    readonly hiddenChildren: Array<string> | undefined;
    readonly id: string;
    readonly name: string;
    readonly onlyLeafNodes?: boolean;
    readonly options?: FontOptions & NodeOptions & TooltipOptions;
    readonly parent?: string;
}

/**
 * Context passed to {@link TreeMessages.nodeAriaLabel} so translators can build
 * a grammatically correct per-node label in any language.
 */
export declare interface NodeAriaContext {
    /** 1-based depth of the node (root = 1). */
    readonly level: number;
    /** Resolved node display name. */
    readonly name: string;
    /** 1-based position of the node among its siblings. */
    readonly position: number;
    /** Expand/collapse state. Omitted for nodes without children. */
    readonly state?: 'collapsed' | 'expanded';
    /** Number of siblings, including this node. */
    readonly total: number;
}

/**
 * Visual and behavioural options for individual tree nodes.
 *
 * Controls borders, background colors, hover states, expand/collapse
 * buttons, the collapse-count badge, node dimensions, and the optional
 * custom `nodeTemplate` renderer. All fields have sensible defaults and
 * can be overridden globally via `TreeOptions` or per-node via
 * `NestedNode.options`.
 */
export declare interface NodeOptions {
    /** Border color of nodes in their default state. @default '#BCBCBC' */
    readonly borderColor: string;
    /** Border color of nodes on hover. @default '#5C6BC0' */
    readonly borderColorHover: string;
    /** CSS border-radius for nodes, e.g. `'5px'`. @default '5px' */
    readonly borderRadius: string;
    /** CSS border-style for nodes. @default 'solid' */
    readonly borderStyle: string;
    /** Border width of nodes in pixels. @default 1 */
    readonly borderWidth: number;
    /**
     * Where the built-in org-card places the avatar: `'left'` (avatar beside the
     * text) or `'top'` (avatar centered above the text — below it for
     * `direction: 'bottom'`, so it sits on the parent-facing edge). Custom
     * `nodeTemplate`s receive this via {@link NodeTemplateContext}. @default 'left'
     */
    readonly cardImagePosition: 'left' | 'top';
    /** Background color of the collapse-count badge. @default '#5C6BC0' */
    readonly collapseBadgeBGColor: string;
    /** Show the collapse-count badge on collapsed nodes. @default true */
    readonly collapseBadgeEnabled: boolean;
    /** Font color of the collapse-count badge. @default '#FFFFFF' */
    readonly collapseBadgeFontColor: string;
    /** Font size of the collapse-count badge. @default '12px' */
    readonly collapseBadgeFontSize: string;
    /** Minimum number of hidden children required before the badge appears. @default 1 */
    readonly collapseBadgeThreshold: number;
    /** Show expand/collapse buttons on nodes that have children. @default true */
    readonly enableExpandCollapse: boolean;
    /**
     * When `true`, clicking anywhere on a node with children (or with
     * collapsed `hiddenChildren`) toggles its expansion — making the node
     * body itself act as the expand/collapse trigger. The cursor becomes a
     * pointer on these nodes to signal clickability.
     *
     * Works alongside `enableExpandCollapse` (the dedicated `+`/`-` button)
     * and `onNodeClick` (which fires after the toggle so the user callback
     * sees the post-toggle node state).
     *
     * @default false
     */
    readonly expandCollapseOnNodeClick: boolean;
    /** Background color of the expand/collapse button. @default '#FFFFFF' */
    readonly expandCollapseButtonBGColor: string;
    /** Border color of the expand/collapse button. @default '#BCBCBC' */
    readonly expandCollapseButtonBorderColor: string;
    /**
     * Render the node's label outside its bounds (above/below/beside the node)
     * instead of inside the `nodeTemplate`. See {@link ExternalLabelOptions}.
     *
     * When `enabled`, the in-node template is suppressed for that node and
     * the label is drawn as an SVG `<text>` element with optional offset
     * and rotation. Useful for marker-style nodes (small circles) with
     * floating labels.
     *
     * @default { enabled: false }
     */
    readonly externalLabel: ExternalLabelOptions;
    /** Spacing between stacked leaf nodes when `groupLeafNodes` is true, in pixels. @default 10 */
    readonly groupLeafNodesSpacing: number;
    /** Default background color of nodes. @default '#FFFFFF' */
    readonly nodeBGColor: string;
    /** Background color of nodes on hover. @default '#FFFFFF' */
    readonly nodeBGColorHover: string;
    /** CSS class name added to every node element. @default 'apextree-node' */
    readonly nodeClassName: string;
    /** Height of each node in pixels. @default 30 */
    readonly nodeHeight: number;
    /**
     * CSS `box-shadow` applied to nodes in their default state.
     * Set to an empty string to disable the drop shadow.
     * @default '0 1px 2px rgba(16,24,40,0.06), 0 1px 3px rgba(16,24,40,0.1)'
     */
    readonly nodeShadow: string;
    /**
     * CSS `box-shadow` applied to nodes on hover. Paired with a subtle lift
     * via `translateY(-1px)`. Set to an empty string to keep the shadow constant.
     * @default '0 4px 6px -1px rgba(16,24,40,0.1), 0 2px 4px -2px rgba(16,24,40,0.1)'
     */
    readonly nodeShadowHover: string;
    /** Inline CSS string applied to each node element. */
    readonly nodeStyle: string;
    /**
     * Custom function returning an HTML string rendered inside each node.
     * Receives the value at `contentKey` on the node data — typically a string,
     * but may be any shape when `contentKey` points at a nested object.
     *
     * The HTML is rendered inside an SVG `<foreignObject>`. To stay correct in
     * Safari under a scaled viewBox, avoid CSS that creates a paint layer or
     * stacking context on the template's elements: `position`
     * (relative/absolute/fixed/sticky), `opacity` < 1, `transform`, `filter`,
     * `z-index`, `will-change`, `mix-blend-mode`, `isolation: isolate`. Use
     * flex/grid layout with DOM order and `color`-based dimming instead. ApexTree
     * logs a one-time `console.warn` if a template trips this. See the "Custom
     * template" section of the README.
     *
     * A second `context` argument ({@link NodeTemplateContext}) carries the tree
     * `direction` and resolved `cardImagePosition`, so templates can adapt their
     * layout without reading globals.
     */
    readonly nodeTemplate: (content: unknown, context?: NodeTemplateContext) => string;
    /** Width of each node in pixels. @default 50 */
    readonly nodeWidth: number;
    /** Callback fired when the user clicks a node. Receives the raw node data object. */
    readonly onNodeClick?: (node: unknown) => void;
}

/**
 * Context passed as the second argument to a `nodeTemplate`, so templates can
 * adapt to layout-level settings without reading globals. The built-in card
 * uses it to honour `cardImagePosition` and to place the avatar on the
 * parent-facing edge per `direction`. Custom templates may ignore it.
 */
export declare interface NodeTemplateContext {
    /** Where the built-in card renders the avatar. Mirrors the `cardImagePosition` option. */
    readonly cardImagePosition: 'left' | 'top';
    /** The tree's growth direction. */
    readonly direction: TreeDirection;
}

/**
 * Optional canonical shape for node content when using `contentKey: 'data'`
 * (or any other nested key). The built-in node template understands these
 * fields and lays them out as a professional org-chart card: avatar on the
 * left, name/title/subtitle stacked, an optional status chip, and an
 * optional coloured left stripe (`accentColor`).
 *
 * None of the fields are required — supplying only `name` renders a simple
 * centered label identical to the pre-`OrgNodeData` behaviour, so existing
 * integrations are unaffected.
 */
export declare interface OrgNodeData {
    /**
     * Colored left stripe on the card, useful for categorising roles or
     * departments. Any valid CSS color.
     */
    readonly accentColor?: string;
    /**
     * Status chip shown in the upper-right corner of the card.
     * - `text` — chip label (required on the badge, not on the node).
     * - `color` — chip background color; defaults to a soft indigo.
     */
    readonly badge?: {
        color?: string;
        text: string;
    };
    /** Avatar URL rendered as a circular image on the card (40px left layout, 48px top layout). */
    readonly imageURL?: string;
    /**
     * Extra metadata rows rendered under the title/subtitle as icon + label
     * lines. `icon` is an optional CSS class for an icon font (e.g. Bootstrap
     * Icons `'bi bi-person'`); omit it for a plain text row.
     */
    readonly meta?: ReadonlyArray<{
        icon?: string;
        label: string;
    }>;
    /** Primary display label. Equivalent to the top-level `NestedNode.name`. */
    readonly name?: string;
    /** Third line — typically a department or team. Smaller / lower contrast. */
    readonly subtitle?: string;
    /** Second line — typically a job title. Medium size, lower contrast. */
    readonly title?: string;
}

declare class Paper {
    protected chartContext: ChartContext;
    private readonly height;
    private readonly width;
    private readonly containerElement;
    canvas: SvgCanvas;
    constructor(element: HTMLElement, width: number, height: number, canvasStyle: string, chartContext: ChartContext, enableZoomPan?: boolean);
    static drawCircle(attributes?: CircleAttr): Circle;
    static drawGroup(x?: number, y?: number, id?: string, parent?: string): G;
    /**
     * Create the per-node `<g data-self>` wrapper. Unlike `drawGroup`, this
     * carries NO `transform` attribute — node positioning is split between the
     * child `<foreignObject>`'s `x`/`y` attributes (which Safari honors) and the
     * sibling `<g class="apextree-node-svg">` decorations container's own
     * transform. Putting the translate on the wrapper triggers a Safari paint
     * bug where any foreignObject descendant with `position:relative` collapses
     * to the SVG canvas origin (see WEBKIT_NOTE in NodeRenderer). The absolute
     * (X, Y) is stored as `data-x`/`data-y` so the slide animation can recover
     * it without parsing transforms.
     */
    static drawNodeWrapper(x: number, y: number, id?: string, parent?: string): G;
    static drawPath(pathString: string, { borderColor, id }?: {
        borderColor?: string | undefined;
        id?: string | undefined;
    }): Path;
    static drawRect({ color, height, opacity, radius, width, x1, y1, }?: {
        color?: string;
        height?: number;
        opacity?: number;
        radius?: number;
        width?: number;
        x1?: number;
        y1?: number;
    }): Rect;
    static drawSvgIcon(svgMarkup: string): WrappedEl;
    static drawTemplate(template: string, { nodeHeight, nodeWidth }?: Partial<NodeOptions>): ForeignObject;
    static drawText(text: string | undefined, { dx, dy, x, y }: Partial<TextAttr>): Text_2;
    add(element: WrappedEl): void;
    clear(): void;
    exportToSvg(): void;
    resetViewBox(): void;
    updateViewBox(x: number, y: number, width: number, height: number): void;
    resetPanZoomBase(): void;
    zoom(zoomFactor: number): void;
    getContainerElement(): HTMLElement;
    /**
     * Apply WAI-ARIA tree semantics to the root SVG canvas element.
     *
     * Sets `role="tree"`, `aria-label`, and `aria-multiselectable` (true only
     * when `selectionMode === 'multi'`). Also injects the focus-ring and
     * selection-ring stylesheets that styling user interactions depend on.
     */
    setTreeA11yAttributes(label: string, selectionMode?: 'multi' | 'single' | false): void;
}

export { TextDirection }

/**
 * Options for the hover tooltip shown above each tree node.
 *
 * Enable with `enableTooltip: true`. Supply a `tooltipTemplate` function to
 * render custom HTML; otherwise the default template shows the node `name`.
 */
export declare interface TooltipOptions {
    /** Show a tooltip on node hover. @default false */
    readonly enableTooltip: boolean;
    /** Background color of the tooltip. @default '#FFFFFF' */
    readonly tooltipBGColor: string;
    /** Border color of the tooltip. @default '#BCBCBC' */
    readonly tooltipBorderColor: string;
    /** Font color of tooltip text. @default '#000000' */
    readonly tooltipFontColor: string;
    /** Font size of tooltip text. @default '12px' */
    readonly tooltipFontSize: string;
    /** HTML `id` for the tooltip container element. @default 'apextree-tooltip-container' */
    readonly tooltipId: string;
    /** Maximum width of the tooltip in pixels. `undefined` means unconstrained. */
    readonly tooltipMaxWidth: number | undefined;
    /** Minimum width of the tooltip in pixels. @default 100 */
    readonly tooltipMinWidth: number;
    /** Inner padding of the tooltip in pixels. Set to 0 when using a custom `tooltipTemplate`. @default 8 */
    readonly tooltipPadding: number;
    /** Custom function returning an HTML string for the tooltip content. */
    readonly tooltipTemplate?: (content: string) => string;
    /** Distance between the tooltip and the cursor in pixels. @default 10 */
    readonly tooltipOffset: number;
}

/**
 * Controls the direction the tree grows from the root node.
 *
 * - `'top'` — root at the top, children flow downward (default)
 * - `'bottom'` — root at the bottom, children flow upward
 * - `'left'` — root on the left, children flow rightward
 * - `'right'` — root on the right, children flow leftward
 */
export declare type TreeDirection = 'bottom' | 'left' | 'right' | 'top';

/**
 * Every user-facing string rendered by the tree.
 *
 * Override any subset via {@link LocaleOptions.messages}; unset keys fall back
 * to their English defaults ({@link DEFAULT_TREE_MESSAGES}). Strings that embed
 * runtime values are functions so each locale controls grammar and pluralization.
 */
export declare interface TreeMessages {
    /** Breadcrumb `<nav>` aria-label. @default 'Tree path' */
    readonly breadcrumbAriaLabel: string;
    /** Collapse-button aria-label. @default 'Collapse node' */
    readonly collapseNodeLabel: string;
    /** Expand-button aria-label. @default 'Expand node' */
    readonly expandNodeLabel: string;
    /** Builds a node's aria-label. @default `${name}, level ${level}, ${position} of ${total}${state}` */
    readonly nodeAriaLabel: (ctx: NodeAriaContext) => string;
    /** Root SVG aria-label. @default 'Organizational chart' */
    readonly rootAriaLabel: string;
    /** Search input aria-label. @default 'Search tree nodes' */
    readonly searchAriaLabel: string;
    /** Builds the search match-count text. @default `${n} match` / `${n} matches` */
    readonly searchMatchCount: (count: number) => string;
    /** Search input placeholder. @default 'Search nodes…' */
    readonly searchPlaceholder: string;
}

/**
 * Full configuration type for `ApexTree`. An intersection of all sub-option
 * interfaces: `CommonOptions & EdgeOptions & FontOptions & NodeOptions & TooltipOptions`.
 *
 * Pass a `Partial<TreeOptions>` to the constructor — all fields have defaults.
 * For per-node overrides supply `options` on individual `NestedNode` objects.
 */
export declare type TreeOptions = CommonOptions & EdgeOptions & FontOptions & NodeOptions & TooltipOptions;

/**
 * Node selection behaviour.
 *
 * - `false` — selection disabled (default). Nodes still receive focus and
 *   hover states, but clicking doesn't persist a selection ring.
 * - `'single'` — clicking a node selects it; a second click (or clicking
 *   elsewhere with `setSelection([])`) clears the previous selection.
 * - `'multi'` — clicking toggles the node in/out of the selection; any
 *   number of nodes can be selected simultaneously.
 */
export declare type TreeSelectionMode = 'multi' | 'single' | false;

/**
 * Built-in theme presets applied via CSS custom properties.
 *
 * - `'light'` — default. Soft neutrals suitable for most pages.
 * - `'dark'` — dark palette with slate backgrounds and muted edge colors;
 *   suitable for dark-mode apps and high-contrast presentations.
 * - `'custom'` — disables built-in CSS variable injection so any variables
 *   the host page sets on the container (or a parent) win without being
 *   overridden.
 */
export declare type TreeTheme = 'custom' | 'dark' | 'light';

export { }
