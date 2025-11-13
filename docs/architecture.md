# Architecture

## Executive Summary

This architecture establishes a modern Angular single-page application with Tailwind CSS for building a visually stunning blog article dashboard. The starter template provides a solid foundation with Angular 19+ standalone components, TypeScript, and utility-first CSS, enabling rapid development of the beautiful tile-based interface while maintaining code quality and performance.

## Project Initialization

**First implementation story must execute:**

```bash
# Step 1: Create Angular project
npm init @angular@latest bmad-demo----mmmmmmaaaadddd -- --standalone --style=scss --routing=false

# Step 2: Navigate to project
cd bmad-demo----mmmmmmaaaadddd

# Step 3: Install Tailwind CSS
npm install tailwindcss @tailwindcss/postcss postcss

# Step 4: Configure Tailwind
# Create .postcssrc.json in project root with:
# {
#   "plugins": {
#     "@tailwindcss/postcss": {}
#   }
# }

# Step 5: Add Tailwind to styles
# Add to src/styles.scss:
# @import "tailwindcss";
```

This establishes the base architecture with these decisions already made:

**Starter-Provided Decisions:**
- **Framework:** Angular 19+ (latest stable version as of 2025)
- **Component Architecture:** Standalone components (no NgModules)
- **Language:** TypeScript (full type safety)
- **Styling Solution:** SCSS + Tailwind CSS 4.0
- **Build Tooling:** Angular CLI with esbuild
- **Routing:** Disabled (single-page dashboard, no navigation needed)
- **Project Structure:** Standard Angular workspace layout

## Decision Summary

| Category | Decision | Version | Affects Epics | Rationale |
| -------- | -------- | ------- | ------------- | --------- |
| Framework | Angular | 19+ (2025) | All | Starter template - Modern SPA framework with excellent component model |
| Component Model | Standalone Components | Angular 19+ | All | Starter template - Simplified architecture, no NgModules |
| Language | TypeScript | Latest | All | Starter template - Type safety and better tooling |
| Styling Framework | Tailwind CSS | 4.0 | All | Starter template - Utility-first CSS for rapid beautiful UI development |
| CSS Preprocessor | SCSS | Latest | All | Starter template - Enhanced CSS with variables and nesting |
| Build Tool | Angular CLI | Latest | All | Starter template - Modern build system with esbuild |
| Routing | None | N/A | All | Starter template - Single page, no routing needed |
| HTTP Client | Angular HttpClient | Built-in | FR1 | Native Angular HTTP client with Observable support |
| Data Fetching Pattern | Signals with toSignal() | Angular 19+ | All | Modern reactive state management with Angular signals |
| RSS Parsing | Native DOMParser | Browser API | FR1 | No external dependencies, full control over parsing |
| Date Formatting | Angular DatePipe | Built-in | FR2 | Built-in formatting, no dependencies |
| Animation Strategy | Tailwind CSS Transitions | Tailwind 4.0 | FR5 | Simple, performant animations via utility classes |
| Image Optimization | NgOptimizedImage | Angular Built-in | FR2, FR5 | Automatic lazy loading and responsive images |
| Deployment | Local Only | N/A | All | Development environment only, ng serve |

## Project Structure

