# PL-01: Programming Party Website - Implementation Planning

**Version**: 0.1  
**Date**: 2025-12-15  
**Status**: Draft  
**Phase**: 3 - Planning (Implementation Design)

---

## 1. Planning Overview

### 1.1 Implementation Approach

Based on the architecture (LD-01), we'll implement the Programming Party Website using a **static site generator** approach:

- **Technology Stack**: TBD (candidates: 11ty, Hugo, Jekyll, Next.js static export)
- **Hosting**: GitHub Pages or Vercel (free, integrates with GitHub)
- **Content Format**: JSON or YAML metadata for projects
- **Styling**: Custom CSS with playful brand identity

### 1.2 Iteration Plan

| Iteration | Focus | Estimated Scope |
|-----------|-------|-----------------|
| **ITR-001** | MVP: Homepage + project gallery | 2-3 weeks |
| **ITR-002** | Project detail pages + external link integration | 2 weeks |
| **ITR-003** | Search/filter functionality | 1-2 weeks |
| **ITR-004** | Polish, animations, team member profiles | 1-2 weeks |

---

## 2. Implementation Design Documents (by Iteration)

### 2.1 Iteration 001: MVP Foundation

**Deliverables**:
- PL-02-Data-Model.md (project metadata schema)
- PL-03-Site-Structure.md (page hierarchy, routing)
- PL-04-Styling-Branding.md (CSS framework, component library)

**Features**:
- Homepage explaining Programming Party
- Project gallery/listing page
- Basic navigation
- Static assets pipeline

---

### 2.2 Iteration 002: Project Details

**Deliverables**:
- PL-05-Project-Detail-Pages.md (page template, content structure)
- PL-06-External-Integrations.md (iframe embedding, link handling)

**Features**:
- Individual project detail pages
- Integration with hosted projects (Grid Operator, Solar Flare, Notedle)
- Fallback to GitHub repo links for repo-only projects
- Image galleries

---

### 2.3 Iteration 003: Search & Discovery

**Deliverables**:
- PL-07-Search-Filter-Design.md (client-side search, filtering logic)

**Features**:
- Project search by name/description
- Filter by year, status, tags
- Sort functionality

---

### 2.4 Iteration 004: Enhancement & Team

**Deliverables**:
- PL-08-Team-Pages.md (team member profiles, contributions)
- PL-09-Animation-Polish.md (interactive elements, brand animations)

**Features**:
- Team member profiles
- Animations and visual polish
- Social integration (if applicable)

---

## 3. Technology Decision Template

### 3.1 Tech Stack Decision Framework

**Decision Required**: Choose primary framework

| Option | Pros | Cons | Recommended For |
|--------|------|------|-----------------|
| **11ty** | Lightweight, fast, flexible, great for static sites | Smaller ecosystem | Fast, content-heavy sites |
| **Hugo** | Very fast builds, extensive theming | Steep learning curve, Go templates | Large sites, fast builds |
| **Jekyll** | GitHub Pages native, simple, Ruby | Slower builds, less flexible | GitHub Pages hosting |
| **Next.js** (static) | React ecosystem, great DX, modern tooling | More complex than pure static | Team familiar with React |
| **Plain HTML + Build Script** | Maximum control, minimal overhead | Manual everything | Very simple sites |

**Recommendation**: Start with **11ty** (good balance of simplicity and power) or **Next.js** (if team prefers React)

---

### 3.2 Data Format Decision

**Options**:
1. **JSON files** (one per project)
2. **YAML frontmatter** in markdown files (content + metadata together)
3. **Single YAML collection** (all projects in one file)
4. **Headless CMS** (Contentful, NetlifyCMS, future option)

**Recommendation for MVP**: **JSON files** in `data/projects/` folder
- Human-readable but structured
- Easy to parse in any language
- Version control friendly
- Can migrate to CMS later if needed

---

## 4. Key Technical Decisions

### PL-ADR-01: Static Site vs. Server-Required

**Status**: DECIDED  
**Decision**: Use static site generation  
**Rationale**:
- Project data is read-heavy, infrequently updated
- Free hosting on GitHub Pages or Vercel
- Aligns with open-source, volunteer-run culture
- No server maintenance burden

---

### PL-ADR-02: Content Versioning in Git

**Status**: DECIDED  
**Decision**: All content and metadata stored in git (no external CMS initially)  
**Rationale**:
- Version history preserved
- Community can contribute via pull requests
- No external service dependencies
- Easy to fork/reuse

---

### PL-ADR-03: Hosting Platform

**Status**: DECIDED  
**Decision**: GitHub Pages  
**Rationale**:
- Free, built into GitHub (no extra platform)
- Simple deployment (push to `gh-pages` branch)
- Works perfectly with 11ty
- Aligns with open-source culture
- No external dependencies

---

### PL-ADR-04: Framework Selection

**Status**: DECIDED  
**Decision**: 11ty (JavaScript-based static site generator)  
**Rationale**:
- Lightweight with fast builds (seconds)
- JavaScript-based (matches team skill set)
- Perfect for content-driven site with 6 projects
- Easy to add interactivity (filters, animations) later
- Can migrate to Next.js if needed (straightforward)

