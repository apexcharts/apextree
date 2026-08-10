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
    private commandPaletteControl;
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
 * Auto-measure each node's height from its rendered content, keeping the width
 * fixed. When `enabled`, before layout ApexTree renders each node's
 * `nodeTemplate(content)` into an offscreen box at the node's own width (its
 * per-node `nodeWidth` or the global) and sets the node height to fit, so cards
 * with more text grow taller instead of clipping. See {@link NodeOptions.autoNodeHeight}.
 *
 * Requires a DOM: under SSR (or any environment without `document`, including
 * pre-paint in jsdom) every node falls back to the global `nodeHeight`, so the
 * layout stays deterministic. A node with an explicit per-node
 * `options.nodeHeight` is left at that height (an explicit size wins over
 * measurement). Set `options.autoNodeHeight = { enabled: false }` on a single
 * node to opt it out.
 *
 * Scope: regular nodes in the cartesian directions (`top`/`bottom`/`left`/`right`).
 * Grouped-leaf stacks (`groupLeafNodes`) and the radial layout stay at the
 * uniform global height. Measurement reads text/box geometry only; images that
 * load after the measure pass (e.g. remote avatars) do not re-trigger it.
 *
 * Inert unless `enabled` is true, so existing charts are unaffected.
 */
export declare interface AutoNodeHeightOptions {
    /**
     * Measure each node's content height and size the node to fit (fixed width).
     * @default false
     */
    readonly enabled: boolean;
    /**
     * Extra vertical padding added to the measured content height, in pixels.
     * Useful to give the auto-sized card a little breathing room.
     * @default 0
     */
    readonly extraHeight?: number;
    /**
     * Upper clamp for the measured height, in pixels. Content taller than this is
     * capped (and clipped by the node's `overflow: hidden`). `0` means no cap.
     * @default 0
     */
    readonly maxHeight?: number;
    /**
     * Lower clamp for the measured height, in pixels, so short cards don't shrink
     * below a baseline. `0` means no floor.
     * @default 0
     */
    readonly minHeight?: number;
}

/**
 * Expandable-card options. A node's card can expand in place to reveal a detail
 * section, independent of expanding/collapsing its children. The imperative API
 * (`graph.expandCard(id)` / `collapseCard(id)` / `toggleCard(id)`) is always
 * available; the built-in card shows a chevron affordance automatically when a
 * node has detail content. See the "Expandable cards" section of the README.
 *
 * Expanding only grows a card's height when the height can change, i.e. with
 * `autoNodeHeight` enabled (or a large enough explicit `nodeHeight`). Cartesian
 * directions only.
 */
export declare interface CardExpansionOptions {
    /**
     * Toggle a node's card by clicking anywhere on it (not only the chevron).
     * Clicks on the expand/collapse-children button still toggle children, not
     * the card.
     * @default false
     */
    readonly clickToExpand?: boolean;
}

