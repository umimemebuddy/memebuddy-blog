# Design System: VoltAgent

## 1. Visual Theme & Atmosphere

VoltAgent's interface is a deep-space command terminal for the AI age — a developer-facing darkness built on near-pure-black surfaces (`#050507`) where the only interruption is the electric pulse of emerald green energy. The entire experience evokes the feeling of staring into a high-powered IDE at 2am: dark, focused, and alive with purpose. This is not a friendly SaaS landing page — it's an engineering platform that announces itself through code snippets, architectural diagrams, and raw technical confidence.

The green accent (`#00d992`) is used with surgical precision — it glows from headlines, borders, and interactive elements like a circuit board carrying a signal. Against the carbon-black canvas, this green reads as "power on" — a deliberate visual metaphor for an AI agent engineering platform. The supporting palette is built entirely from warm-neutral grays (`#3d3a39`, `#8b949e`, `#b8b3b0`) that soften the darkness without introducing color noise, creating a cockpit-like warmth that pure blue-grays would lack.

Typography leans on the system font stack for headings — achieving maximum rendering speed and native-feeling authority — while Inter carries the body and UI text with geometric precision. Code blocks use SFMono-Regular, the same font developers see in their terminals, reinforcing the tool's credibility at every scroll.

**Key Characteristics:**
- Carbon-black canvas (`#050507`) with warm-gray border containment (`#3d3a39`) — not cold or sterile
- Single-accent identity: Emerald Signal Green (`#00d992`) as the sole chromatic energy source
- Dual-typography system: system-ui for authoritative headings, Inter for precise UI/body text, SFMono for code credibility
- Ultra-tight heading line-heights (1.0–1.11) creating dense, compressed power blocks
- Warm neutral palette (`#3d3a39`, `#8b949e`, `#b8b3b0`) that prevents the dark theme from feeling clinical
- Developer-terminal aesthetic where code snippets ARE the hero content
- Green glow effects (`drop-shadow`, border accents) that make UI elements feel electrically alive

## 2. Color Palette & Roles

### Primary
- **Emerald Signal Green** (`#00d992`): The core brand energy — used for accent borders, glow effects, and the highest-signal interactive moments. This is the "power-on" indicator of the entire interface.
- **VoltAgent Mint** (`#2fd6a1`): The button-text variant of the brand green — slightly warmer and more readable than pure Signal Green, used specifically for CTA text on dark surfaces.
- **Tailwind Emerald** (`#10b981`): The ecosystem-standard green used at low opacity (30%) for subtle background tints and link defaults. Bridges VoltAgent's custom palette with Tailwind's utility classes.

### Secondary & Accent
- **Soft Purple** (`#818cf8`): A cool indigo-violet used sparingly for secondary categorization, code syntax highlights, and visual variety without competing with green.
- **Cobalt Primary** (`#306cce`): Docusaurus primary dark — used in documentation contexts for links and interactive focus states.
- **Deep Cobalt** (`#2554a0`): The darkest primary shade, reserved for pressed/active states in documentation UI.
- **Ring Blue** (`#3b82f6`): Tailwind's ring color at 50% opacity — visible only during keyboard focus for accessibility compliance.

### Surface & Background
- **Abyss Black** (`#050507`): The landing page canvas — a near-pure black with the faintest warm undertone, darker than most "dark themes" for maximum contrast with green accents.
- **Carbon Surface** (`#101010`): The primary card and button background — one shade lighter than Abyss, creating a barely perceptible elevation layer. Used across all contained surfaces.
- **Warm Charcoal Border** (`#3d3a39`): The signature containment color — not a cold gray but a warm, almost brownish dark tone that prevents borders from feeling harsh against the black canvas.

### Neutrals & Text
- **Snow White** (`#f2f2f2`): The primary text color on dark surfaces — not pure white (`#ffffff`) but a softened, eye-friendly off-white. The most-used color on the site (1008 instances).
- **Pure White** (`#ffffff`): Reserved for the highest-emphasis moments — ghost button text and maximum-contrast headings. Used at low opacity (5%) for subtle overlay effects.
- **Warm Parchment** (`#b8b3b0`): Secondary body text — a warm light gray with a slight pinkish undertone that reads as "paper" against the dark canvas.
- **Steel Slate** (`#8b949e`): Tertiary text, metadata, timestamps, and de-emphasized content. A cool blue-gray that provides clear hierarchy below Warm Parchment.
- **Fog Gray** (`#bdbdbd`): Footer links and supporting navigation text — brightens on hover to Pure White.
- **Mist Gray** (`#dcdcdc`): Slightly brighter than Fog, used for secondary link text that transitions to bright green on hover.
- **Near White** (`#eeeeee`): Highest-contrast secondary text, one step below Snow White.

