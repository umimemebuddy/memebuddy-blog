# Design System: Mintlify

## 1. Visual Theme & Atmosphere

Mintlify's website is a study in documentation-as-product design — a white, airy, information-rich surface that treats clarity as its highest aesthetic value. The page opens with a luminous white (`#ffffff`) background, near-black (`#0d0d0d`) text, and a signature green brand accent (`#18E299`) that signals freshness and intelligence without dominating the palette. The overall mood is calm, confident, and engineered for legibility — a design system that whispers "we care about your developer experience" in every pixel.

The Inter font family carries the entire typographic load. At display sizes (40–64px), it uses tight negative letter-spacing (-0.8px to -1.28px) and semibold weight (600), creating headlines that feel focused and compressed like well-written documentation headers. Body text at 16–18px with 150% line-height provides generous reading comfort. Geist Mono appears exclusively for code and technical labels — uppercase, tracked-out, small — the voice of the terminal inside the marketing page.

What distinguishes Mintlify from other documentation platforms is its atmospheric gradient hero. A soft, cloud-like green-to-white gradient wash behind the hero content creates a sense of ethereal intelligence — documentation that floats above the noise. Below the hero, the page settles into a disciplined alternation of white sections separated by subtle 5% opacity borders. Cards use generous padding (24px+) with large radii (16px–24px) and whisper-thin borders, creating containers that feel open rather than boxed.

**Key Characteristics:**
- Inter with tight negative tracking at display sizes (-0.8px to -1.28px) — compressed yet readable
- Geist Mono for code labels: uppercase, 12px, tracked-out, the terminal voice
- Brand green (`#18E299`) used sparingly — CTAs, hover states, focus rings, and accent touches
- Atmospheric gradient hero with cloud-like green-white wash
- Ultra-round corners: 16px for containers, 24px for featured cards, full-round (9999px) for buttons and pills
- Subtle 5% opacity borders (`rgba(0,0,0,0.05)`) creating barely-there separation
- 8px base spacing system with generous section padding (48px–96px)
- Clean white canvas — no gray backgrounds, no color sections, depth through borders and whitespace alone

## 2. Color Palette & Roles

### Primary
- **Near Black** (`#0d0d0d`): Primary text, headings, dark surfaces. Not pure black — the micro-softness improves reading comfort.
- **Pure White** (`#ffffff`): Page background, card surfaces, input backgrounds.
- **Brand Green** (`#18E299`): The signature accent — CTAs, links on hover, focus rings, brand identity.

### Secondary Accents
- **Brand Green Light** (`#d4fae8`): Tinted green surface for badges, hover states, subtle backgrounds.
- **Brand Green Deep** (`#0fa76e`): Darker green for text on light-green badges, hover states on brand elements.
- **Warm Amber** (`#c37d0d`): Warning states, caution badges.
- **Soft Blue** (`#3772cf`): Tag backgrounds, informational annotations.
- **Error Red** (`#d45656`): Error states, destructive actions.

### Neutral Scale
- **Gray 900** (`#0d0d0d`): Primary heading text, nav links.
- **Gray 700** (`#333333`): Secondary text, descriptions, body copy.
- **Gray 500** (`#666666`): Tertiary text, muted labels.
- **Gray 400** (`#888888`): Placeholder text, disabled states, code annotations.
- **Gray 200** (`#e5e5e5`): Borders, dividers, card outlines.
- **Gray 100** (`#f5f5f5`): Subtle surface backgrounds, hover states.
- **Gray 50** (`#fafafa`): Near-white surface tint.

### Interactive
- **Link Default** (`#0d0d0d`): Links match text color, relying on underline/context.
- **Link Hover** (`#18E299`): Brand green on hover.
- **Focus Ring** (`#18E299`): Brand green focus outline.

### Surface & Overlay
- **Card Background** (`#ffffff`): White cards on white background, separated by borders.
- **Border Subtle** (`rgba(0,0,0,0.05)`): 5% black opacity borders.
- **Border Medium** (`rgba(0,0,0,0.08)`): Slightly stronger borders.

### Shadows & Depth
- **Card Shadow** (`rgba(0,0,0,0.03) 0px 2px 4px`): Barely-there ambient shadow.
- **Button Shadow** (`rgba(0,0,0,0.06) 0px 1px 2px`): Micro-shadow for button depth.
- **No heavy shadows**: Mintlify relies on borders, not shadows.

## 3. Typography Rules

### Font Family
- **Primary**: `Inter`
- **Monospace**: `Geist Mono`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Display Hero | Inter | 64px | 600 | 1.15 | -1.28px |
| Section Heading | Inter | 40px | 600 | 1.10 | -0.8px |
| Sub-heading | Inter | 24px | 500 | 1.30 | -0.24px |
| Card Title | Inter | 20px | 600 | 1.30 | -0.2px |
| Body Large | Inter | 18px | 400 | 1.50 | normal |
| Body | Inter | 16px | 400 | 1.50 | normal |
| Button | Inter | 15px | 500 | 1.50 | normal |
| Link | Inter | 14px | 500 | 1.50 | normal |
| Mono Code | Geist Mono | 12px | 500 | 1.50 | 0.6px |

### Principles
- **Tight tracking at display sizes**: -0.8px to -1.28px letter-spacing
- **Relaxed reading at body sizes**: normal tracking with 150% line-height
- **Two-font system**: Inter for human content, Geist Mono for code
- **Uppercase as hierarchy signal**: Section labels use uppercase + tracking

## 4. Component Stylings

### Buttons

**Primary Brand (Full-round)**
- Background: `#0d0d0d`
- Text: `#ffffff`
- Padding: 8px 24px
- Radius: 9999px (pill)
- Use: Primary CTA

**Secondary / Ghost**
- Background: `#ffffff`
- Text: `#0d0d0d`
- Border: `1px solid rgba(0,0,0,0.08)`
- Radius: 9999px
- Use: Secondary actions

**Brand Accent Button**
- Background: `#18E299`
- Text: `#0d0d0d`
- Radius: 9999px

### Cards
- Background: `#ffffff`
- Border: `1px solid rgba(0,0,0,0.05)`
- Radius: 16px
- Padding: 24px

### Inputs
- Background: `#ffffff`
- Border: `1px solid rgba(0,0,0,0.08)`
- Radius: 9999px (pill)
- Focus: `1px solid var(--color-brand)`

---

*Source: Mintlify DESIGN.md from awesome-design-md*
*Theme: Clean white + Green accent + Documentation-focused*