export declare interface CommonOptions {
    /** WCAG accessibility options. Disable or customise the SVG `aria-label`. */
    readonly a11y?: A11yOptions;
    /**
     * Lazy-load a node's children on first expand. When a node is marked
     * `hasChildren: true` with no loaded `children`, expanding it shows a loading
     * spinner and calls this function; return (or resolve to) the child
     * `NestedNode`s and ApexTree splices them in and reflows. Return an empty array
     * for a node that turned out to have none (its expand affordance is then
     * dropped). A rejected promise leaves the node collapsed so the user can retry.
     * See the "Lazy children" README section.
     */
    readonly loadChildren?: (context: LazyChildrenContext) => Promise<NestedNode[] | null | undefined>;
    /**
     * Expandable-card behaviour. See {@link CardExpansionOptions}. The
     * `expandCard`/`collapseCard`/`toggleCard` API works regardless; this opts
     * into the click-anywhere gesture.
     * @default { clickToExpand: false }
     */
    readonly cardExpansion?: CardExpansionOptions;
    /** Arbitrary CSS injected onto the SVG root container element. */
    readonly canvasStyle: string;
    /** Vertical distance between a parent node and its children in pixels. @default 50 */
    readonly childrenSpacing: number;
    /** CSS class name for the root SVG container element. @default 'root' */
    readonly containerClassName: string;
    /** Key in the data object used as the node display label. @default 'name' */
    readonly contentKey: string;
    /** Direction the tree grows from the root. `'top'` | `'bottom'` | `'left'` | `'right'` | `'radial'` (root centred, rings radiate outward). @default 'top' */
    readonly direction: TreeDirection;
    /**
     * Rank placement. `'tree'` places each node at its own depth; `'cluster'`
     * pins every leaf to the deepest rank so leaves line up on the outer ring
     * (radial) or the bottom row (cartesian) — the classic dendrogram look.
     * @default 'tree'
     */
    readonly layoutType: TreeLayoutType;
    /** Animate node expansion/collapse transitions. @default true */
    readonly enableAnimation: boolean;
    /** Motion tuning for spring-driven collapse/expand and camera transitions. */
    readonly motion?: MotionOptions;
    /**
     * Focus ("spotlight") mode. `graph.focus(id)` dims everything outside the
     * node's lineage and visible subtree and springs the camera to frame the
     * subtree; `graph.clearFocus()` or Escape restores the full view. See
     * {@link FocusOptions} for the click gesture and dim strength.
     * @default { clickToFocus: false, dimOpacity: 0.7 }
     */
    readonly focus?: FocusOptions_2;
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
     * Caps how far the camera zooms IN when it re-fits after a collapse/expand,
     * so a view of just a few remaining nodes doesn't balloon to fill the canvas.
     * The fitted view always spans at least this many node-widths and
     * node-heights, centred on the visible nodes. Larger means less zoom-in; set
     * to `0` to disable the cap and fit tightly.
     *
     * The cap never shrinks the chart below 1:1: it stops widening the fit once a
     * node would draw at its authored `nodeWidth` in CSS pixels, because past that
     * point nodes are already smaller than authored and there is no ballooning
     * left to prevent. A chart narrower than `maxZoomNodeSpan` node-widths (a
     * small card, a dashboard tile) therefore keeps its tight fit instead of being
     * scaled down on every collapse.
     *
     * Only affects the auto-fit path (`enableExpandCollapseZoom: true`); focus
     * mode keeps its own tighter framing.
     * @default 8
     */
    readonly maxZoomNodeSpan: number;
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
     * Enable a command palette overlay opened with `Cmd/Ctrl + K`. Type to jump to
     * a node (fuzzy label match, Enter to center it) or run a quick action (expand
     * all, collapse all, fit to screen). A plain DOM overlay (Safari-safe),
     * keyboard-navigable, and dismissed with Escape.
     * @default false
     */
    readonly enableCommandPalette: boolean;
    /**
     * Semantic zoom / level-of-detail: render lighter node content as the tree is
     * zoomed out (full card → name → dot). See {@link SemanticZoomOptions}.
     * @default { enabled: false }
     */
    readonly semanticZoom: SemanticZoomOptions;
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
 * How the number shown in a node's count badge is derived.
 *
 * - `'descendants'` — total number of descendants across all levels (default).
 *   Unaffected by collapse state: collapsing a branch does not change the count.
 * - `'children'` — number of direct children only.
 * - `'data'` — read the number from a per-node field named by
 *   `countBadgeDataKey` (default `'count'`), so you can display any metric
 *   (head-count, open tickets, revenue, …) instead of a structural count.
 */
export declare type CountBadgeSource = 'children' | 'data' | 'descendants';

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

/**
 * Animated "active path" flow along a set of edges. Call
 * `graph.setActivePath(nodeIds)` to light up the lineage from the root to one
 * or more nodes: those edges recolor and a dashed pulse travels along them, so
 * the path reads as live. `graph.clearActivePath()` restores them.
 *
 * The animation is a marching stroke-dash on the plain SVG edge path (never a
 * foreignObject), so it is Safari-safe, and it is disabled under
 * `prefers-reduced-motion` — active edges then stay statically highlighted.
 * Inert until a path is set, so existing charts are unaffected.
 */
export declare interface EdgeFlowOptions {
    /** Stroke color of an active (flowing) edge. @default '#5C6BC0' */
    readonly color?: string;
    /** Length of each dash in the marching pattern, in pixels. @default 8 */
    readonly dashLength?: number;
    /**
     * Direction the dashes travel: `'toChild'` flows root → leaf, `'toParent'`
     * flows leaf → root.
     * @default 'toChild'
     */
    readonly direction?: 'toChild' | 'toParent';
    /**
     * Automatically set the active path to a node's lineage when focus mode
     * spotlights it (`graph.focus(id)` / click-to-focus), and clear it on
     * `clearFocus()`.
     * @default false
     */
    readonly followFocus?: boolean;
    /** Gap between dashes in the marching pattern, in pixels. @default 6 */
    readonly gapLength?: number;
    /** Flow speed in SVG units per second (how fast the dashes travel). @default 60 */
    readonly speed?: number;
    /** Stroke width of an active edge, in pixels. @default 2 */
    readonly width?: number;
}

export declare interface EdgeOptions {
    /** Color of the connecting lines between nodes. @default '#D0D5DD' */
    readonly edgeColor: string;
    /**
     * Animated "active path" flow. Style for the edges lit up by
     * `graph.setActivePath(nodeIds)`. See {@link EdgeFlowOptions}.
     * @default { color: '#5C6BC0', width: 2, speed: 60, dashLength: 8, gapLength: 6, direction: 'toChild', followFocus: false }
     */
    readonly edgeFlow: EdgeFlowOptions;
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
 * How external labels are thinned out when they would overlap in a dense
 * radial layout. See {@link ExternalLabelOptions.collisionStrategy}.
 *
 * - `'none'` — render every label (default; may overlap when dense).
 * - `'hide'` — hide labels that lack tangential room on their ring, keeping a
 *   maximal, evenly-spaced subset. Well-separated labels always survive.
 * - `'leaves'` — additionally drop every inner-node label, labelling only
 *   leaves (then still thinning crowded leaves by arc length).
 */
export declare type ExternalLabelCollision = 'hide' | 'leaves' | 'none';

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
     * How to thin external labels that would overlap in a dense radial layout.
     * In a tidy radial `'tree'` layout the inner rings have little arc length,
     * so labels on crowded rings collide; this declutters them. See
     * {@link ExternalLabelCollision} for the strategies.
     *
     * Only applies to `direction: 'radial'`; ignored for cartesian layouts.
     * The spacing threshold is derived from the label `fontSize`.
     * @default 'none'
     */
    readonly collisionStrategy?: ExternalLabelCollision;
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
 * Focus ("spotlight") mode options. Programmatic focus via `graph.focus(id)` /
 * `graph.clearFocus()` is always available; these options tune the visuals and
 * opt into the click gesture.
 */
declare interface FocusOptions_2 {
    /**
     * Focus a node when its card is clicked. Clicking the focused node again,
     * or pressing Escape, clears the spotlight. Clicks on the expand/collapse
     * button keep toggling the subtree as usual.
     * @default false
     */
    readonly clickToFocus?: boolean;
    /**
     * Strength of the dim applied outside the focused lineage and subtree,
     * from `0` (no dim) to `1` (fully hidden).
     * @default 0.7
     */
    readonly dimOpacity?: number;
}
export { FocusOptions_2 as FocusOptions }

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
    /** Focus/spotlight state manager (created lazily on first `focus()` call). */
    private focusController;
    private activePathController;
    private cardExpansionController;
    /** Tracks which node IDs were visible before the last render (for diff animation). */
    private prevNodeIds;
    /** True after the first rAF fires — before this, viewBox changes snap instantly. */
    private initialSetupDone;
    /** Shared spring integrator; created lazily on first use. Owns node/edge/camera motion. */
    private motion;
    /** Persistent node renderer, reused across reconciled renders so wrapper handlers stay valid. */
    private renderer;
    /** The current `<g>` wrapper for all nodes/edges. Retained so reconcile can append into it. */
    private mainGroup;
    /** Node id most recently toggled — drives the wave stagger origin. */
    private lastPivotId;
    /**
     * Accumulated graph-level node positions across collapse/expand operations.
     * Unlike a per-operation snapshot, this map is never cleared — it retains
     * positions for nodes that were hidden in earlier operations so they can be
     * restored when those nodes reappear (e.g. expand after collapse).
     */
    private savedGraphPositions;
    /** Offscreen content-height measurer for `autoNodeHeight`. Reused across renders; caches by content. */
    private readonly nodeMeasurer;
    /**
     * Fit box of the FULL (uncollapsed) tree, captured whenever a layout runs with
     * nothing collapsed. Used as the ceiling for the collapse/expand zoom-in cap so
     * a collapsed view never zooms out past the full tree. `null` until first layout.
     */
    private baseContentSize;
    /** Current semantic-zoom level-of-detail tier; `'full'` when semanticZoom is off. */
    private lodTier;
    /** True once the zoom listener that drives semantic zoom is attached. */
    private lodZoomBound;
    /** Debounce handle for recomputing the LOD tier after a zoom gesture settles. */
    private lodDebounce;
    /** Ids whose lazy children are currently being fetched (show a spinner). */
    private loadingNodes;
    /**
     * Ids whose lazy `loadChildren` has already resolved (even to zero children),
     * so a re-expand does not fetch again. A rejected load is intentionally left
     * out so the user can retry.
     */
    private lazyResolvedNodes;
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
    /**
     * Phase B of measured sizing: when `autoNodeHeight` is enabled, overwrite each
     * regular node's graph-label height with the height its `nodeTemplate` content
     * needs at the node's fixed width. This runs after `setNodesRecursively` (so
     * every label already carries its per-node/global size) and before
     * `calculateLayout`, so the tidy layout and camera consume the measured heights.
     *
     * Left uniform / untouched: nodes with an explicit per-node `options.nodeHeight`
     * (an explicit size wins), external-label markers (no in-node content),
     * grouped-leaf pseudo-nodes, and the radial layout. With no DOM the measurer
     * returns `null` and the global height set by `setNodesRecursively` stands.
     */
    private measureNodeHeights;
    private setNodesRecursively;
    /**
     * Build a depth map for all current graph nodes (root = 0).
     * Used to drive rank-wave stagger delays during entrance animations.
     */
    private buildDepthMap;
    /**
     * The tight bounding box (plus padding) around every currently-laid-out node.
     * No zoom clamp — this is the raw content extent, used both as the fit target
     * and as the "full tree" ceiling for the zoom-in cap.
     */
    private rawContentBox;
    /** Whether any node currently has collapsed (hidden) children. */
    private hasCollapsedNodes;
    /**
     * The chart's on-screen size in CSS pixels, or `null` when it cannot be
     * measured (SSR, detached container, jsdom). Same reference the semantic-zoom
     * tier measures against, so "how big a node looks" means the same thing to
     * both features.
     */
    private viewportSize;
    /**
     * Compute the auto-fit bounding box for collapse/expand. The zoom-in cap
     * (`maxZoomNodeSpan`) keeps a collapsed view of a few nodes from ballooning,
     * bounded by two things it must never grow past:
     *
     * - the full-tree extent (`baseContentSize`), because collapsing only removes
     *   content, so the fit must never zoom further OUT than the whole tree (a
     *   wide-node chart would otherwise scale down on collapse); and
     * - the chart's own pixel size, which makes the cap a bound on scale instead
     *   of on layout units. Below 1:1 nodes already draw smaller than authored,
     *   so there is no ballooning left to cap, and capping anyway just shrinks
     *   every small chart on collapse.
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
    /**
     * Grow a first render out of the root: every node starts stacked on the root
     * and springs outward to its own place, staggered by depth, using the same
     * enter reveal that expanding a node uses.
     *
     * Previously a first render placed every node at its final position and only
     * wiped it in place — no node ever moved — while expanding a node made its
     * children travel out of it. That asymmetry is what read as "the nodes don't
     * animate": the only motion on screen belonged to the edges.
     *
     * Routing edges through `reconcileEdges` fixes lines-before-nodes as a
     * consequence rather than as a timing trick: an edge is derived from its two
     * endpoint springs every frame, so it has no length at all while both of its
     * ends are still stacked on the root, and it grows only as they separate.
     *
     * Returns false when there is nothing to animate, so the caller can fall back
     * to the per-node WAAPI entrance.
     */
    private seedInitialEntrance;
    /**
     * Fade an element out and remove it, or remove it immediately when animation
     * is off / unavailable. Used for connectors that are obsolete rather than
     * retracting, so they leave without snapping out of existence.
     */
    private fadeOutAndRemove;
    /**
     * Wire the hover draw-on styling every edge needs, independent of whichever
     * entrance path ran.
     */
    private wireEdgeHoverAnimations;
    private runEdgeAnimations;
    changeLayout(direction?: TreeDirection): void;
    collapse(nodeId: string): void;
    /**
     * Flip a single node's collapsed state in the node map WITHOUT re-rendering,
     * returning whether anything changed. Collapsing moves visible `children` into
     * `hiddenChildren`; expanding does the reverse. The single-node `collapse` /
     * `expand` verbs and every batch verb share this so their state math is
     * identical — they differ only in which nodes they touch and when they reflow.
     */
    private setNodeCollapsed;
    /** Every child of a node, whether currently visible or collapsed away. */
    private fullChildrenOf;
    /**
     * Re-lay-out and render once after a (possibly batched) set of collapse/expand
     * mutations. Mirrors the single-node path: snapshot positions, set the
     * wave-stagger pivot, rebuild the graph, and render in the given reflow mode so
     * the whole set springs together in one wave (not one render per node).
     */
    private reflowBatch;
    /**
     * Expand every node in the tree at once (a single reflow). No-op if nothing is
     * collapsed.
     */
    expandAll(): void;
    /**
     * Collapse every node in the tree at once, leaving only the root visible (a
     * single reflow). No-op if everything is already collapsed. Each level keeps
     * its own collapsed state, so a later `expand` reveals one level at a time.
     */
    collapseAll(): void;
    /**
     * Show the tree down to `depth` (root = 0): nodes shallower than `depth` stay
     * expanded, nodes at or below it are collapsed. `expandToDepth(0)` shows only
     * the root; `expandToDepth(1)` shows the root and its direct children. A single
     * reflow.
     */
    expandToDepth(depth: number): void;
    /** Expand a node and every one of its descendants (a single reflow). */
    expandSubtree(nodeId: string): void;
    /**
     * Collapse a node and every one of its descendants (a single reflow), so
     * re-expanding the node reveals its subtree one level at a time.
     */
    collapseSubtree(nodeId: string): void;
    /** Shared walk for `expandSubtree` / `collapseSubtree`. */
    private reflowSubtree;
    construct(data: NestedNode): void;
    /**
     * Swap in a new dataset and reconcile to it instead of rebuilding the chart.
     *
     * Nodes present in both datasets keep their DOM wrapper and spring from where
     * they are to where the new layout puts them; nodes only in the new data enter
     * from their parent; nodes only in the old data retract and exit. Because
     * wrappers survive, so does everything the browser hangs off them (keyboard
     * focus, hover, text selection) as well as ApexTree's own per-node state.
     *
     * This is the path for live data: a websocket tick, a poll, a filter change,
     * or stepping between historical snapshots. Use `tree.render(data)` only for
     * the first render, since it also (re)builds the toolbar and other chrome.
     *
     * Falls back to a full rebuild when animation is disabled or before the first
     * render has settled, so the end state is identical either way.
     */
    updateData(data: NestedNode): void;
    expand(nodeId: string): void;
    /**
     * Whether a node advertises children (`hasChildren`) that have not been loaded
     * yet — none currently visible or collapsed, and its `loadChildren` has not
     * already resolved. Such a node shows an expand affordance that triggers a
     * fetch instead of a plain expand.
     */
    private isLazyUnloaded;
    /** Whether a node's lazy children are currently being fetched. */
    private isNodeLoading;
    /**
     * If `nodeId` is a lazy-unloaded node with a configured `loadChildren`, kick off
     * the fetch (showing a spinner) and return `true` so the caller skips the plain
     * expand. Re-clicks while a fetch is in flight are swallowed. Returns `false`
     * for a normal node, so expand proceeds as usual.
     */
    private tryLoadLazyChildren;
    /**
     * Splice freshly-loaded children into the node map under `parentId` and reflow.
     * An empty result just drops the node's loading spinner (and, since it is now
     * resolved with no children, its expand affordance).
     */
    private attachLazyChildren;
    /**
     * Add node-map entries for a lazily-loaded subtree (mirrors `processNodes`),
     * wiring each node's `parent` and flattening `children` to id arrays. Returns
     * the top-level child ids to attach to the parent.
     */
    private insertLazySubtree;
    /**
     * Re-render just enough to reflect a node's changed loading/lazy state (the
     * spinner appearing or clearing). Runs through the normal reflow so the
     * signature-driven reconcile rebuilds only that node's content; the layout is
     * unchanged, so nothing moves.
     */
    private refreshNodeContent;
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
    /**
     * Spotlight a node: dim everything outside its lineage and visible subtree,
     * and spring the camera to frame the subtree. Clears with `clearFocus()`,
     * pressing Escape, or focusing another node. Focus survives collapse/expand
     * and layout changes as long as the node stays rendered.
     *
     * @param nodeId - Id of the node to spotlight.
     * @returns `true` when applied; `false` when the node is unknown or not
     *   currently rendered (e.g. hidden inside a collapsed ancestor).
     */
    focus(nodeId: string): boolean;
    /** Remove the spotlight (if any) and spring the camera back to the whole tree. */
    clearFocus(): void;
    /**
     * Light up the "active path": the lineage from the root down to each given
     * node. Those edges recolor and a dashed pulse flows along them (see
     * {@link EdgeFlowOptions}). Pass a single id or a list; an empty list clears.
     * Survives collapse/expand — the path is re-asserted after every render.
     *
     * @param nodeIds - One id, or a list of ids, to trace back to the root.
     */
    setActivePath(nodeIds: string | string[]): void;
    /** Clear the active-path flow, restoring edges to their normal styling. */
    clearActivePath(): void;
    /** The node ids whose lineage is currently flowing, or `[]` when inactive. */
    getActivePath(): string[];
    private ensureActivePathController;
    /**
     * Expand a node's card in place to reveal its detail section (distinct from
     * expanding its children). The card re-measures and the tree springs to fit
     * when `autoNodeHeight` is on. No-op for an unknown or already-expanded node.
     */
    expandCard(nodeId: string): void;
    /** Collapse a node's expanded card. No-op if it is not expanded. */
    collapseCard(nodeId: string): void;
    /** Toggle a node's expanded card. No-op for an unknown node. */
    toggleCard(nodeId: string): void;
    /** Replace the set of expanded cards wholesale and reflow once. */
    setExpandedCards(nodeIds: readonly string[]): void;
    /** The ids of every currently-expanded card, or `[]` when none. */
    getExpandedCards(): string[];
    /**
     * Re-lay-out and reconcile after a card's expanded state changed. Mirrors
     * `expand()`/`collapse()`: snapshot positions, set the wave-stagger pivot, then
     * rebuild the graph (which re-measures the toggled card's height) and reconcile
     * so every node springs to its new place.
     */
    private reflowForCardToggle;
    private ensureCardExpansionController;
    /** Id of the currently spotlighted node, or `null` when focus mode is inactive. */
    getFocusedNodeId(): string | null;
    /** Click-to-focus behavior: clicking the focused node again clears the spotlight. */
    private toggleFocus;
    private ensureFocusController;
    /**
     * Move the camera to `rect` — through the camera spring when the chart is
     * live and animated, otherwise instantly. Mirrors `centerOnNode`.
     */
    private animateCameraTo;
    /**
     * Bounding box of a node plus its visible descendants (including grouped-leaf
     * containers), padded like the full-tree box and clamped to a sane minimum so
     * focusing a single leaf never zooms in past legibility.
     */
    private computeSubtreeBoundingBox;
    /**
     * Create the shared MotionEngine on first use. The engine outlives individual
     * renders so springs (and their velocity) persist across collapse/expand,
     * making the motion interruptible.
     */
    private ensureMotion;
    /**
     * Render dispatcher. An interactive collapse/expand is reconciled: persistent
     * node wrappers are kept and their springs retargeted, so motion is continuous
     * and interruptible. A data update reconciles the same way, so nodes present
     * in both datasets travel to their new positions instead of being destroyed
     * and rebuilt. Only the initial render, layout changes, and the grouped-leaf /
     * animation-disabled fallbacks go through a full rebuild.
     */
    render({ mode }?: {
        mode?: 'card-toggle' | 'collapse' | 'data-update' | 'expand' | 'initial' | 'lod';
    }): void;
    /** Resolved semantic-zoom config with defaults applied. */
    private resolveSemanticZoom;
    /**
     * Level-of-detail tier for the current zoom: how wide a node appears on screen
     * (its layout width scaled by container-px / viewBox-units) mapped through the
     * `semanticZoom` thresholds. Always `'full'` when semantic zoom is disabled or
     * geometry is unavailable (SSR/pre-layout), so the feature is inert by default.
     */
    private computeLodTier;
    /**
     * Width, in viewBox units, of the viewport a FIRST render will land at.
     *
     * A first render ends in `fitScreen()`, which frames the whole layout at its
     * natural size, so the tier must come from where the camera is going. Reading
     * the live viewBox would pick a tier for whatever framing preceded layout.
     *
     * Safe to compute here because semantic-zoom tiers do not change node
     * geometry (only which template variant renders inside a fixed box), so the
     * layout this measures cannot depend on the tier it produces.
     */
    private pendingViewBoxWidth;
    /**
     * The semantic-zoom tier this render should draw at.
     *
     * Semantic zoom is a response to ZOOM, and to nothing else:
     *
     * - `'lod'` — the render that exists *because* the zoom changed. Adopt the
     *   tier the live viewBox implies; this is the only path that moves the tier.
     * - first render / layout change — there is no current zoom to preserve, so
     *   use the framing `fitScreen` is about to apply.
     * - every structural edit (collapse, expand, card toggle, data update) —
     *   HOLD the on-screen tier. The auto-fit refit that follows does change how
     *   big nodes appear, but the viewer did not zoom, and re-tiering here
     *   restyles every card in response to something they never experienced as
     *   zooming. That is the "layout changed on collapse" report.
     */
    private resolveLodTierForRender;
    /**
     * Attach the zoom listener that drives semantic zoom (once, and only when it is
     * enabled). Trackpad pinch and Ctrl/⌘-wheel both arrive as `wheel` events; the
     * toolbar/keyboard zoom go through `zoom()`. Both funnel to a debounced tier
     * check so content re-tiers after the gesture settles, not on every frame.
     */
    private ensureLodZoomListener;
    /** Debounced tier re-check after a zoom gesture settles. */
    private scheduleLodRefresh;
    /**
     * Recompute the tier from the current zoom and, if it crossed a threshold,
     * swap node content in place. Node geometry is FIXED across tiers: the
     * layout, every node's position, and the camera stay exactly as they are;
     * only what renders inside each node's box changes. That is what makes the
     * transition seamless and keeps the feature config-free for dynamic data.
     */
    private refreshLodNow;
    /**
     * Step the zoom relative to what is on screen RIGHT NOW. The pan-zoom
     * plugin's internal accumulator drifts from the live viewBox after any
     * programmatic camera move (fit, focus, LOD pans), which used to make steps
     * hit its floor guard at a phantom value and get silently refused. Re-basing
     * on the live viewBox first makes every step multiplicative on the real
     * scale (`zoom(0.2)` = 20% in), so a step is never wrongly blocked. Zoom-out
     * bottoms out once the whole current layout fits with generous slack.
     * Toolbar / keyboard zoom also re-checks the LOD tier once it settles.
     */
    zoom(zoomFactor: number): void;
    /**
     * Create the persistent node renderer on first use. Reused across renders so
     * the wrapper-level interaction handlers it binds stay valid; per-render state
     * is refreshed via `renderer.update()` by each render path.
     */
    private ensureRenderer;
    /** Full rebuild: clear the canvas and re-create every node and edge from scratch. */
    private fullRender;
    /**
     * Reconciled collapse/expand: keep every persistent `g[data-self]` wrapper,
     * rebuild content only for nodes whose signature changed, and drive all
     * position/edge/camera motion through the shared spring engine. No `clear()`,
     * so node identity, focus, and selection survive — and there is no one-frame
     * flash because positions are written from spring values before the first paint.
     */
    private reconcileRender;
    /**
     * Keep, create, and register edge paths for a reconciled render. Persisted
     * paths are reused; new paths are created behind the nodes; every edge (plus
     * any retracting edge whose child is leaving) is registered with the motion
     * engine so its geometry follows the live spring positions of its endpoints.
     */
    private reconcileEdges;
    /** Apply root ARIA + (re)build the keyboard navigator after a full render. */
    private applyA11y;
}

/**
 * Context passed to the {@link CommonOptions.loadChildren} lazy loader when a
 * node marked `hasChildren` (but with no loaded children) is expanded.
 */
export declare interface LazyChildrenContext {
    /** Raw value at `contentKey` for the node being expanded. */
    readonly data: unknown;
    /** Id of the node whose children are being loaded. */
    readonly id: string;
    /** Display name of the node being expanded. */
    readonly name: string;
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
 * Level-of-detail tier for a node under {@link SemanticZoomOptions}. Derived
 * from how large the node appears on screen at the current zoom. The tier only
 * selects what the template renders inside the node's (fixed) box:
 *
 * - `'full'` (zoomed in): the complete node content.
 * - `'compact'` (mid zoom): a simplified plate; the built-in card shows name + role.
 * - `'dot'` (zoomed far out): an at-a-glance plate; the built-in card fills the box
 *   with the accent color and the name, so the whole tree stays readable.
 */
export declare type LodTier = 'compact' | 'dot' | 'full';

/**
 * Motion tuning for the spring-driven collapse/expand and camera transitions.
 * Springs preserve velocity, so a toggle that arrives mid-animation redirects
 * smoothly instead of restarting.
 */
export declare interface MotionOptions {
    /**
     * Spring feel used for node and camera motion.
     * `'crisp'` (default) is snappy and settles without visible overshoot;
     * `'gentle'` is softer for large reflows; `'snappy'` is faster.
     * @default 'crisp'
     */
    readonly spring?: MotionSpringPreset;
    /**
     * How the reflow propagates outward from the toggled node. `'wave'` (default)
     * staggers nodes by their distance from the pivot; `'none'` moves them together.
     * @default 'wave'
     */
    readonly stagger?: MotionStagger;
}

/**
 * Layout, canvas, and general behaviour options for the tree chart.
 *
 * This is the largest sub-group. It covers canvas dimensions, spacing between
 * nodes, grow direction, animation, the zoom/pan toolbar, and leaf-node
 * grouping. Compose with the other sub-option interfaces via `TreeOptions`.
 */
/** Named spring feel for collapse/expand and camera motion. */
export declare type MotionSpringPreset = 'crisp' | 'gentle' | 'snappy';

/** Stagger style for how a subtree reflows on collapse/expand. */
export declare type MotionStagger = 'wave' | 'none';

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
    /**
     * Mark a node as having children that aren't loaded yet. With `children: []`
     * and `hasChildren: true`, the node shows an expand affordance; expanding it
     * calls the `loadChildren` option to fetch and splice its children in. Ignored
     * when `children` is non-empty. See the "Lazy children" README section.
     */
    readonly hasChildren?: boolean;
    /** Unique identifier for this node. Must be stable across renders. */
    readonly id: string;
    /** Display label rendered inside the node element. */
    readonly name: string;
    /** Per-node overrides for font, border, tooltip, and other visual options. */
    readonly options?: Partial<FontOptions & NodeOptions & TooltipOptions>;
}

declare interface Node_2<T = undefined> {
    x: number;
    y: number;
    width: number;
    height: number;
    readonly children: Array<string>;
    readonly data: T;
    /** True when this node can lazy-load children (mirrors `NestedNode.hasChildren`). */
    readonly hasChildren?: boolean;
    readonly hiddenChildren: Array<string> | undefined;
    readonly id: string;
    readonly name: string;
    readonly onlyLeafNodes?: boolean;
    readonly options?: Partial<FontOptions & NodeOptions & TooltipOptions>;
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
    /**
     * Auto-measure each node's height from its content, keeping the width fixed.
     * See {@link AutoNodeHeightOptions}. Typically set globally; a per-node
     * `options.autoNodeHeight` can opt an individual node in or out.
     * @default { enabled: false }
     */
    readonly autoNodeHeight: AutoNodeHeightOptions;
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
    /**
     * Fill of the expand/collapse button while it is showing a collapsed node's
     * hidden-descendant count. @default '#5C6BC0'
     */
    readonly collapseBadgeBGColor: string;
    /**
     * Show a collapsed node's hidden-descendant count. The count is rendered INSIDE
     * the expand/collapse button, which widens to a pill and swaps its `+` glyph for
     * the number. Disable to keep the plain `+` glyph on collapsed nodes.
     *
     * @default true
     */
    readonly collapseBadgeEnabled: boolean;
    /** Colour of the count text inside the expand/collapse button. @default '#FFFFFF' */
    readonly collapseBadgeFontColor: string;
    /**
     * Font size of the count text inside the expand/collapse button. Capped at 70% of
     * `expandCollapseButtonSize` so it cannot overflow the button.
     *
     * @default '12px'
     */
    readonly collapseBadgeFontSize: string;
    /**
     * Minimum number of hidden descendants before the button shows a count instead of
     * a `+` glyph. @default 1
     */
    readonly collapseBadgeThreshold: number;
    /** Background color of the count badge. Defaults to a soft indigo matching the concept. @default '#EEF2FF' */
    readonly countBadgeBGColor: string;
    /**
     * Per-node field read for the badge number when `countBadgeSource` is
     * `'data'`. The value is coerced with `Number(...)`; non-numeric or missing
     * values render no badge. @default 'count'
     */
    readonly countBadgeDataKey: string;
    /**
     * Show an always-visible count badge in the top-right corner of each node.
     * Unlike the collapse badge (which only appears on collapsed nodes), this
     * badge is shown whether the node is expanded or collapsed. See
     * {@link CountBadgeSource} for what the number represents. @default false
     */
    readonly countBadgeEnabled: boolean;
    /** Font color of the count badge. @default '#3730A3' */
    readonly countBadgeFontColor: string;
    /** Font size of the count badge. @default '12px' */
    readonly countBadgeFontSize: string;
    /**
     * How the count badge number is derived. See {@link CountBadgeSource}.
     * @default 'descendants'
     */
    readonly countBadgeSource: CountBadgeSource;
    /** Minimum count required before the badge appears (hides zero/low counts). @default 1 */
    readonly countBadgeThreshold: number;
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
    /** Border color of the expand/collapse button. @default '#E4E7EC' */
    readonly expandCollapseButtonBorderColor: string;
    /**
     * Color of the `+`/`-` glyph inside the expand/collapse button. Set this
     * alongside `expandCollapseButtonBGColor` when theming, or the glyph can end
     * up invisible against the button fill.
     *
     * @default '#475467'
     */
    readonly expandCollapseButtonIconColor: string;
    /**
     * Colour of an opaque ring drawn just outside the expand/collapse button, so it
     * punches a clean hole through the node's border and the incoming edge instead of
     * merging into them (`expandCollapseButtonBorderColor` and `borderColor` share
     * the same default grey, and the button straddles the node edge).
     *
     * Set it to whatever is painted BEHIND the nodes, which is usually the page or
     * container background. Empty disables the halo, because the library cannot know
     * that colour: `canvasStyle` is an opaque CSS string and the area outside a node
     * belongs to the host page.
     *
     * @default ''
     */
    readonly expandCollapseButtonHaloColor: string;
    /**
     * Diameter of the expand/collapse button, in pixels. Purely visual: the button
     * carries an invisible hit area of `max(size + 4, 24)`, so shrinking it never
     * drops the tap target below the WCAG 2.2 SC 2.5.8 minimum of 24px.
     *
     * The chrome grows 15% on hover, about its own centre. The hit area does not,
     * so the target stays put under the pointer.
     *
     * @default 15
     */
    readonly expandCollapseButtonSize: number;
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
    /**
     * Decorate each node's wrapper `<g>` without replacing its `nodeTemplate`
     * content. Called for every node as it is (re)rendered; return extra classes
     * and/or attributes to stamp on the wrapper (see {@link NodeWrapperResult}),
     * or nothing to leave it untouched. Use it to add per-node styling hooks,
     * `data-*` attributes for a context menu or drag handle, or a framework
     * boundary — then attach your own delegated listeners on the container.
     *
     * Set globally in `TreeOptions` (runs for every node) or per node via
     * `NestedNode.options.nodeWrapper` (a per-node hook wins over the global one).
     * Stamping happens on the SVG `<g>`, outside the foreignObject, so it is free
     * of the Safari foreignObject CSS constraints that apply to `nodeTemplate`.
     */
    readonly nodeWrapper?: (context: NodeWrapperContext) => NodeWrapperResult | void;
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
    /**
     * Whether this node's card is currently expanded (see {@link CardExpansionOptions}
     * and `graph.toggleCard(id)`). The built-in card uses it to reveal its detail
     * section; custom templates can branch on it to render summary vs. detail
     * content. Always `false` unless the node has been expanded.
     * @default false
     */
    readonly expanded: boolean;
    /**
     * Level-of-detail tier for the node at the current zoom, when
     * {@link SemanticZoomOptions semanticZoom} is enabled (otherwise always
     * `'full'`). Node geometry never changes with the tier; the template just
     * renders lighter content in the same box when zoomed out. The built-in card
     * renders the complete card at `'full'`, a name + role plate at `'compact'`,
     * and a color-slab name plate at `'dot'`; custom templates can branch on it.
     * See {@link LodTier}.
     * @default 'full'
     */
    readonly lod: LodTier;
}

/**
 * Context passed to a {@link NodeOptions.nodeWrapper} hook so it can decorate a
 * node's wrapper `<g>` based on the node's identity and current state.
 */
export declare interface NodeWrapperContext {
    /** Whether this node currently hides its children (is collapsed). */
    readonly collapsed: boolean;
    /** Raw value at `contentKey` for this node (the same value passed to `nodeTemplate`). */
    readonly data: unknown;
    /** Depth of the node from the root (root = 0). */
    readonly depth: number;
    /** Whether this node's card is expanded in place (see {@link CardExpansionOptions}). */
    readonly expanded: boolean;
    /** Whether this node has any children (visible or collapsed). */
    readonly hasChildren: boolean;
    /** The node id. */
    readonly id: string;
    /** The node's display name. */
    readonly name: string;
}

/**
 * What a {@link NodeOptions.nodeWrapper} hook may add to a node's wrapper `<g>`:
 * extra CSS classes and/or attributes. Returning nothing leaves the wrapper as
 * is. Handy for context menus, drag handles, per-node styling hooks, or wiring a
 * framework boundary — you stamp `data-*` attributes / classes here and attach
 * your own delegated listeners on the container.
 */
export declare interface NodeWrapperResult {
    /**
     * Attributes stamped on the wrapper `<g>`. Identity attributes ApexTree owns
     * (`data-self`, `data-parent`, `data-x`, `data-y`, `data-sig`, `data-depth`,
     * `class`, `transform`) are ignored so the layout/reconcile pipeline is never
     * broken; use `className` for classes.
     */
    readonly attributes?: Readonly<Record<string, boolean | number | string>>;
    /** Space-separated CSS class names added to the wrapper `<g>`. */
    readonly className?: string;
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
    /**
     * Short keyword chips rendered under the title (summary content, always
     * visible). Useful for skills, categories, or status keywords.
     */
    readonly tags?: ReadonlyArray<string>;
    /**
     * Key/value rows shown only when the card is expanded (see
     * {@link CardExpansionOptions}). Each `{ label, value }` renders as a small
     * two-column row — headcount, tenure, metrics, and the like.
     */
    readonly stats?: ReadonlyArray<{
        label: string;
        value: string;
    }>;
    /**
     * A progress meter shown when the card is expanded. `value` is clamped to
     * `0..100`; `label` is an optional caption; `color` overrides the fill.
     */
    readonly progress?: {
        color?: string;
        label?: string;
        value: number;
    };
    /**
     * Action links shown when the card is expanded. Each renders as an anchor
     * (with `href`) or a plain label. Rendered inert if no `href` is given.
     */
    readonly actions?: ReadonlyArray<{
        href?: string;
        label: string;
    }>;
    /** Free-text detail paragraph shown only when the card is expanded. */
    readonly details?: string;
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

/**
 * Semantic zoom / level-of-detail. When enabled, nodes render lighter content as
 * you zoom out — the built-in card degrades full card → name only → dot — keeping
 * a large tree legible and cheap instead of an unreadable smear of full cards.
 *
 * The tier is chosen from how wide a node appears ON SCREEN (its layout width
 * scaled by the current zoom), so it is independent of node size and screen
 * resolution. Node geometry is FIXED across tiers: the layout is computed once
 * at the configured/measured node size, and crossing a tier only swaps what the
 * template renders INSIDE each node's box (like yFiles-style detail levels).
 * Nothing moves, the camera is untouched, and no per-tier sizing needs to be
 * configured, so the feature works unchanged on dynamic data of unknown shape.
 * The tier reaches every `nodeTemplate` via {@link NodeTemplateContext.lod}, so
 * custom templates can render their own per-tier variants; the built-in card
 * fills the box with a color-slab name plate at `'dot'` and a name + role plate
 * at `'compact'`.
 *
 * Inert unless `enabled` is true, so existing charts are unaffected.
 */
export declare interface SemanticZoomOptions {
    /**
     * On-screen node width (in CSS pixels) at or below which a node drops from the
     * full tier to `'compact'` (name + role). Must be greater than `dotBelow`.
     * @default 90
     */
    readonly compactBelow?: number;
    /**
     * On-screen node width (in CSS pixels) below which a node drops to `'dot'`
     * (a color slab carrying just the name).
     * @default 42
     */
    readonly dotBelow?: number;
    /**
     * Render simplified node content as the tree is zoomed out. See {@link LodTier}.
     * @default false
     */
    readonly enabled: boolean;
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
 * - `'radial'` — root at the centre, children radiate outward in rings
 */
export declare type TreeDirection = 'bottom' | 'left' | 'radial' | 'right' | 'top';

/**
 * How ranks are placed along the growth axis.
 *
 * - `'tree'` — every node sits at a radius/row matching its own depth (tidy tree).
 * - `'cluster'` — all leaves are pinned to the deepest rank, so they line up on
 *   the outer ring (radial) or the bottom row (cartesian). This is the classic
 *   dendrogram look. Internal nodes keep their natural depth.
 */
export declare type TreeLayoutType = 'cluster' | 'tree';

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
    /** Command-palette "collapse all" action label. @default 'Collapse all' */
    readonly commandCollapseAll: string;
    /** Command-palette "expand all" action label. @default 'Expand all' */
    readonly commandExpandAll: string;
    /** Command-palette "fit to screen" action label. @default 'Fit to screen' */
    readonly commandFitScreen: string;
    /** Command-palette empty-state text. @default 'No matches' */
    readonly commandNoResults: string;
    /** Command-palette dialog aria-label. @default 'Command palette' */
    readonly commandPaletteAriaLabel: string;
    /** Command-palette input placeholder. @default 'Jump to a node or run a command…' */
    readonly commandPalettePlaceholder: string;
    /** Collapse-button aria-label. @default 'Collapse node' */
    readonly collapseNodeLabel: string;
    /** Expand-button aria-label. @default 'Expand node' */
    readonly expandNodeLabel: string;
    /** Collapse-card chevron aria-label. @default 'Collapse card' */
    readonly collapseCardLabel: string;
    /** Expand-card chevron aria-label. @default 'Expand card' */
    readonly expandCardLabel: string;
    /** Expand-button aria-label while a node's children are lazy-loading. @default 'Loading…' */
    readonly loadingNodeLabel: string;
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