---

## 5. Data Model Specification

### 5.1 Project Metadata Schema

```json
{
  "id": "grid-operator-2425",
  "name": "Grid Operator",
  "description": "Strategic energy management game - manage global energy transition while balancing budget and public happiness.",
  "year": "2024-25",
  "status": "WebHosted",
  "link": {
    "demo": "https://plu-programming-party.github.io/grid-operator/",
    "repository": "https://github.com/plu-programming-party/grid-operator"
  },
  "images": [
    {
      "url": "/assets/projects/grid-operator-screenshot-1.png",
      "caption": "Main gameplay interface",
      "type": "screenshot"
    }
  ],
  "tags": ["game", "strategy", "energy", "environment"],
  "team": [],
  "featured": true
}
```

### 5.2 Site Configuration Schema

```yaml
site:
  title: "Programming Party"
  description: "A weekly gathering of PLU students and alumni building silly projects together"
  url: "https://programmingparty.dev" # TBD
  author: "Programming Party Community"

navigation:
  - name: "Home"
    path: "/"
  - name: "Projects"
    path: "/projects"
  - name: "About"
    path: "/about"
  - name: "Join"
    path: "/join"

projects_per_page: 12
featured_count: 3
```

---

## 6. Wireframes (Text-based for MVP)

### 6.1 Homepage Layout

```
┌─────────────────────────────────────────┐
│         Programming Party               │
│      A Weekly Build Experience          │
│                                         │
│    [Navbar: Home | Projects | About]   │
└─────────────────────────────────────────┘
│                                         │
│  What is Programming Party?             │
│  [Description paragraph]                │
│  [Featured projects (3)]                │
│                                         │
│  [CTA: Browse All Projects]             │
│                                         │
└─────────────────────────────────────────┘
│  Footer: Links, social, about           │
└─────────────────────────────────────────┘
```

### 6.2 Projects Gallery Page

```
┌─────────────────────────────────────────┐
│  All Projects                           │
│  [Search box]  [Filter: Year | Status]  │
└─────────────────────────────────────────┘
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Project Card                    │   │
│  │ [Image]                         │   │
│  │ Grid Operator (2024-25)         │   │
│  │ Strategic energy game...        │   │
│  │ [Play Demo]  [View Repo]        │   │
│  └─────────────────────────────────┘   │
│                                         │
│  [More project cards...]                │
│                                         │
│  [Pagination or infinite scroll]        │
└─────────────────────────────────────────┘
```

### 6.3 Project Detail Page

```
┌─────────────────────────────────────────┐
│  Grid Operator                          │
│  [Back to Projects]                     │
└─────────────────────────────────────────┘
│                                         │
│  [Hero image]                           │
│                                         │
│  2024-25 School Year | Game | Active    │
│                                         │
│  Description:                           │
│  [Full project description]             │
│                                         │
│  [Embedded demo or Play button]         │
│                                         │
│  Built By: [Team members]               │
│                                         │
│  Tags: [game] [strategy] [energy]       │
│                                         │
│  Links:                                 │
│  • [Play Live Demo]                     │
│  • [GitHub Repository]                  │
│                                         │
│  [More project gallery]                 │
└─────────────────────────────────────────┘
```

---

## 7. Implementation Checklist (ITR-001)

### 7.1 Setup & Infrastructure

- [ ] Choose framework (11ty recommended)
- [ ] Set up git repository structure
- [ ] Configure GitHub Pages or Vercel deployment
- [ ] Set up build pipeline (npm scripts)
- [ ] Configure CSS framework (Tailwind? Sass? Custom?)

### 7.2 Data Layer

- [ ] Create `data/projects/` directory
- [ ] Create JSON schema for projects (validate against schema)
- [ ] Populate initial project data (6 projects)
- [ ] Create site configuration YAML

### 7.3 Templates & Pages

- [ ] Create base layout template
- [ ] Create homepage template
- [ ] Create projects listing template
- [ ] Create project card component
- [ ] Create navigation component

### 7.4 Content & Styling

- [ ] Write homepage copy
- [ ] Create/collect project images
- [ ] Design color scheme (silly, playful)
- [ ] Implement responsive CSS
- [ ] Add brand fonts and typography

### 7.5 Validation & Testing

- [ ] Test all pages render correctly
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Verify project data loads correctly
- [ ] Test navigation
- [ ] Test deployment pipeline

---

## 8. Next Steps

**Before Implementation (Phase 4)**:
1. Confirm tech stack choice (11ty vs. Next.js vs. other)
2. Finalize hosting platform (GitHub Pages vs. Vercel)
3. Gather project images/assets
4. Write homepage and about page copy
5. Create detailed iteration timeline

**Phase 4 Deliverables**:
- ITR-001: Working MVP website deployed
- ITR-002 onwards: Additional features per iteration plan

---

## 9. References

- [LD-01: System Architecture](../2-logical/LD-01-system-architecture.md)
- [DS-02: Project Inventory](../1-domain/DS-02-project-inventory.md)
- [Phase 3 Planning Method](../../method/phase-3-planning.md)
