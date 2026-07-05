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
| `direction` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Direction the tree grows from the root node. |
| `contentKey` | `string` | `'name'` | Key in the data object used as the node display label. Set to `'data'` to pass a structured object to `nodeTemplate`. |
| `siblingSpacing` | `number` | `50` | Horizontal distance between sibling nodes in pixels. |
| `childrenSpacing` | `number` | `50` | Vertical distance between a parent node and its children in pixels. |
| `paddingX` | `number` | `100` | Horizontal padding around the rendered tree, in pixels. Adds breathing room between the leftmost/rightmost nodes (and any external labels that extend past them) and the SVG viewBox edge. |
| `paddingY` | `number` | `100` | Vertical padding around the rendered tree, in pixels. Useful when leaf nodes have rotated `externalLabel` content that extends past the marker bounds. |
| `canvasStyle` | `string` | `''` | Arbitrary CSS injected onto the SVG root container element. |
| `containerClassName` | `string` | `'root'` | CSS class name for the root SVG container element. |
| `theme` | `'light' \| 'dark' \| 'custom'` | `'light'` | Built-in theme preset. `'dark'` uses slate backgrounds for dark-mode apps. `'custom'` disables built-in CSS variable injection so host-page variables take precedence. |

### Interaction & Features

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `highlightOnHover` | `boolean` | `true` | Highlight the hovered node and its connecting edges. |
| `enableAnimation` | `boolean` | `true` | Animate node expansion/collapse transitions. |
| `enableExpandCollapse` | `boolean` | `true` | Show expand/collapse buttons on nodes that have children. |
| `expandCollapseOnNodeClick` | `boolean` | `false` | When `true`, clicking anywhere on a node with children toggles its expansion — the node body itself acts as the trigger. Useful for marker-style trees where the dedicated `+`/`-` button is hidden. The toggle fires before `onNodeClick`. The cursor becomes a pointer on clickable nodes. |
| `enableExpandCollapseZoom` | `boolean` | `true` | Re-fit the viewBox to the new tree bounds on collapse/expand. Set to `false` to keep the viewBox fixed. |
| `enableToolbar` | `boolean` | `false` | Show the zoom/pan toolbar. |
| `enableZoomPan` | `boolean` | `true` | Enable Ctrl/⌘ + mouse-wheel (or trackpad pinch) zoom and drag-to-pan on the canvas. A plain wheel still scrolls the page. Set to `false` to lock the viewport. |
| `enableSearch` | `boolean` | `false` | Show a search input in the toolbar. Filters nodes by label, highlights matches, and centers on the first match on Enter. |
| `enableSelection` | `'single' \| 'multi' \| false` | `false` | Node selection mode. `'single'` allows one selected node at a time. `'multi'` allows toggling multiple nodes. Selected nodes get `aria-selected="true"` and a visible ring. |
| `enableBreadcrumb` | `boolean` | `false` | Show a breadcrumb trail above the chart. Updates on node click to show the path from root to the selected node. |
| `groupLeafNodes` | `boolean` | `false` | Stack leaf nodes vertically instead of spreading them horizontally. |
| `groupLeafNodesSpacing` | `number` | `10` | Spacing between stacked leaf nodes in pixels. |
| `onNodeClick` | `(node: unknown) => void` | `undefined` | Callback fired when the user clicks a node. Receives the raw node data object. |

### Node Styling

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `nodeWidth` | `number` | `50` | Width of each node in pixels. |
| `nodeHeight` | `number` | `30` | Height of each node in pixels. |
| `nodeTemplate` | `(content, context?) => string` | built-in | Custom function returning an HTML string rendered inside each node. Receives the value at `contentKey` plus a `NodeTemplateContext` (`{ direction, cardImagePosition }`). |
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

### Edge (Connector) Styling

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `edgeStyle` | `'orthogonal' \| 'curved' \| 'straight'` | `'orthogonal'` | Shape of connecting lines. `'orthogonal'` draws right-angle elbows. `'curved'` draws smooth Bézier curves. `'straight'` draws direct lines. |
| `edgeWidth` | `number` | `1` | Stroke width of connecting lines in pixels. |
| `edgeColor` | `string` | `'#D0D5DD'` | Color of connecting lines between nodes. |
| `edgeColorHover` | `string` | `'#5C6BC0'` | Color of connecting lines when highlighted on hover. |
| `edgeColorMode` | `'default' \| 'node'` | `'default'` | `'default'` uses the global `edgeColor`. `'node'` inherits the `borderColor` of the child node each edge connects into, giving each branch a matching color. |

### Expand/Collapse Button & Badge

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `expandCollapseButtonBGColor` | `string` | `'#FFFFFF'` | Background color of the expand/collapse button. |
| `expandCollapseButtonBorderColor` | `string` | `'#E4E7EC'` | Border color of the expand/collapse button. |
| `collapseBadgeEnabled` | `boolean` | `true` | Show the collapse-count badge on collapsed nodes. |
| `collapseBadgeThreshold` | `number` | `1` | Minimum number of hidden children required before the badge appears. |
| `collapseBadgeBGColor` | `string` | `'#5C6BC0'` | Background color of the collapse-count badge. |
| `collapseBadgeFontColor` | `string` | `'#FFFFFF'` | Font color of the collapse-count badge. |
| `collapseBadgeFontSize` | `string` | `'12px'` | Font size of the collapse-count badge. |

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

When `contentKey` is set to `'data'` and the data object contains any of `imageURL`, `title`, `subtitle`, `badge`, `accentColor`, or `meta`, the built-in template automatically renders a structured org-chart card — no custom `nodeTemplate` needed.

The card supports two layouts via the `cardImagePosition` option: `'left'` (default — avatar beside the text) and `'top'` (avatar centered above the text, or below for `direction: 'bottom'`, with `accentColor` applied as the avatar ring). Optional `meta` rows render icon + label lines under the title/subtitle.

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

## Graph API Methods

The `tree.render(data)` call returns a `graph` instance with the following public methods:

### Layout & View

| Method                    | Description                                                                       |
| ------------------------- | --------------------------------------------------------------------------------- |
| `changeLayout(direction)` | Switch the tree direction dynamically (`'top'`, `'bottom'`, `'left'`, `'right'`). |
| `fitScreen()`             | Re-fit the viewBox to show all visible nodes.                                     |
| `centerOnNode(nodeId)`    | Pan and zoom to center a specific node in the viewport.                           |

### Expand & Collapse

| Method             | Description                       |
| ------------------ | --------------------------------- |
| `collapse(nodeId)` | Programmatically collapse a node. |
| `expand(nodeId)`   | Programmatically expand a node.   |

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