```
bmad-demo----mmmmmmaaaadddd/
├── .postcssrc.json           # Tailwind PostCSS configuration
├── angular.json              # Angular workspace configuration
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── tsconfig.app.json         # App-specific TypeScript config
├── tsconfig.spec.json        # Test TypeScript config
├── src/
│   ├── index.html            # HTML entry point
│   ├── main.ts               # Application bootstrap
│   ├── styles.scss           # Global styles with Tailwind imports
│   ├── app/
│   │   ├── app.component.ts        # Root app component (standalone)
│   │   ├── app.component.html      # Root template
│   │   ├── app.component.scss      # Root styles
│   │   ├── app.component.spec.ts   # Root component tests
│   │   ├── app.config.ts           # Application configuration
│   │   │
│   │   ├── core/                   # Core services and utilities
│   │   │   └── services/
│   │   │       └── blog.service.ts           # Blog data fetching service
│   │   │       └── blog.service.spec.ts      # Service tests
│   │   │
│   │   ├── shared/                 # Shared components, pipes, models
│   │   │   ├── models/
│   │   │   │   └── article.interface.ts      # Article data model
│   │   │   │   └── blog-response.interface.ts # RSS response model
│   │   │   └── pipes/
│   │   │       └── relative-time.pipe.ts     # Custom pipe for "2 days ago" (if needed)
│   │   │
│   │   └── features/               # Feature modules
│   │       └── dashboard/
│   │           ├── dashboard.component.ts         # Smart component (container)
│   │           ├── dashboard.component.html       # Dashboard template
│   │           ├── dashboard.component.scss       # Dashboard styles
│   │           ├── dashboard.component.spec.ts    # Dashboard tests
│   │           │
│   │           └── components/                    # Presentational components
│   │               ├── article-grid/
│   │               │   ├── article-grid.component.ts
│   │               │   ├── article-grid.component.html
│   │               │   ├── article-grid.component.scss
│   │               │   └── article-grid.component.spec.ts
│   │               │
│   │               ├── article-tile/
│   │               │   ├── article-tile.component.ts
│   │               │   ├── article-tile.component.html
│   │               │   ├── article-tile.component.scss
│   │               │   └── article-tile.component.spec.ts
│   │               │
│   │               └── loading-skeleton/
│   │                   ├── loading-skeleton.component.ts
│   │                   ├── loading-skeleton.component.html
│   │                   └── loading-skeleton.component.scss
│   │
│   ├── assets/               # Static assets
│   │   └── images/
│   │       └── placeholder.svg   # Fallback image for articles without featured image
│   │
│   └── environments/         # Environment configuration
│       ├── environment.ts         # Development config
│       └── environment.prod.ts    # Production config (if needed)
│
└── public/                   # Public static files
```

## Epic to Architecture Mapping

