# ApexTree - Installation and Getting started

The Apextree is a javascript library built on SVG that helps to create organizational or hierarchical charts.

<img width="811" alt="Apextree Banner" src="https://github.com/apexcharts/tree/assets/17950663/e09212ec-6322-4c68-ac12-9afc524d2abd">

## Installation

To add the Apextree to your project and its dependencies, install the package from npm.

```bash
npm install apextree
```

## Usage

```js
import ApexTree from 'apextree';
```

To create a basic tree with minimal configuration, write as follows:

```html
<div id="svg-tree"></div>
```

```js
 const data = {
   ...(nested data with format provided below)
 }
 const options = {
   width: 700,
   height: 700,
   nodeWidth: 120,
   nodeHeight: 80,
   childrenSpacing: 100,
   siblingSpacing: 30,
   direction: 'top',
   canvasStyle: 'border: 1px solid black;background: #f6f6f6;',
 };
 const tree = new ApexTree(document.getElementById('svg-tree'), options);
 const graph = tree.render(data);
```

## Setting the License

To use ApexTree with a commercial license, set your license key before creating any chart instances:

```js
import ApexTree from 'apextree';

// set license key before creating any charts
ApexTree.setLicense('your-license-key');

const tree = new ApexTree(document.getElementById('svg-tree'), options);
const graph = tree.render(data);
```

## Tree Options

The layout can be configured by passing a second argument to `ApexTree` with the properties listed below.

