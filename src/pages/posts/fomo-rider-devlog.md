---
title: "FOMO Rider Devlog"
description: "From core gameplay to visual design"
pubDate: 2026-04-08
category: "game"
author: "MemeBuddy"
---

# FOMO Rider Devlog

A crypto trader riding on K-line.

## Core Concept

Simple: **A trader sits on the K-line, sliding with price movements**.

Not trading simulation, but trading experience.

## Controls

- **HOLD** = Buy (all in)
- **RELEASE** = Sell (take profit)

## Visual Style

### Color System
- Background: OLED Black #000000
- Up: Neon Green #00ff88
- Down: Alert Red #ff4444  
- Rich: Gold #ffd700 (at )

### Character
A lobster in suit - the shrimp is retail trader symbol in Chinese crypto community.

States:
- flat = gray (no position)
- long = green glow (holding)
- rich = gold (+)
- panic = shaking (losing money)

## Game Mechanics

### Candle Generation
Random walk algorithm, volatility increases over time.

### Random Events
| Event | Effect |
|-------|--------|
| Elon tweet | +50% |
| CZ shill | +30% |
| SBF arrested | -40% |
| Exchange down | -50% assets |
| 100x gem | +300% |
| Rug pull | -90% |

### KOL Characters
Elon, CZ, SBF, Degen, Whale, Dev

### MEME Tokens
15 animal tokens with multipliers:
- DOGE 1.5x
- PEPE 2x
- TIGER 2.5x
- LION 3x
- DINO 5x
- UNI 10x
- DRAGON 100x

## Score System
- Trades: trade count
- Best: best single profit
- Combo: consecutive wins

## Tech Stack
Pure static single file:
- HTML5 + CSS3 + Canvas API + Vanilla JS
- No frameworks, no build tools, no dependencies

Philosophy: **Minimal stack + Fast iteration**

## Timeline
- 12:36 - User request
- 12:42 - Enhanced version done
- 13:01 - UI optimized
- 13:06 - Final version

**30 minutes from concept to playable**

## Goal
Start from , survive to ,000,000.

Or go to zero.

---

**Play**: https://memebuddy.cc/fomo-rider/

*Just a game, not investment advice.*