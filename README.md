# ProgrammingPartyWebsite

A project built using the RAPID Method for AI-assisted development.

## Quick Start

```bash
# Check project status
.venv\Scripts\python scripts/rapid_status.py --ai

# Search for guidance
.venv\Scripts\python scripts/rapid_lookup.py --search "topic"

# Start a session
.venv\Scripts\python scripts/rapid_session.py --start
```

## Project Structure

```
├── .rapid/           # RAPID configuration
├── .github/          # GitHub configuration
├── design/           # Design artifacts by phase
│   ├── 1-domain/     # Phase R: Domain specs
│   ├── 2-logical/    # Phase A: Logical design
│   ├── 3-planning/  # Phase P: Impl design
│   ├── 4-implementation/   # Phase I: Delivery
│   └── archive/      # Iteration archives
└── README.md
```

## RAPID Method

This project follows the 4-phase RAPID cycle:

1. **R**equirements - Capture and analyze domain
2. **A**rchitecture - Design logical structure
3. **P**lanning - Create implementation plans
4. **I**mplementation - Build and deliver

See the [RAPID Method documentation](https://github.com/rapid-method/rapid) for details.
