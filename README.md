# User Management Application

A modern Angular 21 application for managing users with full CRUD operations, search, sorting, and pagination capabilities.

## Features

- **User Management**: View, edit, and update user information
- **Search & Filter**: Real-time search across user names and usernames
- **Sorting**: Click column headers to sort by ID, name, or creation date
- **Pagination**: Configurable page sizes (25, 50, 100 items per page)
- **Responsive Design**: Bootstrap-based UI that works on all screen sizes
- **New User Indicators**: Visual badges for users created in the current month

## Architecture

### Project Structure

```
src/app/
├── core/                    # Core services and configuration
│   ├── config/             # API configuration
│   └── services/           # HTTP and logging services
├── shared/                 # Shared utilities and components
│   ├── components/         # Reusable components (pagination)
│   ├── services/          # Utility services (sorting, date)
│   └── utils/             # Helper utilities
└── features/users/         # User feature module
    ├── components/         # User-specific components
    ├── models/            # User data models
    └── services/          # User business logic
```

### Design Patterns

- **Service Layer Architecture**: Separation of concerns with dedicated services
- **Reactive Programming**: RxJS observables for data flow
- **Signal-based State**: Angular signals for reactive UI updates
- **Component Composition**: Modular, reusable components

## Development

### Prerequisites

- Node.js (v18 or higher)
- Angular CLI 21.0.0

### Installation

```bash
npm install
```

### Development Server

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you change source files.

### Building

```bash
ng build
```

Build artifacts will be stored in the `dist/` directory.

### Testing

```bash
ng test
```

## API Integration

The application connects to a MockAPI service:

- **Base URL**: `https://691f35f0bb52a1db22c0eea5.mockapi.io/api`
- **Endpoints**: `/users` for all user operations
- **Methods**: GET (list/single), PUT (update)

## Technical Implementation

### Key Technologies

- **Angular 21**: Latest framework features including signals
- **Bootstrap 5**: Responsive UI framework
- **RxJS**: Reactive programming for HTTP operations
- **TypeScript**: Type-safe development
- **SCSS**: Enhanced styling capabilities

### Special Features Added

1. **Service Layer Pattern**:
   - `UserService`: API communication
   - `UserBusinessService`: Business logic and data processing
   - `UserPresentationService`: UI-specific formatting

2. **Utility Services**:
   - `SortingService`: Generic sorting with type safety
   - `DateUtilsService`: Date formatting and comparison
   - `PaginationUtils`: Pagination calculations

3. **Responsive Design**:
   - Mobile-first approach
   - Flexible table layouts
   - Responsive modal dialogs

4. **User Experience Enhancements**:
   - Loading states with spinners
   - Visual feedback for new users
   - Intuitive sorting indicators
   - Form validation with disabled states

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Additional Resources

- [Angular Documentation](https://angular.dev)
- [Bootstrap Documentation](https://getbootstrap.com)
- [RxJS Documentation](https://rxjs.dev)