| Epic/Functional Requirement | Architecture Component | Location | Implementation Notes |
| ---------------------------- | ---------------------- | -------- | -------------------- |
| FR1: Blog Data Integration | BlogService | `src/app/core/services/blog.service.ts` | Fetch RSS via HttpClient, parse with DOMParser, map to Article[] |
| FR1: Article Fetching | HttpClient + DOMParser | BlogService | Native browser parsing, no external libraries |
| FR1: Data Refresh | BlogService.refreshArticles() | BlogService | Manual refresh method, returns Observable<Article[]> |
| FR2: Article Display | ArticleGridComponent | `src/app/features/dashboard/components/article-grid/` | Receives Article[] via @Input, renders grid layout |
| FR2: Tile Grid Layout | ArticleGridComponent | article-grid.component.html | Tailwind grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` |
| FR2: Tile Content | ArticleTileComponent | `src/app/features/dashboard/components/article-tile/` | Presentational component for individual article |
| FR2: Featured Images | NgOptimizedImage | article-tile.component.html | `<img ngSrc="..." loading="lazy">` |
| FR3: Article Navigation | ArticleTileComponent click handler | article-tile.component.ts | `window.open(article.url, '_blank')` |
| FR4: Responsive Layout | Tailwind responsive classes | *.component.html | Breakpoints: default (mobile), md:, lg:, xl: |
| FR5: Visual Presentation | Tailwind utilities + SCSS | All components | Tailwind for layout/spacing, SCSS for custom styles |
| FR5: Animations | Tailwind transitions | article-tile.component.html | `hover:scale-105 transition duration-300 ease-in-out` |
| Loading States | LoadingSkeletonComponent | `src/app/features/dashboard/components/loading-skeleton/` | Skeleton screens during data fetch |
| Error Handling | DashboardComponent error signal | dashboard.component.ts | Display user-friendly error message in template |

## Technology Stack Details

### Core Technologies

**Frontend Framework: Angular 19+**
- Standalone component architecture
- Signals for reactive state management
- Built-in animation system
- Zone.js for change detection (or zoneless if configured)
- RxJS for reactive programming

**Styling: Tailwind CSS 4.0 + SCSS**
- Utility-first CSS framework
- CSS-first configuration (no tailwind.config.js in v4)
- SCSS for custom component styles
- Responsive design utilities built-in

**Language: TypeScript**
- Full type safety across application
- Enhanced IDE support
- Modern JavaScript features

**Build & Dev Tools:**
- Angular CLI for project management
- esbuild-based dev server (fast)
- Hot module replacement
- Built-in testing framework (Jasmine + Karma)

### Integration Points

**codecentric Blog RSS Feed**
- **URL:** https://codecentric.de/blog/feed (or equivalent RSS endpoint)
- **Protocol:** HTTP GET request
- **Format:** RSS 2.0 XML
- **Parsing:** Native browser DOMParser API
- **CORS:** May require proxy configuration in angular.json for local dev

**Component Communication**
- **DashboardComponent → ArticleGridComponent:** Pass articles array via @Input
- **ArticleGridComponent → ArticleTileComponent:** Pass individual article via @Input
- **ArticleTileComponent → External:** window.open() for article navigation

**Service → Component Data Flow**
- BlogService returns Observable<Article[]>
- DashboardComponent converts to signal via toSignal()
- Template consumes signal directly (no async pipe needed)

## Implementation Patterns

These patterns ensure consistent implementation across all AI agents:

### Naming Conventions

**Components:**
- PascalCase: `ArticleTileComponent`, `DashboardComponent`
- File naming: `article-tile.component.ts`, `dashboard.component.ts`
- Selector naming: `app-article-tile`, `app-dashboard`

**Services:**
- PascalCase with Service suffix: `BlogService`, `ArticleService`
- File naming: `blog.service.ts`

**Interfaces/Types:**
- PascalCase: `Article`, `BlogResponse`
- File naming: `article.interface.ts`, `blog-response.interface.ts`

**Files and Folders:**
- kebab-case for all file and folder names
- Component files: `*.component.ts`, `*.component.html`, `*.component.scss`, `*.component.spec.ts`
- Service files: `*.service.ts`, `*.service.spec.ts`

### Code Organization

**Feature-based Structure:**
```
src/app/
├── core/                    # Singleton services, guards
│   └── services/
│       └── blog.service.ts
├── features/                # Feature modules
│   └── dashboard/
│       ├── components/
│       │   ├── article-tile/
│       │   └── article-grid/
│       └── dashboard.component.ts
├── shared/                  # Shared components, pipes, directives
│   ├── components/
│   ├── pipes/
│   └── models/
│       └── article.interface.ts
└── app.component.ts
```

**Component Structure:**
- Each component in its own folder
- Co-located: `.ts`, `.html`, `.scss`, `.spec.ts`
- Smart/Container components in feature root
- Presentational/Dumb components in `components/` subfolder

**Service Location:**
- Core services (used globally): `src/app/core/services/`
- Feature-specific services: within feature folder
- Provide services at component level when possible (tree-shakeable)

### Error Handling

**HTTP Errors:**
```typescript
this.blogService.getArticles().pipe(
  catchError((error: HttpErrorResponse) => {
    console.error('Failed to fetch articles:', error);
    // Show user-friendly error message
    return of([]);
  })
)
```

**Error Format:**
- Log errors with context to console
- Display user-friendly messages in UI
- Use Angular's error handling for unhandled errors

### Logging Strategy

**Development:**
- Console logging for debugging
- Angular DevTools for component inspection

**Production:**
- Minimal console output
- Error tracking service integration (if needed later)

## Consistency Rules

### TypeScript Patterns

**Observable Naming:**
- Suffix with `$`: `articles$`, `loading$`
- Use async pipe in templates: `*ngIf="articles$ | async as articles"`

**Component Properties:**
- Public properties for template bindings
- Private properties prefixed with `_` or use TypeScript `private`
- Use signals for reactive state: `articles = signal<Article[]>([])`

**Dependency Injection:**
- Use constructor injection
- Private readonly for services
```typescript
constructor(private readonly blogService: BlogService) {}
```

### Tailwind CSS Patterns

**Component Styling:**
- Use Tailwind utilities in templates for layout/spacing
- Use component SCSS for complex animations or unique styles
- Extract common patterns to SCSS mixins if needed

**Responsive Classes:**
- Mobile-first approach: `class="col-span-1 md:col-span-2 lg:col-span-3"`
- Breakpoints: default (mobile), `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