### Layout & Canvas

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `width` | `number \| string` | `'100%'` | Width of the canvas. Accepts a pixel number or CSS percentage string. |
| `height` | `number \| string` | `'auto'` | Height of the canvas. `'auto'` sizes to content. |
| `viewPortWidth` | `number` | `800` | Internal SVG viewport width in pixels. |
| `viewPortHeight` | `number` | `600` | Internal SVG viewport height in pixels. |
| `direction` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'radial'` | `'top'` | Direction the tree grows from the root node. `'radial'` places the root at the centre with each level on a ring radiating outward. |
| `layoutType` | `'tree' \| 'cluster'` | `'tree'` | Rank placement. `'tree'` places each node at its own depth. `'cluster'` pins every leaf to the deepest rank so leaves line up on the outer ring (radial) or the bottom row (cartesian) — the classic dendrogram look. |
| `contentKey` | `string` | `'name'` | Key in the data object used as the node display label. Set to `'data'` to pass a structured object to `nodeTemplate`. |
| `siblingSpacing` | `number` | `50` | Horizontal distance between sibling nodes in pixels. |
| `childrenSpacing` | `number` | `50` | Vertical distance between a parent node and its children in pixels. |
| `paddingX` | `number` | `100` | Horizontal padding around the rendered tree, in pixels. Adds breathing room between the leftmost/rightmost nodes (and any external labels that extend past them) and the SVG viewBox edge. |
| `paddingY` | `number` | `100` | Vertical padding around the rendered tree, in pixels. Useful when leaf nodes have rotated `externalLabel` content that extends past the marker bounds. |
| `canvasStyle` | `string` | `''` | Arbitrary CSS injected onto the SVG root container element. |
| `containerClassName` | `string` | `'root'` | CSS class name for the root SVG container element. |
| `theme` | `'light' \| 'dark' \| 'custom' \| string` | `'light'` | Theme preset. `'dark'` uses slate backgrounds for dark-mode apps. `'custom'` disables built-in CSS variable injection so host-page variables take precedence. Any other string names a theme on the shared family registry and behaves like `'custom'` plus that theme's `--apx-*` tokens. See [Family theme tokens](#family-theme-tokens---apx-). |

### Interaction & Features

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `highlightOnHover` | `boolean` | `true` | Highlight the hovered node and its connecting edges. |
| `enableAnimation` | `boolean` | `true` | Animate node expansion/collapse transitions. |
| `motion` | `MotionOptions` | `{ spring: 'crisp', stagger: 'wave' }` | Tuning for the spring-driven collapse/expand and camera motion. See the sub-options below. Springs preserve velocity, so a toggle that arrives mid-animation redirects smoothly instead of restarting. |
| `motion.spring` | `'crisp' \| 'gentle' \| 'snappy'` | `'crisp'` | Spring feel for node and camera motion. `'crisp'` is snappy and settles without visible overshoot; `'gentle'` is softer for large reflows; `'snappy'` is faster. |
| `motion.stagger` | `'wave' \| 'none'` | `'wave'` | How a reflow propagates on collapse/expand. `'wave'` staggers nodes by their distance from the toggled node so the motion radiates outward; `'none'` moves them together. |
| `focus` | `FocusOptions` | `{ clickToFocus: false, dimOpacity: 0.7 }` | Focus ("spotlight") mode. `graph.focus(id)` dims everything outside the node's lineage and visible subtree and springs the camera to frame the subtree; `graph.clearFocus()` or Escape restores the full view. |
| `focus.clickToFocus` | `boolean` | `false` | Focus a node when its card is clicked. Clicking the focused node again, or pressing Escape, clears the spotlight. Clicks on the expand/collapse button keep toggling the subtree as usual. |
| `focus.dimOpacity` | `number` | `0.7` | Strength of the dim applied outside the focused lineage and subtree, from `0` (no dim) to `1` (fully hidden). |
| `enableExpandCollapse` | `boolean` | `true` | Show expand/collapse buttons on nodes that have children. |
| `expandCollapseOnNodeClick` | `boolean` | `false` | When `true`, clicking anywhere on a node with children toggles its expansion — the node body itself acts as the trigger. Useful for marker-style trees where the dedicated `+`/`-` button is hidden. The toggle fires before `onNodeClick`. The cursor becomes a pointer on clickable nodes. |
| `cardExpansion` | `CardExpansionOptions` | `{ clickToExpand: false }` | Expandable cards: a node's card can expand in place to reveal a detail section. `cardExpansion.clickToExpand` toggles on a card-body click; the `expandCard`/`collapseCard`/`toggleCard` API and the built-in chevron work regardless. See [Expandable cards](#expandable-cards). |
| `enableExpandCollapseZoom` | `boolean` | `true` | Re-fit the viewBox to the new tree bounds on collapse/expand. Set to `false` to keep the viewBox fixed. |
| `maxZoomNodeSpan` | `number` | `8` | Caps how far the camera zooms in when re-fitting after collapse/expand, so a view of a few remaining nodes doesn't balloon. The fit always spans at least this many node-widths/heights, centered. Larger = less zoom-in; `0` disables the cap. The cap never shrinks the chart below 1:1, so a chart narrower than `maxZoomNodeSpan` node-widths keeps its tight fit rather than scaling down on collapse. Only applies when `enableExpandCollapseZoom` is `true`. |
| `enableToolbar` | `boolean` | `false` | Show the zoom/pan toolbar. |
| `enableZoomPan` | `boolean` | `true` | Enable Ctrl/⌘ + mouse-wheel (or trackpad pinch) zoom and drag-to-pan on the canvas. A plain wheel still scrolls the page. Set to `false` to lock the viewport. |
| `enableSearch` | `boolean` | `false` | Show a search input in the toolbar. Filters nodes by label, highlights matches, and centers on the first match on Enter. |
| `enableCommandPalette` | `boolean` | `false` | Enable a `Cmd/Ctrl + K` command palette: jump to a node by label or run a quick action (expand all, collapse all, fit to screen). See [Command palette](#command-palette). |
| `semanticZoom` | `SemanticZoomOptions` | `{ enabled: false }` | Level-of-detail: nodes render lighter content as the tree is zoomed out (full card → name plate → color slab) inside fixed node geometry, so the layout never changes, only the detail level does. See [Semantic zoom (LOD)](#semantic-zoom-lod). |
| `enableSelection` | `'single' \| 'multi' \| false` | `false` | Node selection mode. `'single'` allows one selected node at a time. `'multi'` allows toggling multiple nodes. Selected nodes get `aria-selected="true"` and a visible ring. |
| `enableBreadcrumb` | `boolean` | `false` | Show a breadcrumb trail above the chart. Updates on node click to show the path from root to the selected node. |
| `loadChildren` | `(context) => Promise<NestedNode[]>` | `undefined` | Lazy-load a node's children on first expand. Mark a node `hasChildren: true` with `children: []`; expanding it shows a spinner, calls this loader, and splices the result in. See [Lazy children](#lazy-children). |
| `groupLeafNodes` | `boolean` | `false` | Stack leaf nodes vertically instead of spreading them horizontally. |
| `groupLeafNodesSpacing` | `number` | `10` | Spacing between stacked leaf nodes in pixels. |
| `onNodeClick` | `(node: unknown) => void` | `undefined` | Callback fired when the user clicks a node. Receives the raw node data object. |

### Node Styling

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `nodeWidth` | `number` | `50` | Width of each node in pixels. Overridable per node via `NestedNode.options.nodeWidth` (see [Per-node size](#per-node-size)). |
| `nodeHeight` | `number` | `30` | Height of each node in pixels. Overridable per node via `NestedNode.options.nodeHeight` (see [Per-node size](#per-node-size)). |
| `autoNodeHeight` | `AutoNodeHeightOptions` | `{ enabled: false }` | Auto-measure each node's height from its rendered content, keeping the width fixed. See [Auto height](#auto-height). |
| `nodeTemplate` | `(content, context?) => string` | built-in | Custom function returning an HTML string rendered inside each node. Receives the value at `contentKey` plus a `NodeTemplateContext` (`{ direction, cardImagePosition, expanded }`). |
| `nodeWrapper` | `(context) => NodeWrapperResult \| void` | `undefined` | Decorate each node's wrapper `<g>` without replacing its `nodeTemplate`. Return `{ className?, attributes? }` to stamp classes / `data-*` attributes for context menus, drag handles, or per-node styling hooks. See [Node wrappers](#node-wrappers). |
| `cardImagePosition` | `'left' \| 'top'` | `'left'` | Avatar placement in the built-in org-card. `'top'` centers the avatar above the text (and below it for `direction: 'bottom'`, so it faces the parent). |
| `nodeClassName` | `string` | `'apextree-node'` | CSS class name added to every node element. |
| `nodeStyle` | `string` | `''` | Inline CSS string applied to each node element. |
| `nodeBGColor` | `string` | `'#FFFFFF'` | Default background color of nodes. |
| `nodeBGColorHover` | `string` | `'#FFFFFF'` | Background color of nodes on hover. |
| `nodeShadow` | `string` | `'0 1px 2px rgba(16,24,40,0.06), 0 1px 3px rgba(16,24,40,0.1)'` | CSS `box-shadow` applied to nodes. Set to empty string to disable. |
| `nodeShadowHover` | `string` | `'0 4px 6px -1px rgba(16,24,40,0.1), 0 2px 4px -2px rgba(16,24,40,0.1)'` | CSS `box-shadow` applied to nodes on hover. Set to empty string to keep constant. |
| `borderWidth` | `number` | `1` | Border width of nodes in pixels. |
| `borderStyle` | `string` | `'solid'` | CSS border-style for nodes. |
| `borderRadius` | `string` | `'10px'` | CSS border-radius for nodes. |
| `borderColor` | `string` | `'#E4E7EC'` | Border color of nodes in their default state. |
| `borderColorHover` | `string` | `'#5C6BC0'` | Border color of nodes on hover. |
| `externalLabel` | `ExternalLabelOptions` | `{ enabled: false }` | Render the node's label outside its bounds (above/below/beside the node) instead of inside the `nodeTemplate`. See [External Labels](#external-labels). |

### Per-node size

`nodeWidth` / `nodeHeight` are global defaults, but any node can override its own size via `NestedNode.options` — useful when one card needs more room (a longer title, a bigger avatar) than the rest:

```js
{
  id: 'ops', name: 'Operations & Infrastructure',
  options: { nodeWidth: 240, nodeHeight: 72 },  // this node only
  children: [ /* ... */ ],
}
```

Edges, the expand/collapse button, badges, hover-lift, and the collapse/expand animation all track each node's own size. Currently supported for the cartesian directions (`top` / `bottom` / `left` / `right`); grouped-leaf stacks and the radial layout render at the uniform global size.

### Auto height

When cards hold variable amounts of text, set `autoNodeHeight` so each node grows to fit its own content instead of clipping at the global `nodeHeight`. Before layout, ApexTree renders each node's `nodeTemplate(content)` into an offscreen box at the node's fixed width (its per-node `nodeWidth` or the global) and measures the height the content needs:

```js
const tree = new ApexTree(el, {
  nodeWidth: 200,
  nodeHeight: 60, // fallback when there is no DOM to measure in
  autoNodeHeight: {enabled: true, minHeight: 56, maxHeight: 200, extraHeight: 8},
});
```

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | `boolean` | `false` | Measure each node's content height and size the node to fit (fixed width). |
| `minHeight` | `number` | `0` | Lower clamp for the measured height, in px. `0` means no floor. |
| `maxHeight` | `number` | `0` | Upper clamp for the measured height, in px; taller content is clipped by the node's `overflow: hidden`. `0` means no cap. |
| `extraHeight` | `number` | `0` | Extra vertical padding added to the measured content height, in px. |

Notes:

- The measured height feeds the same graph label the per-node explicit sizing writes to, so edges, badges, and collapse/expand animation track it automatically.
- A node with an explicit per-node `options.nodeHeight` keeps that height (an explicit size wins over measurement). Set `options.autoNodeHeight = { enabled: false }` to opt a single node out.
- Measurement needs a DOM. Under SSR (or before paint in a headless test runner) every node falls back to the global `nodeHeight`, so the layout stays deterministic.
- Cartesian directions only. Grouped-leaf stacks (`groupLeafNodes`) and the radial layout stay at the uniform global height. External-label markers are not measured.
- Only text/box geometry is measured; images that load after the measure pass (e.g. remote avatars) do not re-trigger it, so reserve their space with a fixed avatar size in the template.

### Expandable cards

A node's card can **expand in place** to reveal a detail section, independent of expanding/collapsing its children. Toggle it programmatically or let users click a chevron:

```js
tree.graph.expandCard('eng'); // or collapseCard / toggleCard
tree.graph.getExpandedCards(); // ['eng']
```

The card re-measures and the whole tree springs to fit — so pair this with `autoNodeHeight: { enabled: true }` (or a large enough explicit `nodeHeight`), otherwise the detail may clip because the card height cannot grow.

**Built-in card.** When node data (`OrgNodeData`) carries any detail field (`stats`, `progress`, `actions`, `details`), the built-in card automatically shows a `▸`/`▾` chevron; clicking it toggles the card. The `stats`/`progress`/`actions`/`details` render only while expanded; `tags` are part of the always-visible summary.

**Custom templates.** The `nodeTemplate` context carries an `expanded` flag, and any element you mark with `data-apextree-card-toggle` becomes a toggle:

```js
nodeTemplate: (content, {expanded}) => `
  <div style="padding:10px;height:100%;box-sizing:border-box;">
    <b>${content.name}</b>
    <span data-apextree-card-toggle role="button" style="cursor:pointer;">${expanded ? '▾' : '▸'}</span>
    ${expanded ? `<div>${content.details}</div>` : ''}
  </div>`;
