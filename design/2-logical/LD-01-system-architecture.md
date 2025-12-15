# LD-01: Programming Party Website - System Architecture

**Version**: 0.1  
**Date**: 2025-12-15  
**Status**: Draft  
**Phase**: 2 - Architecture (Logical Design)

---

## 1. Architectural Overview

### 1.1 System Context

The Programming Party Website serves as a community hub that:
- Educates visitors about Programming Party (what it is, how to join)
- Showcases 6 years of creative projects in an engaging gallery
- Links to projects with existing web presence (Grid Operator, Solar Flare, Notedle, etc.)
- Provides fallback repository links for projects without hosted demos
- Maintains a playful, silly tone matching Programming Party's culture

### 1.2 Key Architectural Drivers

| Driver | Impact | Decision |
|--------|--------|----------|
| Project showcase requires visual gallery | UI structure | Single-page app or multi-page site with project detail pages |
| Mix of internal content + external links | Data structure | Hybrid model: static metadata + external integrations |
| Playful brand identity | Design approach | Custom styling to match Programming Party culture |
| Long-term maintainability | Tech choice | Simple, low-overhead tech stack (static site or lightweight framework) |
| Team member tracking (future) | Data model | Project metadata includes team member references |

---

## 2. System Architecture

### 2.1 High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser / User                          │
└──────────────────────┬──────────────────────────────────────┘
                       │
                ┌──────▼──────────┐
                │   Website UI    │
                ├─────────────────┤
                │ - Homepage      │
                │ - Project List  │
                │ - Project Pages │
                │ - Navigation    │
                └──────┬──────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
   ┌────▼────────┐           ┌───────▼──────┐
   │ Static Site │           │  Hosted      │
   │ (Pages,     │           │  External    │
   │  Images,    │           │  Projects    │
   │  Assets)    │           │  (links to)  │
   └────┬────────┘           └───────┬──────┘
        │                             │
   ┌────▼────────────────────────────▼────┐
   │   Project Metadata Store             │
   │ (project inventory, descriptions,    │
   │  links, team references)             │
   └──────────────────────────────────────┘
```

### 2.2 Component Breakdown

#### Component 1: Website UI Layer
**Responsibility**: Render website content and handle user interaction

- **Homepage**: Explains Programming Party, shows featured projects
- **Project Gallery**: Lists all projects with filtering/search capability
- **Project Detail Pages**: Individual project showcase with description, links, images
- **Navigation**: Menu system to browse content
- **Styling**: Playful, silly visual design matching Programming Party brand

#### Component 2: Project Metadata Store
**Responsibility**: Manage project information (single source of truth)

- **Storage Format**: JSON, YAML, or markdown frontmatter (TBD in Phase 3)
- **Content**:
  - Project name, description, year
  - Project status (completed, in-progress, archived, failed)
  - Links (hosted demo, repository, external projects)
  - Team member references
  - Project images/assets
- **Update Path**: Markdown files or JSON, version-controlled in git

#### Component 3: External Project Links
**Responsibility**: Integrate with external hosted projects

- **Grid Operator**: https://plu-programming-party.github.io/grid-operator/
- **Solar Flare**: https://plu-programming-party.github.io/Solar_Flare_The_Game/
- **Notedle**: https://notedle.web.app
- **Meme Vector Explorer**: [Repository TBD]
- **Emotion Detection Game**: [Link TBD]

---

## 3. Logical Data Model

### 3.1 Core Entities

#### Project
```
Project {
  id: string (unique identifier)
  name: string
  description: string
  year: string (school year, e.g., "2024-25")
  status: enum (WebHosted | RepoOnly | Failed | InProgress | Archived)
  link: {
    demo?: string (URL to hosted demo)
    repository?: string (GitHub URL)
    external?: string (external project link)
  }
  team: Team[] (references to team members)
  images: Image[] (project screenshots/assets)
  tags: string[] (e.g., "game", "ml", "music", "silly")
}