**Color Scheme:**
- Use Tailwind's default palette or customize via CSS variables
- Consistent color usage: primary, secondary, accent

### Animation Patterns

**Tailwind Transitions:**
- Use Tailwind transition utilities: `transition duration-300 ease-in-out`
- Hover effects: `hover:scale-105 hover:shadow-lg`

**Angular Animations (for complex animations):**
- Define in component metadata
- Use for enter/leave animations
- Trigger via template bindings

### RSS Parsing Implementation Pattern

**CRITICAL: All agents MUST parse RSS exactly this way:**

```typescript
// Fetch and parse RSS XML
const parser = new DOMParser();
const xmlDoc = parser.parseFromString(rssXml, 'text/xml');
const items = xmlDoc.querySelectorAll('item');

// Map to Article interface - exact field mapping required
const articles: Article[] = Array.from(items).map((item, index) => ({
  id: item.querySelector('guid')?.textContent || `article-${index}`,
  title: item.querySelector('title')?.textContent || 'Untitled',
  author: item.querySelector('author')?.textContent ||
          item.querySelector('dc\\:creator')?.textContent || 'Unknown',
  publishDate: new Date(item.querySelector('pubDate')?.textContent || Date.now()),
  excerpt: item.querySelector('description')?.textContent || '',
  url: item.querySelector('link')?.textContent || '#',
  featuredImage: item.querySelector('media\\:thumbnail')?.getAttribute('url') || undefined,
  categories: Array.from(item.querySelectorAll('category')).map(cat => cat.textContent || '')
}));
```

**Why this matters:** Different XML selectors or fallback values will cause inconsistent Article objects.

### Component State Pattern with Signals

**CRITICAL: All agents MUST use signals this way:**

```typescript
// Component signal definitions
articles = signal<Article[]>([]);
loading = signal<boolean>(false);
error = signal<string | null>(null);

// Update pattern - use .set() not .update()
this.loading.set(true);
this.error.set(null);

// After fetch
this.articles.set(fetchedArticles);
this.loading.set(false);

// On error
this.error.set('Failed to load articles');
this.loading.set(false);
```

**Why this matters:** Mixing .set() and .update() or direct assignment will cause inconsistent behavior.

### Responsive Grid Layout Pattern

**CRITICAL: All grid layouts MUST use exactly:**

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
  <!-- content -->
</div>
```

**Breakpoint mapping:**
- Mobile (default): 1 column
- Tablet (md: 768px): 2 columns
- Desktop (lg: 1024px): 3 columns
- Large Desktop (xl: 1280px): 4 columns

**Why this matters:** Different breakpoints or column counts will create inconsistent layouts.

### Article Tile Hover Effect Pattern

**CRITICAL: All article tiles MUST use exactly:**

```html
<div class="transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer rounded-lg overflow-hidden">
  <!-- tile content -->
