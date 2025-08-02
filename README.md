# TygrlabsAssessment

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.4.

## Project Structure

This project follows a structured approach for scalable Angular development with mobile responsiveness:

```
src/
├── app/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Desktop and mobile views
│   │   └── mobile/       # Mobile-specific components
│   ├── services/         # API interactions and business logic
│   ├── models/           # TypeScript interfaces/types
│   └── app.module.ts     # Main application module
├── assets/
│   └── scss/
│       ├── _variables.scss  # Colors, spacing, typography
│       ├── _mixins.scss     # Reusable media queries, flex/grid
│       └── style.scss       # Main stylesheet imports
└── index.html
```

## Development Guidelines

### SCSS Architecture
- **BEM Naming Convention**: Follow `block__element--modifier` structure
- **Variables**: Use SCSS variables for colors, spacing, and typography consistency
- **Mixins**: Leverage mixins for responsive design and common layouts
- **Mobile-First**: Use `max-width: 767px` for mobile overrides

### Angular Best Practices
- **Standalone Components**: Use standalone components over NgModules
- **Signals**: Implement signals for state management
- **TypeScript**: Follow strict typing with proper interfaces
- **Mobile Strategy**: Place mobile-specific views under `/pages/mobile/`

### Component Organization
- Keep components focused on single responsibility
- Use `input()` and `output()` functions instead of decorators
- Implement `OnPush` change detection strategy
- Create reusable components in the `/components` folder

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