```

Notes:

- `cardExpansion.clickToExpand: true` toggles on a click anywhere on the card body (the `+`/`-` children button still toggles children, not the card).
- State persists across renders (like selection) — a card stays expanded through a child collapse/expand and returns correct when re-shown.
- Cartesian directions only; grouped-leaf stacks and the radial layout do not expand.

### External Labels

When `externalLabel.enabled` is `true`, the node's resolved content (the value at `contentKey`, falling back to `name` for object content) is rendered as an SVG `<text>` element positioned relative to the node, instead of inside the in-node template. The node box itself still renders, so combining a small `nodeWidth`/`nodeHeight` with `borderRadius: '50%'` produces a circular marker with a floating label — useful for treegraph-style charts where labels sit above, beside, or below the marker.

External labels can be configured globally via the top-level `externalLabel` option, or per-node via `NestedNode.options.externalLabel`. Per-node values are layered onto the global ones.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `externalLabel.enabled` | `boolean` | `false` | Render the label outside the node bounds. When `false`, the in-node `nodeTemplate` is used as before. |
| `externalLabel.align` | `'left' \| 'center' \| 'right'` | `'center'` | Horizontal placement of the label relative to the node. `'left'` places it to the left, `'right'` to the right. |
| `externalLabel.verticalAlign` | `'top' \| 'middle' \| 'bottom'` | `'middle'` | Vertical placement of the label relative to the node. `'top'` places it above the node, `'bottom'` below. |
| `externalLabel.offsetX` | `number` | `0` | Additional horizontal pixel offset applied after `align`. |
| `externalLabel.offsetY` | `number` | `0` | Additional vertical pixel offset applied after `verticalAlign`. |
| `externalLabel.rotation` | `number` | `0` | Rotation in degrees applied around the label anchor. Use `90` for vertical leaf labels. |
| `externalLabel.fontColor` | `string` | inherits `fontColor` | Override the global font color for the external label. |
| `externalLabel.fontFamily` | `string` | inherits `fontFamily` | Override the global font family for the external label. |
| `externalLabel.fontSize` | `string` | inherits `fontSize` | Override the global font size for the external label. |
| `externalLabel.fontWeight` | `string` | inherits `fontWeight` | Override the global font weight for the external label. |
| `externalLabel.collisionStrategy` | `'none' \| 'hide' \| 'leaves'` | `'none'` | Thin overlapping external labels in a dense **radial** layout (ignored elsewhere). `'hide'` keeps a maximal, evenly-spaced subset per ring, dropping labels that lack tangential room; `'leaves'` additionally drops every inner-node label. The spacing threshold is derived from `fontSize`. Use with a tidy `layoutType: 'tree'` radial view to keep inner rings legible. |

### Edge (Connector) Styling

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `edgeStyle` | `'orthogonal' \| 'curved' \| 'straight'` | `'orthogonal'` | Shape of connecting lines. `'orthogonal'` draws right-angle elbows. `'curved'` draws smooth Bézier curves. `'straight'` draws direct lines. |
| `edgeWidth` | `number` | `1` | Stroke width of connecting lines in pixels. |
| `edgeColor` | `string` | `'#D0D5DD'` | Color of connecting lines between nodes. |
| `edgeColorHover` | `string` | `'#5C6BC0'` | Color of connecting lines when highlighted on hover. |
| `edgeColorMode` | `'default' \| 'node'` | `'default'` | `'default'` uses the global `edgeColor`. `'node'` inherits the `borderColor` of the child node each edge connects into, giving each branch a matching color. |
| `edgeFlow` | `EdgeFlowOptions` | see below | Animated "active path" flow. Style for the edges lit up by `graph.setActivePath(nodeIds)`. See [Active-path flow](#active-path-flow). |

#### Active-path flow

Call `graph.setActivePath(nodeIds)` (a single id or a list) to light up the lineage from the root down to those nodes: the edges recolor and a dashed pulse travels along them, so the path reads as live. `graph.clearActivePath()` restores them. The animation is a marching stroke-dash on the plain SVG edge path (Safari-safe, never a `foreignObject`) and is disabled under `prefers-reduced-motion` (the active edges then stay statically highlighted). Configure via the `edgeFlow` option:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `edgeFlow.color` | `string` | `'#5C6BC0'` | Stroke color of an active (flowing) edge. |
| `edgeFlow.width` | `number` | `2` | Stroke width of an active edge, in pixels. |
| `edgeFlow.speed` | `number` | `60` | Flow speed in SVG units per second (how fast the dashes travel). |
| `edgeFlow.dashLength` | `number` | `8` | Length of each dash in the marching pattern, in pixels. |
| `edgeFlow.gapLength` | `number` | `6` | Gap between dashes, in pixels. |
| `edgeFlow.direction` | `'toChild' \| 'toParent'` | `'toChild'` | Direction the dashes travel: `'toChild'` flows root → leaf, `'toParent'` flows leaf → root. |
| `edgeFlow.followFocus` | `boolean` | `false` | Auto-set the active path to a node's lineage when focus mode spotlights it (`graph.focus(id)` / click-to-focus), and clear it on `clearFocus()`. |

### Expand/Collapse Button & Badge

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `expandCollapseButtonBGColor` | `string` | `'#FFFFFF'` | Background color of the expand/collapse button. |
| `expandCollapseButtonBorderColor` | `string` | `'#E4E7EC'` | Border color of the expand/collapse button. |
| `expandCollapseButtonIconColor` | `string` | `'#475467'` | Color of the `+`/`-` glyph inside the expand/collapse button. Set this alongside `expandCollapseButtonBGColor` when theming, or the glyph can end up invisible against the button fill. |
| `expandCollapseButtonSize` | `number` | `15` | Diameter of the expand/collapse button, in pixels. Purely visual: the button carries an invisible hit area of `max(size + 4, 24)`, so shrinking it never drops the tap target below the 24px accessibility minimum. The chrome grows 15% on hover; the hit area does not, so the target stays put under the pointer. |
| `expandCollapseButtonHaloColor` | `string` | `''` | Color of an opaque ring drawn just outside the expand/collapse button, so it punches a clean hole through the node's border and the incoming edge instead of merging into them. Set it to whatever is painted _behind_ the nodes (usually the page or container background). Empty disables the halo, because the library cannot know that color. |
| `collapseBadgeEnabled` | `boolean` | `true` | Show a collapsed node's hidden-descendant count. The count renders **inside** the expand/collapse button, which widens to a pill and swaps its `+` glyph for the number. Disable to keep the plain `+` glyph. |
| `collapseBadgeThreshold` | `number` | `1` | Minimum number of hidden descendants before the button shows a count instead of a `+` glyph. |
| `collapseBadgeBGColor` | `string` | `'#5C6BC0'` | Fill of the expand/collapse button while it is showing a count. |
| `collapseBadgeFontColor` | `string` | `'#FFFFFF'` | Color of the count text inside the expand/collapse button. |
| `collapseBadgeFontSize` | `string` | `'12px'` | Font size of the count text inside the expand/collapse button. Capped at 70% of `expandCollapseButtonSize` so it cannot overflow the button. |

### Count Badge

An always-visible pill in the **top-right corner** of every node (mirrored to the **top-left** under `locale.direction: 'rtl'`) showing a number — a descendant count, a direct-child count, or any per-node metric you supply. Unlike the collapse count (which only appears on collapsed nodes, inside the expand/collapse button itself), the count badge is shown whether the node is expanded or collapsed, so it works as a permanent head-count / size indicator. Opt in with `countBadgeEnabled: true`.

The number comes from `countBadgeSource`:

- `'descendants'` (default) — total descendants across all levels. Collapsing a branch does not change the count.
- `'children'` — direct children only.
- `'data'` — reads a per-node field named by `countBadgeDataKey` (default `count`), so you can show any metric (open tickets, revenue, …) instead of a structural count.

```js
const tree = new ApexTree(el, {
  countBadgeEnabled: true,
  countBadgeSource: 'children', // 12, 8, 6 …
});
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `countBadgeEnabled` | `boolean` | `false` | Show an always-visible count badge in the top-right corner of each node. |
| `countBadgeSource` | `'descendants' \| 'children' \| 'data'` | `'descendants'` | How the badge number is derived. `'data'` reads `countBadgeDataKey` from each node. |
| `countBadgeDataKey` | `string` | `'count'` | Per-node field read for the number when `countBadgeSource` is `'data'`. Coerced with `Number(...)`; non-numeric/missing values render no badge. |
| `countBadgeThreshold` | `number` | `1` | Minimum count required before the badge appears (hides zero/low counts). |
| `countBadgeBGColor` | `string` | `'#EEF2FF'` | Background color of the count badge. |
| `countBadgeFontColor` | `string` | `'#3730A3'` | Font color of the count badge. |
| `countBadgeFontSize` | `string` | `'12px'` | Font size of the count badge. |