</div>
```

**Required classes:**
- `transition duration-300 ease-in-out` - Smooth transitions
- `hover:scale-105` - Slight scale up on hover
- `hover:shadow-lg` - Shadow increase on hover
- `cursor-pointer` - Indicate clickability
- `rounded-lg` - Consistent border radius
- `overflow-hidden` - Prevent image overflow

**Why this matters:** Different hover effects will break the cohesive visual experience.

## Data Architecture

### Data Models

**Article Interface:**
```typescript
interface Article {
  id: string;
  title: string;
  author: string;
  publishDate: Date;
  excerpt: string;
  url: string;
  featuredImage?: string;
  categories?: string[];
}
```

**Blog Response:**
```typescript
interface BlogResponse {
  articles: Article[];
  totalCount: number;
  lastUpdated: Date;
}
```

### State Management

**Component-level State:**
- Use Angular signals for reactive state
- `articles = signal<Article[]>([])`
- `loading = signal<boolean>(false)`
- `error = signal<string | null>(null)`

**No Global State:**
- Simple dashboard doesn't require NgRx or similar
- Component signals are sufficient

## API Contracts

### Blog Data Fetching

**Service Method:**
```typescript
getArticles(): Observable<Article[]> {
  return this.http.get<BlogResponse>(this.apiUrl).pipe(
    map(response => response.articles),
    catchError(this.handleError)
  );
}
```

**RSS/API Integration:**
- Fetch from codecentric.de/blog RSS feed or API
- Parse response into Article interface
- Handle CORS if needed (proxy configuration in angular.json)

**Error Response:**
```typescript
{
  error: {
    message: string;
    code: string;
  }
}
```

## Security Architecture

**Basic Security:**
- HTTPS for production deployment
- Angular's built-in XSS protection (template sanitization)
- No sensitive data storage (read-only public blog content)

**CORS Configuration:**
- Configure proxy in `angular.json` for local development if needed
- Production deployment handles CORS via server configuration

**Content Sanitization:**
- Angular automatically sanitizes template bindings
- Use DomSanitizer only when necessary for trusted HTML

## Performance Considerations

### Loading Performance

**Initial Load:**
- Lazy load images: `loading="lazy"` attribute
- Minimize bundle size via tree-shaking
- Use production build: `ng build --configuration production`

**Runtime Performance:**
- OnPush change detection for article tiles
- Virtual scrolling if displaying many articles (CDK)
- Debounce search/filter inputs

**Animation Performance:**
- Use CSS transforms (GPU-accelerated)
- Avoid layout thrashing
- 60fps target via will-change hints when needed

### Bundle Optimization

**Code Splitting:**
- Lazy load feature modules if app grows
- Tree-shake unused Tailwind classes (automatic in production)

## Deployment Architecture

**Build Output:**
- `ng build --configuration production`
- Static files in `dist/` folder

**Hosting Options:**
- Static hosting: Netlify, Vercel, GitHub Pages
- CDN deployment for global performance
- Environment variables for API endpoints

**Environment Configuration:**
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  blogApiUrl: 'https://codecentric.de/blog/feed'
};
```

## Development Environment

### Prerequisites

**Required:**
- Node.js 18+ (LTS)
- npm 9+

**Optional:**
- Angular DevTools browser extension
- VS Code with Angular Language Service extension

### Setup Commands

```bash
# Install dependencies
npm install

# Run development server
ng serve

# Run tests
ng test

# Build for production
ng build --configuration production

# Lint code
ng lint
```

**Dev Server:**
- Runs at `http://localhost:4200`
- Hot module replacement enabled
- Fast refresh with esbuild

## Architecture Decision Records (ADRs)

### ADR-001: Angular + Tailwind CSS Stack

**Decision:** Use Angular 19+ with Tailwind CSS 4.0

**Rationale:**
- Angular provides robust component architecture for complex UI
- Standalone components simplify architecture
- Tailwind enables rapid development of beautiful designs
- Strong TypeScript support for maintainability
- Excellent animation capabilities for smooth transitions

**Status:** Accepted (via starter template selection)

### ADR-002: No Routing

**Decision:** Disable Angular routing

**Rationale:**
- Single-page dashboard with no navigation
- Reduces bundle size and complexity
- All articles open in external tabs

**Status:** Accepted

### ADR-003: Component-level State with Signals

**Decision:** Use Angular signals for state management, no global state library

**Rationale:**
- Simple application with minimal shared state
- Signals provide reactive state with better performance than Observables for this use case
- No need for NgRx/Akita complexity
- Can scale to global state manager if needed later

**Status:** Accepted

---

_Generated by BMAD Decision Architecture Workflow v1.3.2_
_Date: 2025-11-12_
_For: Master_