### Semantic & Accent
- **Success Emerald** (`#008b00`): Deep green for success states and positive confirmations in documentation contexts.
- **Success Light** (`#80d280`): Soft pastel green for success backgrounds and subtle positive indicators.
- **Warning Amber** (`#ffba00`): Bright amber for warning alerts and caution states.
- **Warning Pale** (`#ffdd80`): Softened amber for warning background fills.
- **Danger Coral** (`#fb565b`): Vivid red for error states and destructive action warnings.
- **Danger Rose** (`#fd9c9f`): Softened coral-pink for error backgrounds.
- **Info Teal** (`#4cb3d4`): Cool teal-blue for informational callouts and tip admonitions.
- **Dashed Border Slate** (`#4f5d75` at 40%): A muted blue-gray used exclusively for decorative dashed borders in workflow diagrams.

### Gradient System
- **Green Signal Glow**: `drop-shadow(0 0 2px #00d992)` animating to `drop-shadow(0 0 8px #00d992)` — creates a pulsing "electric charge" effect on the VoltAgent bolt logo and interactive elements. The glow expands and contracts like a heartbeat.
- **Warm Ambient Haze**: `rgba(92, 88, 85, 0.2) 0px 0px 15px` — a warm-toned diffused shadow that creates a soft atmospheric glow around elevated cards, visible at the edges without sharp boundaries.
- **Deep Dramatic Elevation**: `rgba(0, 0, 0, 0.7) 0px 20px 60px` with `rgba(148, 163, 184, 0.1) 0px 0px 0px 1px inset` — a heavy, dramatic downward shadow paired with a faint inset slate ring for the most prominent floating elements.

## 3. Typography Rules

### Font Family
- **Primary (Headings)**: `system-ui`, with fallbacks: `-apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol`
- **Secondary (Body/UI)**: `Inter`, with fallbacks inheriting from system-ui stack. OpenType features: `"calt", "rlig"` (contextual alternates and required ligatures)
- **Monospace (Code)**: `SFMono-Regular`, with fallbacks: `Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / Hero | system-ui | 60px (3.75rem) | 400 | 1.00 (tight) | -0.65px | Maximum impact, compressed blocks |
| Section Heading | system-ui | 36px (2.25rem) | 400 | 1.11 (tight) | -0.9px | Tightest letter-spacing in the system |
| Sub-heading | system-ui | 24px (1.50rem) | 700 | 1.33 | -0.6px | Bold weight for emphasis at this size |
| Sub-heading Light | system-ui / Inter | 24px (1.50rem) | 300–400 | 1.33 | -0.6px | Light weight variant for softer hierarchy |
| Overline | system-ui | 20px (1.25rem) | 600 | 1.40 | 0.5px | Uppercase transform, positive letter-spacing |
| Feature Title | Inter | 20px (1.25rem) | 500–600 | 1.40 | normal | Card headings, feature names |
| Overline Small | Inter | 18px (1.13rem) | 600 | 1.56 | 0.45px | Uppercase section labels |
| Body / Button | Inter | 16px (1.00rem) | 400–600 | 1.50–1.65 | normal | Standard text, nav links, buttons |
| Nav Link | Inter | 14.45px (0.90rem) | 500 | 1.65 | normal | Navigation-specific sizing |
| Caption / Label | Inter | 14px (0.88rem) | 400–600 | 1.43–1.65 | normal | Descriptions, metadata, badge text |
| Tag / Overline Tiny | system-ui | 14px (0.88rem) | 600 | 1.43 | 2.52px | Widest letter-spacing — reserved for uppercase tags |
| Micro | Inter | 12px (0.75rem) | 400–500 | 1.33 | normal | Smallest sans-serif text |
| Code Body | SFMono-Regular | 13–14px | 400–686 | 1.23–1.43 | normal | Inline code, terminal output, variable weight for syntax |
| Code Small | SFMono-Regular | 11–12px | 400 | 1.33–1.45 | normal | Tiny code references, line numbers |
| Code Button | monospace | 13px (0.81rem) | 700 | 1.65 | normal | Copy-to-clipboard button labels |

### Principles
- **System-native authority**: Display headings use system-ui rather than a custom web font — this means the largest text renders instantly (no FOIT/FOUT) and inherits the operating system's native personality. On macOS it's SF Pro, on Windows it's Segoe UI. The design accepts this variability as a feature, not a bug.
- **Tight compression creates density**: Hero line-heights are extremely compressed (1.0) with negative letter-spacing (-0.65px to -0.9px), creating text blocks that feel like dense technical specifications rather than airy marketing copy.
- **Weight gradient, not weight contrast**: The system uses a gentle 300→400→500→600→700 weight progression. Bold (700) is reserved for sub-headings and code-button emphasis. Most body text lives at 400–500, creating subtle rather than dramatic hierarchy.
- **Uppercase is earned and wide**: When uppercase appears, it's always paired with generous letter-spacing (0.45px–2.52px), transforming dense words into spaced-out overline labels. This treatment is never applied to headings.
- **OpenType by default**: Both system-ui and Inter enable `"calt"` and `"rlig"` features, ensuring contextual character adjustments and ligature rendering throughout.

## 4. Component Stylings

### Buttons

**Ghost / Outline (Standard)**
- Background: transparent
- Text: Pure White (`#ffffff`)
- Padding: comfortable (12px 16px)
- Border: thin solid Warm Charcoal (`1px solid #3d3a39`)
- Radius: comfortably rounded (6px)
- Hover: background darkens to `rgba(0, 0, 0, 0.2)`, opacity drops to 0.4
- Outline: subtle green tint (`rgba(33, 196, 93, 0.5)`)
- The default interactive element — unassuming but clearly clickable