### Typography

| Option       | Type     | Default        | Description                                                               |
| ------------ | -------- | -------------- | ------------------------------------------------------------------------- |
| `fontColor`  | `string` | `'#101828'`    | CSS color for node text.                                                  |
| `fontFamily` | `string` | system default | CSS font-family for node text. Falls back to the page default when empty. |
| `fontSize`   | `string` | `'14px'`       | CSS font-size for node text.                                              |
| `fontWeight` | `string` | `'400'`        | CSS font-weight for node text.                                            |

### Tooltip

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `enableTooltip` | `boolean` | `false` | Show a tooltip on node hover. |
| `tooltipId` | `string` | `'apextree-tooltip-container'` | HTML `id` for the tooltip container element. |
| `tooltipTemplate` | `(content: string) => string` | built-in | Custom function returning an HTML string for the tooltip content. |
| `tooltipMaxWidth` | `number \| undefined` | `undefined` | Maximum width of the tooltip in pixels. |
| `tooltipMinWidth` | `number` | `100` | Minimum width of the tooltip in pixels. |
| `tooltipBorderColor` | `string` | `'#BCBCBC'` | Border color of the tooltip. |
| `tooltipBGColor` | `string` | `'#FFFFFF'` | Background color of the tooltip. |
| `tooltipFontColor` | `string` | `'#000000'` | Font color of tooltip text. |
| `tooltipFontSize` | `string` | `'12px'` | Font size of tooltip text. |
| `tooltipPadding` | `number` | `8` | Inner padding of the tooltip in pixels. Set to `0` when using a custom `tooltipTemplate`. |
| `tooltipOffset` | `number` | `10` | Distance between the tooltip and the cursor in pixels. |

