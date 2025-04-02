Make a cool looking Neobrutalism style page, for now it will be just a hero section, introduction to my developer portfolio, with a cool layout based background that will respond to user scroll, and have cool animations, like shapes or something, make it unique, and make the theme selector be a cool navbar theme picker, make the navbar layout based, and make it use the best practices i told you about, we already have all the shadcn components and we are using bun, and tailwind v4, The Neobrutalism UI Design Style is: 

    Bold Typography: The use of large, heavy typography with strong, sans-serif typefaces.
    Dark, Heavy Black Outlines and Borders: You'll most commonly see cards and buttons outline with heavy black borders.
    Clashing colors with High contrast: Strong contrasts between colors, typography, and background elements for visual impact.
    Unconventional Layouts: Embracing asymmetry, irregular grids, and non-traditional alignments.
    Unusual shapes - You'll ususally find abstract, irregular geometics shapes used to evoked reaction and emotion.
    Rough and raw aesthetics: Incorporating rough textures, conflicting colors and the use of unpolished or unrefined visual elements.




Before responding to any request, follow these steps:

1. Request Analysis
   - Determine task type (code creation, debugging, architecture, etc.)
   - Identify languages and frameworks involved
   - Note explicit and implicit requirements
   - Define core problem and desired outcome
   - Consider project context and constraints

2. Solution Planning
   - Break down the solution into logical steps
   - Consider modularity and reusability
   - Identify necessary files and dependencies
   - Evaluate alternative approaches
   - Plan for testing and validation

3. Implementation Strategy
   - Choose appropriate design patterns
   - Consider performance implications
   - Plan for error handling and edge cases
   - Ensure accessibility compliance
   - Verify best practices alignment

## Code Style and Structure

### General Principles

- Write concise, readable TypeScript code
- Use functional and declarative programming patterns
- Follow DRY (Don't Repeat Yourself) principle
- Implement early returns for better readability
- Structure components logically: exports, subcomponents, helpers, types

### Naming Conventions

- Use descriptive names with auxiliary verbs (isLoading, hasError)
- Prefix event handlers with "handle" (handleClick, handleSubmit)
- Use lowercase with dashes for directories (components/auth-wizard)
- Favor named exports for components

### TypeScript Usage

- Use TypeScript for all code
- Prefer interfaces over types
- Avoid enums; use const maps instead
- Implement proper type safety and inference
- Use `satisfies` operator for type validation

## React 19 and Next.js 15 Best Practices

### Component Architecture

- Favor React Server Components (RSC) where possible
- Minimize 'use client' directives
- Implement proper error boundaries
- Use Suspense for async operations
- Optimize for performance and Web Vitals

### State Management

- Use `useActionState` instead of deprecated `useFormState`
- Leverage enhanced `useFormStatus` with new properties (data, method, action)
- Implement URL state management with 'nuqs'
- Minimize client-side state

### Async Request APIs

```typescript
// Always use async versions of runtime APIs
const cookieStore = await cookies()
const headersList = await headers()
const { isEnabled } = await draftMode()

// Handle async params in layouts/pages
const params = await props.params
const searchParams = await props.searchParams