**Primary Green CTA**
- Background: Carbon Surface (`#101010`)
- Text: VoltAgent Mint (`#2fd6a1`)
- Padding: comfortable (12px 16px)
- Border: none visible (outline-based focus indicator)
- Outline: VoltAgent Mint (`rgb(47, 214, 161)`)
- Hover: same darkening behavior as Ghost
- The "powered on" button — green text on dark surface reads as an active terminal command

**Tertiary / Emphasized Container Button**
- Background: Carbon Surface (`#101010`)
- Text: Snow White (`#f2f2f2`)
- Padding: generous (20px all sides)
- Border: thick solid Warm Charcoal (`3px solid #3d3a39`)
- Radius: comfortably rounded (8px)
- A card-like button treatment for larger interactive surfaces (code copy blocks, feature CTAs)

### Cards & Containers
- Background: Carbon Surface (`#101010`)
- Border: 1px solid Warm Charcoal (`#3d3a39`)
- Radius: 8px (comfortably rounded)
- Padding: 16px (inner), 24px (large cards)
- Hover: subtle background lightening, border brightens to Steel Slate (`#8b949e`)
- Shadow: none by default — rely on border and background contrast for elevation
- Elevated cards: Deep Dramatic Elevation shadow, 1px border brightens to `#4f5d75`

### Form Inputs
- Background: Carbon Surface (`#101010`)
- Border: 1px solid Warm Charcoal (`#3d3a39`)
- Text: Snow White (`#f2f2f2`)
- Placeholder: Steel Slate (`#8b949e`)
- Focus: border color transitions to Emerald Signal Green (`#00d992`) with green glow (`0 0 0 2px rgba(0, 217, 146, 0.2)`)
- Radius: 6px (matching buttons)

### Navigation
- Background: transparent
- Link color (default): Warm Parchment (`#b8b3b0`)
- Link color (hover): Snow White (`#f2f2f2`) with green underline
- Active link: Emerald Signal Green (`#00d992`) with 2px bottom border
- Spacing: 16px horizontal between links

### Code Blocks
- Background: Abyss Black (`#050507`)
- Border: 1px solid Warm Charcoal (`#3d3a39`)
- Padding: 16px
- Font: SFMono-Regular, 13px
- Line numbers: Steel Slate (`#8b949e`) at 60% opacity
- Syntax highlighting: Soft Purple (`#818cf8`) for keywords, Emerald (`#00d992`) for strings, Warning Amber (`#ffba00`) for functions

---

*Source: VoltAgent DESIGN.md from awesome-design-md*
*Theme: Void-black canvas + Emerald accent + Terminal-native*