### Accessibility

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `a11y` | `{ enabled?: boolean, label?: string }` | `{ enabled: true, label: 'Organizational chart' }` | WCAG 2.1 AA accessibility. Adds ARIA tree semantics, keyboard navigation, and visible focus indicators. Set `label` to customise the SVG `aria-label`. |

### Localization & RTL

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `locale` | `{ direction?: 'ltr' \| 'rtl' \| 'auto', messages?: Partial<TreeMessages> }` | `{ direction: 'ltr' }` | Localization and text-direction. `direction: 'rtl'` mirrors the tree horizontally and sets `dir="rtl"` on the container so node text and the search/breadcrumb chrome flow right-to-left (`'auto'` defers to the document); RTL mirroring is tuned for the vertical `'top'`/`'bottom'` directions. `messages` overrides any user-facing string. |

All user-facing strings live in `TreeMessages`; supply a `Partial<TreeMessages>` to translate any subset (unset keys keep their English defaults, exported as `DEFAULT_TREE_MESSAGES`). Plain labels are strings; values that embed runtime data are functions so each locale controls grammar and pluralization.

| `TreeMessages` key | Type | Default | Description |
| --- | --- | --- | --- |
| `rootAriaLabel` | `string` | `'Organizational chart'` | Root SVG `aria-label` (the legacy `a11y.label` still overrides this). |
| `searchPlaceholder` | `string` | `'Search nodes…'` | Search input placeholder. |
| `searchAriaLabel` | `string` | `'Search tree nodes'` | Search input `aria-label`. |
| `searchMatchCount` | `(count: number) => string` | `` `${n} match`/`${n} matches` `` | Search match-count text. |
| `breadcrumbAriaLabel` | `string` | `'Tree path'` | Breadcrumb `<nav>` `aria-label`. |
| `expandNodeLabel` | `string` | `'Expand node'` | Expand-button `aria-label`. |
| `collapseNodeLabel` | `string` | `'Collapse node'` | Collapse-button `aria-label`. |
| `expandCardLabel` | `string` | `'Expand card'` | Expand-card chevron `aria-label`. |
| `collapseCardLabel` | `string` | `'Collapse card'` | Collapse-card chevron `aria-label`. |
| `nodeAriaLabel` | `(ctx: NodeAriaContext) => string` | `` `${name}, level ${level}, ${position} of ${total}${state}` `` | Builds each node's `aria-label`. |

```ts
const tree = new ApexTree(el, {
  direction: 'top',
  locale: {
    direction: 'rtl',
    messages: {
      searchPlaceholder: 'بحث…',
      searchMatchCount: (n) => `${n} نتيجة`,
    },
  },
});
```

## Node Templates

### Default template

When `contentKey` is `'name'` (the default), the built-in template renders a single centered label:

```js
const defaultNodeTemplate = (content) => {
  return `<div style='display: flex;justify-content: center;align-items: center; text-align: center; height: 100%;'>${content}</div>`;
};
```

### Built-in org-chart card

When `contentKey` is set to `'data'` and the data object contains any of `imageURL`, `title`, `subtitle`, `badge`, `accentColor`, `meta`, `tags`, or a detail field (`stats`, `progress`, `actions`, `details`), the built-in template automatically renders a structured org-chart card — no custom `nodeTemplate` needed.

The card supports two layouts via the `cardImagePosition` option: `'left'` (default — avatar beside the text) and `'top'` (avatar centered above the text, or below for `direction: 'bottom'`, with `accentColor` applied as the avatar ring). Optional `meta` rows render icon + label lines under the title/subtitle.

