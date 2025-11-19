# Toast Notification Usage Guide

## Overview
The CitrusInsight AI application includes a custom toast notification system for displaying user-friendly messages throughout the app.

## Setup
The toast system is already configured in `App.jsx`:
```jsx
import { ToastProvider } from './context/ToastContext';
import Toast from './components/common/Toast';

function App() {
  return (
    <ToastProvider>
      <Toast />
      {/* Your app content */}
    </ToastProvider>
  );
}
```

## Using Toasts in Components

### 1. Import the Hook
```jsx
import { useToast } from '../../context/ToastContext';
```

### 2. Get Toast Functions
```jsx
const { showSuccess, showError, showWarning, showInfo } = useToast();
```

### 3. Display Toasts

#### Success Toast
```jsx
showSuccess('Operation completed successfully!');
showSuccess('Scan deleted successfully', 3000); // Custom duration (3 seconds)
```

#### Error Toast
```jsx
showError('Failed to load data. Please try again.');
showError('Network error occurred', 5000); // Custom duration (5 seconds)
```

#### Warning Toast
```jsx
showWarning('This action cannot be undone.');
```

#### Info Toast
```jsx
showInfo('Processing your request...');
```

## Complete Example

```jsx
import { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { deleteScan } from '../../services/scanService';

const MyComponent = () => {
  const { showSuccess, showError } = useToast();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (scanId) => {
    try {
      setLoading(true);
      await deleteScan(scanId);
      showSuccess('Scan deleted successfully');
    } catch (error) {
      const errorMessage = error.userMessage || error.message || 'Failed to delete scan';
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={() => handleDelete('123')}>
      Delete Scan
    </button>
  );
};
```

## Toast Types and Colors

| Type    | Color  | Icon | Use Case |
|---------|--------|------|----------|
| success | Green  | ✓    | Successful operations |
| error   | Red    | ✗    | Failed operations, errors |
| warning | Amber  | ⚠    | Warnings, cautions |
| info    | Blue   | ℹ    | Informational messages |

## Default Behavior

- **Duration**: 5 seconds (5000ms)
- **Position**: Top-right corner
- **Animation**: Slide in from right, fade out
- **Auto-dismiss**: Yes (can be customized)
- **Manual dismiss**: Click the X button

## Advanced Usage

### Custom Duration
```jsx
// Toast will stay for 10 seconds
showSuccess('Important message', 10000);

// Toast will stay indefinitely (until manually dismissed)
showError('Critical error', 0);
```

### Using the Generic showToast
```jsx
const { showToast } = useToast();

// Custom toast with all options
showToast('Custom message', 'success', 3000);
```

### Removing Toasts Programmatically
```jsx
const { showToast, removeToast } = useToast();

// Show toast and get its ID
const toastId = showToast('Processing...', 'info', 0);

// Later, remove it manually
setTimeout(() => {
  removeToast(toastId);
}, 5000);
```

## Best Practices

1. **Keep messages concise**: Toasts should be brief and to the point
2. **Use appropriate types**: Match the toast type to the message context
3. **Avoid toast spam**: Don't show multiple toasts for the same action
4. **Provide actionable information**: Tell users what happened and what to do next
5. **Use consistent language**: Maintain a consistent tone across all toasts

## Examples from the App

### Success Messages
- "Image analyzed successfully!"
- "Scan deleted successfully"
- "Profile updated successfully"

### Error Messages
- "Network error. Please check your internet connection and try again."
- "Failed to load scan history"
- "Server error. Please try again later."

### Warning Messages
- "This action cannot be undone"
- "File size exceeds 10MB limit"

### Info Messages
- "Processing your request..."
- "Uploading image..."

## Styling

Toasts are styled with TailwindCSS and include:
- Gradient backgrounds based on type
- Smooth animations
- Responsive design
- Shadow effects
- Icon indicators

## Accessibility

- Toasts are positioned to not block important content
- Color-coded for quick recognition
- Icons provide visual cues
- Manual dismiss option available
- Screen reader friendly (ARIA labels can be added if needed)

## Troubleshooting

### Toast not appearing?
1. Ensure `ToastProvider` wraps your app
2. Check that `Toast` component is rendered
3. Verify you're using `useToast` inside a component

### Multiple toasts stacking?
This is expected behavior. Each toast will appear below the previous one.

### Toast not auto-dismissing?
Check if you set duration to 0 (which means no auto-dismiss).

## Integration with API Errors

The API service automatically enhances errors with user-friendly messages:

```jsx
try {
  await api.get('/some-endpoint');
} catch (error) {
  // error.userMessage contains a user-friendly message
  showError(error.userMessage || error.message || 'An error occurred');
}
```

## Future Enhancements

Potential improvements for the toast system:
- Toast queue management (limit concurrent toasts)
- Action buttons in toasts
- Progress indicators
- Sound notifications
- Persistent toasts (saved to localStorage)
- Toast history/log