Image {
  url: string
  caption: string
  type: enum (screenshot | banner | thumbnail)
}
```

#### Team Member (Future)
```
TeamMember {
  id: string
  name: string
  role: enum (Student | TitanOfIndustry)
  graduationYear: string (if student)
  projects: string[] (project IDs)
}
```

### 3.2 Entity Relationships

```
Project --* Team Member (many-to-many via team array)
Project --* Image (one-to-many)
```

---

## 4. Integration Patterns

### 4.1 External Project Integration

**Pattern**: Link aggregation with fallback navigation

- **For hosted projects**: Embed iframe or deep-link directly
- **For repo-only projects**: Link to GitHub repo with description
- **Metadata aggregation**: Central project database serves as single source of truth

### 4.2 Content Management Strategy

**Pattern**: Version-controlled content as code

- Project metadata stored in git alongside website code
- Updates via pull requests to ensure quality control
- Allows decentralized contribution (any team member can add projects)

---

## 5. Non-Functional Characteristics

| Characteristic | Requirement | Approach |
|---|---|---|
| **Performance** | Fast page loads | Static site generation or lightweight SPA |
| **Availability** | Always accessible | Hosted on reliable platform (GitHub Pages, Firebase, Vercel, etc.) |
| **Maintainability** | Easy for team to update | Simple file format for project metadata |
| **Scalability** | Support growing project count | Content-driven (scales with files, not code) |
| **Brand Consistency** | Playful, silly tone | Custom CSS + brand guidelines in repo |

---

## 6. Key Design Decisions (ADRs)

### ADR-01: Static Site vs. Dynamic Application

**Decision**: Use static site generation or simple SPA  
**Rationale**:
- Project data is primarily read-heavy (limited user interaction)
- Static hosting (GitHub Pages) is free and aligns with open-source culture
- Content changes are infrequent (new projects 1-2x per year)
- Lower maintenance overhead for volunteer-run project

**Consequences**:
- (+) Fast, reliable, no server management
- (+) Easy to fork/contribute
- (-) Real-time updates require rebuild/redeploy

---

### ADR-02: Metadata Storage Format

**Decision**: TBD in Phase 3 (JSON, YAML, or markdown frontmatter)  
**Rationale**:
- Version-control friendly
- Human-readable for editing
- Can be imported into various static site generators

**Candidates**:
- JSON: Structured, easy to parse programmatically
- YAML: Human-friendly, less verbose than JSON
- Markdown frontmatter: Combines content + metadata in single file

---

### ADR-03: Project Status Categories

**Decision**: Explicit status field with predefined values  
**Rationale**:
- Clarifies whether project is playable/viewable or documentation-only
- Allows filtering (show only completed projects vs. all projects)
- Accommodates failed experiments (celebrate learning, not just wins)

**Status Options**:
- `WebHosted`: Live demo available
- `RepoOnly`: GitHub repo available but no hosted demo
- `InProgress`: Currently being built
- `Archived`: Historical/complete but not active
- `Failed`: Experiment that didn't reach completion

---

## 7. Iteration Strategy

**For Phase 3 (Planning)**, prioritize iterations based on:

1. **Iteration 1**: Homepage + basic project gallery (core MVP)
2. **Iteration 2**: Project detail pages with external link integration
3. **Iteration 3**: Search/filter functionality
4. **Iteration 4**: Team member profiles (if included)

---

## 8. Open Questions / TBD

- [ ] Exact tech stack (static site generator vs. SPA framework)
- [ ] Metadata storage format (JSON vs. YAML vs. markdown)
- [ ] Hosting platform (GitHub Pages vs. Vercel vs. Firebase)
- [ ] Team member tracking scope (in MVP or future feature)
- [ ] Search/filter implementation (client-side vs. build-time indexing)
- [ ] Animation/interactivity style (match project playfulness)

---

## 9. References

- [DS-01: Overview](../1-domain/DS-01-overview.md)
- [DS-02: Project Inventory](../1-domain/DS-02-project-inventory.md)
- [Phase 2 Architecture Method](../../method/phase-2-architecture.md)