Summary fields (always visible): `name`, `title`, `subtitle`, `imageURL`, `badge`, `accentColor`, `meta`, and `tags` (keyword chips). Detail fields (shown only when the card is [expanded](#expandable-cards)): `stats` (key/value rows), `progress` (a `0..100` meter with optional `label`/`color`), `actions` (links, each `{ label, href? }`), and `details` (free text). When any detail field is present the card shows an expand chevron automatically.

```js
const data = {
  id: 'ceo',
  name: 'Alice',
  data: {
    name: 'Alice Johnson',
    title: 'Chief Executive Officer',
    subtitle: 'Executive',
    imageURL: 'https://example.com/avatar.jpg',
    accentColor: '#6366f1',
    badge: {text: 'Active', color: '#EEF2FF'},
    // Optional icon + label rows (icon is any icon-font class, or omit it):
    meta: [{icon: 'bi bi-geo-alt', label: 'San Francisco'}, {label: 'Joined 2019'}],
  },
  children: [],
};

const options = {
  contentKey: 'data',
  nodeWidth: 200,
  nodeHeight: 80,
  cardImagePosition: 'top', // avatar centered above the text
};
```

### Custom template

Pass a `nodeTemplate` function for full control over node rendering:

```js
const options = {
  contentKey: 'data',
  nodeTemplate: (content) => `
    <div style="display: flex; align-items: center; gap: 8px; padding: 8px;">
      <img src="${content.img}" style="width: 32px; height: 32px; border-radius: 50%;" />
      <div>
        <div style="font-weight: 600;">${content.name}</div>
        <div style="font-size: 11px; color: #666;">${content.role}</div>
      </div>
    </div>`,
};
```

**Safari compatibility:** ApexTree renders each node's HTML inside an SVG `<foreignObject>`. When the SVG viewBox is scaled — `width: '100%'`, any zoom level, or mobile fit-to-viewport (which is always scaled) — Safari/WebKit mis-paints any foreignObject descendant that gets its own paint layer or stacking context: the card renders blank, or its content collapses to the canvas origin. Chromium and Firefox are unaffected, so the bug is invisible until a user opens Safari.

Inside a `nodeTemplate`, avoid every property that creates a paint layer or stacking context:

- `position: relative` / `absolute` / `fixed` / `sticky`
- `opacity` less than `1`
- `transform`, `filter`
- `z-index`, `will-change`, `mix-blend-mode`, `isolation: isolate`

Use plain flow with flex/grid layout and DOM order for stacking instead. Dim text with `color` (e.g. `rgba(...)` or `color-mix(...)`), not `opacity`. Overlap an avatar on the card edge with a negative margin rather than `position: absolute`. In development, ApexTree inspects your template and logs a one-time `console.warn` naming any offending property so you can spot this without testing in Safari.

### Node wrappers

`nodeTemplate` controls the HTML _inside_ a node; `nodeWrapper` decorates the SVG `<g>` _around_ it. Use it to add per-node classes or `data-*` attributes (for a context menu, a drag handle, a right-click target, or a framework boundary) without rebuilding the card. Because the stamp lands on the `<g>` outside the foreignObject, none of the Safari `nodeTemplate` constraints above apply here.

The hook runs for every node as it is (re)rendered and receives a `NodeWrapperContext` (`{ id, name, data, depth, hasChildren, collapsed, expanded }`). Return `{ className?, attributes? }`, or nothing to leave the node untouched. ApexTree ignores any attempt to set the identity attributes it owns (`data-self`, `data-parent`, `data-x`, `data-y`, `data-sig`, `data-depth`, `class`, `transform`), so a hook can never break layout.

```js
const options = {
  nodeWrapper: ({id, collapsed}) => ({
    className: collapsed ? 'is-collapsed' : '',
    attributes: {'data-menu-target': id, tabindex: 0},
  }),
};

// Attach ONE delegated listener on the container; read the data-* you stamped.
container.addEventListener('contextmenu', (e) => {
  const g = e.target.closest('[data-menu-target]');
  if (g) openMenu(g.getAttribute('data-menu-target'), e);
});
```

Set it globally in `TreeOptions` (runs for every node) or per node via `NestedNode.options.nodeWrapper` (a per-node hook wins over the global one).

## Per-Node Options

Individual nodes can override global styling via an `options` object. This accepts the same node, font, and tooltip options as the global configuration:

```js
const data = {
  id: 'ceo',
  name: 'CEO',
  options: {
    nodeBGColor: '#EEF2FF',
    nodeBGColorHover: '#EEF2FF',
    borderColor: '#A5B4FC',
    borderColorHover: '#6366F1',
  },
  children: [
    {
      id: 'cto',
      name: 'CTO',
      options: {
        nodeBGColor: '#ECFDF5',
        borderColor: '#6EE7B7',
      },
      children: [],
    },
  ],
};
```

## Expected Data Format

```json
{
  "id": "1",
  "name": "A",
  "children": []
}
```

Each node object requires:

- **`id`** — unique identifier. Must be unique across all nodes for edge highlighting and selection to work correctly.
- **`name`** — display label rendered inside the node (when using the default `contentKey: 'name'`).
- **`children`** — array of child node objects. Pass an empty array `[]` for leaf nodes.
- **`data`** _(optional)_ — arbitrary data payload. When using `contentKey: 'data'`, this object is passed to `nodeTemplate`.
- **`options`** _(optional)_ — per-node style overrides (see [Per-Node Options](#per-node-options)).
- **`hasChildren`** _(optional)_ — mark a node as having children that are not loaded yet (with `children: []`). Its expand affordance triggers the `loadChildren` option instead of a plain expand. See [Lazy children](#lazy-children).

**Example**

```js
const data = {
  id: '1',
  name: 'A',
  children: [
    {
      id: '2',
      name: 'B',
      children: [
        {
          id: '3',
          name: 'C',
          children: [],
        },
        {
          id: '4',
          name: 'D',
          children: [],
        },
      ],
    },
  ],
};
```

## Command palette

Set `enableCommandPalette: true` to add a `Cmd/Ctrl + K` overlay for keyboard-first navigation of large trees. Type to fuzzy-match a node by its label (Enter centers the camera on it), or run a quick action — **Expand all**, **Collapse all**, **Fit to screen**. Arrow keys move the selection, Enter runs it, Escape (or a backdrop click) closes.

```js
const tree = new ApexTree(el, {enableCommandPalette: true});
tree.render(data);
// Press Cmd/Ctrl + K to open.
```

The palette is a plain DOM overlay (never inside the SVG), so it is Safari-safe, theme-aware (it follows the `dark` theme), and honours `prefers-reduced-motion`. Localize its strings via `locale.messages`: `commandPalettePlaceholder`, `commandPaletteAriaLabel`, `commandNoResults`, `commandExpandAll`, `commandCollapseAll`, `commandFitScreen`.

## Semantic zoom (LOD)

On a large tree, zooming out turns full cards into an unreadable smear. Semantic zoom (level-of-detail) fixes that the way dedicated diagramming tools do: **the layout is computed once and node geometry never changes**, so zooming only changes how much detail each node renders inside its (fixed) box. Zoomed far out, the built-in card fills the box with a color slab carrying the name, so the whole tree reads like a map; mid zoom shows a name + role plate; zoomed in shows the complete card. Because nothing ever moves, tier transitions are seamless, and there is nothing to configure per tier, so it works unchanged on dynamic data of unknown shape.

```js
const tree = new ApexTree(el, {
  semanticZoom: {
    enabled: true,
    compactBelow: 90, // on-screen px below which the card drops to the compact tier
    dotBelow: 42, // on-screen px below which the card drops to the dot tier
  },
});
tree.render(data);
```

The tier is chosen from how wide a node appears **on screen** at the current zoom, so it is independent of node size and screen resolution:

| Tier      | When                                  | Built-in card renders                                      |
| --------- | ------------------------------------- | ---------------------------------------------------------- |
| `full`    | on-screen node width ≥ `compactBelow` | the complete card                                          |
| `compact` | between `dotBelow` and `compactBelow` | a name + role plate with an accent stripe                  |
| `dot`     | below `dotBelow`                      | a full-box color slab with the name (`accentColor` if set) |

Key properties:

- **Nothing moves, ever.** The layout, every node's position and size, and the camera are all untouched by a tier change; only node content swaps in place. That keeps transitions seamless and pan/zoom uninterrupted (a wheel or drag always wins over any in-flight camera motion).
- **Fill the box.** Low-detail templates should use the node's full area: a big name on a colored slab stays readable at zoom levels where a miniature card is a smear. The built-in tiers do this out of the box.
- **Custom templates.** The tier reaches every `nodeTemplate` via the context flag `lod` (`'full' | 'compact' | 'dot'`), so you can render your own per-tier variants: `nodeTemplate: (content, {lod}) => lod === 'dot' ? slabHtml : fullHtml`. Grouped leaf stacks (`groupLeafNodes`) re-tier too, so wide teams stay legible.
- **Inert by default.** With `enabled: false` (the default) the tier is always `full` and output is unchanged.
- Tiers re-evaluate after a zoom gesture settles (trackpad pinch, `Cmd/Ctrl` + wheel, the toolbar zoom buttons, keyboard zoom) and after the initial fit.

## Live data updates

When your data changes, call `graph.updateData(nextData)` rather than rendering again. It reconciles the chart to the new dataset instead of rebuilding it: nodes present in both datasets keep their DOM element and spring from where they are to where the new layout puts them, new nodes grow out of their parent, and removed nodes retract and disappear.

```js
const graph = tree.render(orgAtStartOfQuarter);

socket.on('org:changed', (next) => {
  graph.updateData(next); // animates the difference
});
```

Node identity is matched by `id`, so stable ids across snapshots are what make a change legible: keep them stable and a person who changes manager visibly travels across the chart instead of vanishing in one place and appearing in another.

**What survives an update:**

| State | Survives | Notes |
| --- | --- | --- |
| Collapsed subtrees | Yes | Re-applied by node id. Ids that disappeared, or that no longer have children, are skipped. |
| Selection | Yes | Kept by node id. |
| Focus / spotlight | Yes | As long as the focused node is still present. |
| Expanded cards | Yes | Kept by node id. |
| Camera (pan / zoom) | Yes | The camera springs to the new bounds rather than snapping. |
| Lazily-loaded children | No | A new dataset resets lazy state, so a `hasChildren` node fetches again on next expand. |

A node's card is only rebuilt when its rendered content actually changed. That comparison covers the whole value under `contentKey`, so a change to any field a template reads (a new job title, a new avatar, a changed metric) refreshes the card, while a node that merely moved keeps the element it already had. Everything else about a node, its position included, is animated rather than re-rendered.

Because DOM elements are reused rather than recreated, everything the browser hangs off them survives too: keyboard focus stays where it was, hover doesn't flicker, and text selection inside a card isn't dropped. That's the practical difference from `tree.render(data)`, which tears the chart down and rebuilds it (and also re-creates the toolbar), leaving nodes to jump to their new positions.

Use `tree.render(data)` for the first render, or when you deliberately want a hard reset with no animation and no retained state. Everything else should go through `updateData`. With `enableAnimation: false`, `updateData` still produces the correct end state, just without the motion.

## Lazy children

For trees too large or too dynamic to ship up front, load a node's children the first time it is expanded. Mark the node `hasChildren: true` with an empty `children: []`, and provide a `loadChildren` option. Expanding the node shows a spinner on its expand button, calls `loadChildren`, then splices the returned children in and springs them into place — the same reflow as a normal expand.

```js
const options = {
  loadChildren: async ({id, name, data}) => {
    const res = await fetch(`/api/org/${id}/reports`);
    const rows = await res.json();
    // Return NestedNode[]; a child can itself be lazy (hasChildren: true, children: []).
    return rows.map((r) => ({id: r.id, name: r.name, children: [], hasChildren: r.hasReports}));
  },
};

const data = {
  id: 'ceo',
  name: 'CEO',
  children: [{id: 'eng', name: 'Engineering', children: [], hasChildren: true}],
};
```

Notes:

- The loader may return a value or a promise. Return an empty array for a node that turned out to have none — its expand affordance is then dropped.
- A rejected promise leaves the node collapsed and un-resolved, so the next expand retries.
- Each node is fetched at most once; after it loads, collapsing and re-expanding it never refetches.
- The loading spinner is drawn as pure SVG (no foreignObject), so it is Safari-safe, and the wrapper carries `aria-busy` while loading. Override the button's loading `aria-label` via `locale.messages.loadingNodeLabel` (default `'Loading…'`).

## Graph API Methods

The `tree.render(data)` call returns a `graph` instance with the following public methods:

### Layout & View

| Method | Description |
| --- | --- |
| `updateData(data)` | Swap in a new dataset and animate to it: nodes in both datasets travel to their new positions, new nodes enter from their parent, and removed nodes retract. Collapsed subtrees and selection survive by node id. See [Live data updates](#live-data-updates). |
| `changeLayout(direction)` | Switch the tree direction dynamically (`'top'`, `'bottom'`, `'left'`, `'right'`). |
| `fitScreen()` | Re-fit the viewBox to show all visible nodes. |
| `zoom(factor)` | Step the zoom relative to the current view: `zoom(0.2)` zooms 20% in, `zoom(-0.2)` 20% out. Zoom-out bottoms out once the whole layout fits with slack. |
| `centerOnNode(nodeId)` | Pan and zoom to center a specific node in the viewport. |
| `focus(nodeId)` | Spotlight a node: dim everything outside its lineage and visible subtree, and spring the camera to frame the subtree. Returns `false` when the node is not currently rendered. |
| `clearFocus()` | Remove the spotlight and spring the camera back to the whole tree. Also triggered by Escape. |
| `getFocusedNodeId()` | Id of the currently spotlighted node, or `null` when focus mode is inactive. |
| `setActivePath(nodeIds)` | Light up the "active path": the lineage from the root down to each given node (one id or a list), flowing a dashed pulse along those edges. An empty list clears. Survives collapse/expand. See [Active-path flow](#active-path-flow). |
| `clearActivePath()` | Clear the active-path flow, restoring edges to their normal styling. |
| `getActivePath()` | The node ids whose lineage is currently flowing, or `[]` when inactive. |

### Expand & Collapse

| Method | Description |
| --- | --- |
| `collapse(nodeId)` | Programmatically collapse a node. |
| `expand(nodeId)` | Programmatically expand a node. |
| `expandAll()` | Expand every node in the tree in a single reflow. |
| `collapseAll()` | Collapse every node, leaving only the root visible. Each level keeps its own state, so a later `expand` reveals one level at a time. |
| `expandToDepth(depth)` | Show the tree down to `depth` (root = 0): shallower nodes stay expanded, nodes at/below `depth` collapse. `expandToDepth(1)` shows the root and its direct children. |
| `expandSubtree(nodeId)` | Expand a node and all of its descendants in a single reflow. |
| `collapseSubtree(nodeId)` | Collapse a node and all of its descendants, so re-expanding it reveals the subtree one level at a time. |

### Expandable Cards

| Method | Description |
| --- | --- |
| `expandCard(nodeId)` | Expand a node's card in place to reveal its detail section. See [Expandable cards](#expandable-cards). |
| `collapseCard(nodeId)` | Collapse a node's expanded card. |
| `toggleCard(nodeId)` | Toggle a node's expanded card. |
| `setExpandedCards(ids)` | Replace the set of expanded cards by ID array (reflows once). |
| `getExpandedCards()` | Returns an array of currently expanded card node IDs. |

### Selection

| Method                        | Description                                                                      |
| ----------------------------- | -------------------------------------------------------------------------------- |
| `getSelection()`              | Returns an array of currently selected node IDs.                                 |
| `setSelection(ids)`           | Programmatically set selected nodes by ID array.                                 |
| `clearSelection()`            | Clear all selections.                                                            |
| `onSelectionChange(listener)` | Register a callback fired whenever the selection changes. Pass `null` to remove. |

### Search

| Method                         | Description                                                               |
| ------------------------------ | ------------------------------------------------------------------------- |
| `findNodesByQuery(query)`      | Returns an array of node IDs whose labels match the query string.         |
| `setSearchHighlight(matchIds)` | Highlight specific nodes as search results. Pass an empty array to clear. |

### Data & Nodes

| Method                 | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `construct(data)`      | Replace the tree data and re-render.                 |
| `getNodeMap()`         | Returns a map of all node IDs to their node objects. |
| `getRootNodeId()`      | Returns the ID of the root node.                     |
| `getNodeLabel(nodeId)` | Returns the display label for a node.                |

### Breadcrumb

| Method                          | Description                                                               |
| ------------------------------- | ------------------------------------------------------------------------- |
| `setBreadcrumbHandler(handler)` | Register a callback for breadcrumb segment clicks. Pass `null` to remove. |

### Keyboard Shortcuts

| Method | Description |
| --- | --- |
| `setKeyboardShortcutHandlers(handlers)` | Wire up callbacks for keyboard shortcuts that operate outside the tree itself — typically used to focus or clear an external search input. `handlers` is `{ onFocusSearch?: () => void, onClearSearch?: () => void }`. Handlers persist across `render()` calls until replaced. |

### Export

| Method          | Description                                      |
| --------------- | ------------------------------------------------ |
| `exportToSvg()` | Export the current tree as an SVG file download. |

## Teardown

| Method | Description |
| --- | --- |
| `destroy()` | Tear the tree down: stop the spring animation loop, detach every listener the graph and its controls installed, and release the chart context. Call this before dropping your reference to the instance (a component unmount, a route change). Idempotent. |

```js
const tree = new ApexTree(el, options);
tree.render(data);

// on unmount
tree.destroy();
```

Without this, a tree torn down mid-animation leaves its frame loop running against detached DOM until its springs settle.

### Example

```js
const tree = new ApexTree(document.getElementById('svg-tree'), options);
const graph = tree.render(data);

// Change layout direction
graph.changeLayout('left');

// Collapse a node programmatically
graph.collapse('node-2');

// Listen for selection changes
graph.onSelectionChange((ids) => {
  console.log('Selected:', ids);
});

// Search and highlight
const matches = graph.findNodesByQuery('engineer');
graph.setSearchHighlight(matches);
graph.centerOnNode(matches[0]);
```

## Family theme tokens (`--apx-*`)

Every chart in the ApexCharts family reads the same five root tokens, so a page can state its brand once and have trees, flow diagrams, Gantt charts and plots all follow:

| Token                               | Role                                                             |
| ----------------------------------- | ---------------------------------------------------------------- |
| `--apx-accent`                      | The colour that means interactive or selected                    |
| `--apx-fore`                        | Text and anything that must stay legible on the surface          |
| `--apx-grid`                        | Hairlines: borders, gridlines, connectors                        |
| `--apx-surface`                     | The plane content sits on                                        |
| `--apx-series-1` … `--apx-series-N` | An ordered categorical palette (1-based, stops at the first gap) |

```css
:root {
  --apx-accent: #5b21b6;
  --apx-fore: #101828;
  --apx-grid: #e4e7ec;
  --apx-surface: #ffffff;
}

@media (prefers-color-scheme: dark) {
  :root {
    --apx-fore: #f8fafc;
    --apx-grid: #334155;
    --apx-surface: #0f172a;
  }
}
```

Custom properties inherit, so declaring them on `:root` reaches every chart on the page. They resolve **below anything you configured explicitly**, so adopting them cannot change a chart that was already themed:

```
product CSS variable  >  explicit option  >  --apx-* token  >  built-in default
```

An option set to a value equal to its built-in default is indistinguishable from one left alone, and the token wins there. Set a product variable if you need a value pinned regardless.

### Named themes

`registerTheme` from `@apex/commons` records a named set of tokens on a registry shared by the whole family, so a brand theme registered once from any product is resolvable by name from all of them:

```js
import {registerTheme} from '@apex/commons';

registerTheme('acme', {
  tokens: {accent: '#5b21b6', fore: '#101828', grid: '#e4e7ec', surface: '#ffffff'},
});
```

A named theme's tokens sit one layer below the CSS `--apx-*` tokens, so the cascade still wins over the registry.

Reference it through the `theme` option. `'light'`, `'dark'` and `'custom'` keep their built-in meanings; any other string names a registered theme and otherwise behaves like `'custom'` (no CSS injection, the cascade stays in charge). The name is always written to `data-apex-tree-theme` on the container.

```js
new ApexTree(el, {theme: 'acme'});
```
