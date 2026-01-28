# DMAS Design System - Production-Grade Components

This design system provides a complete set of production-ready components with loading states, animations, validation, and proper feedback mechanisms to make the application feel professional and polished.

## 🎨 Components Overview

### 1. Enhanced Button Component

**Location:** `/src/app/components/ui/button.tsx`

**Features:**
- 5 states: default, hover, active, loading, disabled
- Loading state with spinner
- Proper cursor handling
- Active press animation (scale-[0.98])
- Multiple variants: default, outline, secondary, ghost, destructive

**Usage:**
```tsx
import { Button } from '@/app/components/ui/button';

// Basic usage
<Button>Click Me</Button>

// With loading state
<Button loading loadingText="Uploading...">Upload</Button>

// Disabled
<Button disabled>Disabled</Button>

// Variants
<Button variant="outline">Outline</Button>
<Button variant="destructive">Delete</Button>
```

---

### 2. Loading System

**Location:** `/src/app/components/ui/page-loader.tsx`

**Components:**
- `PageLoader` - Full-page loading overlay
- `SectionLoader` - Skeleton for list sections
- `CardSkeleton` - Skeleton for card layouts
- `TableSkeleton` - Skeleton for tables
- `InlineLoader` - Small spinner for inline use

**Hooks:**
- `useDelayedLoader` - Adds realistic 300-800ms delay
- `useButtonLoader` - For button actions with minimum loading time
- `useProgressiveLoad` - Progressive rendering of items

**Usage:**
```tsx
import { CardSkeleton, useDelayedLoader } from '@/app/components/ui/page-loader';

function MyComponent() {
  const isLoading = useDelayedLoader(true, 500, 1000);
  
  if (isLoading) return <CardSkeleton />;
  
  return <div>Content</div>;
}
```

---

### 3. Enhanced Input & Form Fields

**Location:** `/src/app/components/ui/enhanced-input.tsx` and `/src/app/components/ui/form-field.tsx`

**Features:**
- Focus states with ring animation
- Validation states: error, success, warning, info
- Helper text and error messages
- Required field indicators (*)
- Validation icons
- Accessible (ARIA attributes)

**Usage:**
```tsx
import { EnhancedInput, FormField } from '@/app/components/ui/enhanced-input';

<EnhancedInput
  label="Email"
  placeholder="user@example.com"
  required
  validationState="error"
  errorText="Invalid email format"
/>

<FormField
  name="documentName"
  label="Document Name"
  required
  validationState="success"
  successText="Looks good!"
/>
```

---

### 4. Toast Notifications

**Location:** `/src/app/lib/toast.ts` and `/src/app/components/ui/toast-provider.tsx`

**Features:**
- Success, error, warning, info, loading variants
- Custom styling for DMAS
- Pre-built messages for common actions
- Promise-based toasts for async operations

**Setup:**
Add `<ToastProvider />` to your App.tsx (already done)

**Usage:**
```tsx
import toast from '@/app/lib/toast';

// Basic toasts
toast.success('Success!', 'Document uploaded');
toast.error('Error!', 'Upload failed');
toast.warning('Warning', 'Check your input');
toast.info('Info', 'Helpful message');

// DMAS-specific toasts
toast.documentUploaded('report.pdf');
toast.documentApproved('contract.docx');
toast.settingsSaved();
toast.actionFailed('upload the document');

// Promise toast (auto switches based on result)
toast.promise(
  uploadDocument(),
  {
    loading: 'Uploading...',
    success: 'Document uploaded successfully',
    error: 'Upload failed'
  }
);
```

---

### 5. Alert Banners

**Location:** `/src/app/components/ui/alert-banner.tsx`

**Components:**
- `AlertBanner` - Full alert with title, message, and actions
- `InlineAlert` - Compact version for contextual messages

**Usage:**
```tsx
import { AlertBanner, InlineAlert } from '@/app/components/ui/alert-banner';

<AlertBanner
  variant="warning"
  title="Action Required"
  message="5 documents need your approval"
  action={{ label: 'View Documents', onClick: handleView }}
  onClose={() => setShowBanner(false)}
/>

<InlineAlert variant="info" message="Session expires in 5 minutes" />
```

---

### 6. Empty States

**Location:** `/src/app/components/ui/empty-state.tsx`

**Components:**
- `EmptyState` - Generic empty state with icon, title, description, actions
- `EmptyDocuments` - Pre-built for document lists
- `EmptySearch` - Pre-built for search results
- `EmptyArchive` - Pre-built for archive
- `EmptyNotifications` - Pre-built for notifications
- `ErrorState` - For error scenarios

**Usage:**
```tsx
import { EmptyDocuments, EmptyState } from '@/app/components/ui/empty-state';

// Pre-built
<EmptyDocuments onUpload={() => openUploadModal()} />

// Custom
<EmptyState
  icon={FileText}
  title="No projects found"
  description="Create your first project to get started"
  action={{ label: 'Create Project', onClick: handleCreate }}
/>
```

---

### 7. Animations & Transitions

**Location:** `/src/app/components/ui/animated-container.tsx` and `/src/app/lib/animations.ts`

**Components:**
- `FadeIn` - Fade in animation
- `SlideUp` - Slide from bottom
- `ScaleIn` - Scale in (for modals)
- `SlideFromSide` - Slide from left/right
- `StaggerChildren` / `StaggerItem` - List animations
- `HoverScale` - Hover scale effect
- `PageTransition` - Page change animation
- `ModalBackdrop` - Modal backdrop animation
- `DropdownContent` - Dropdown animation

**Usage:**
```tsx
import { FadeIn, StaggerChildren, StaggerItem } from '@/app/components/ui/animated-container';

<FadeIn delay={0.1}>
  <Card>Content</Card>
</FadeIn>

<StaggerChildren>
  {items.map(item => (
    <StaggerItem key={item.id}>
      <div>{item.name}</div>
    </StaggerItem>
  ))}
</StaggerChildren>
```

---

### 8. Interactive Elements

**Location:** `/src/app/components/ui/interactive-card.tsx`

**Components:**
- `InteractiveCard` - Clickable cards with hover/active states
- `InteractiveListItem` - Clickable list items
- `InteractiveTableRow` - Clickable table rows
- `InteractiveBadge` - Clickable tags/filters
- `InteractiveIconButton` - Icon-only buttons

**Features:**
- Proper hover, active, and focus states
- Selected state support
- Keyboard navigation (Enter/Space)
- Disabled state handling

**Usage:**
```tsx
import { InteractiveCard, InteractiveBadge } from '@/app/components/ui/interactive-card';

<InteractiveCard 
  onClick={() => handleSelect(id)}
  selected={selectedId === id}
>
  <CardContent>...</CardContent>
</InteractiveCard>

<InteractiveBadge
  onClick={() => filterByTag('finance')}
  selected={activeTag === 'finance'}
>
  Finance
</InteractiveBadge>
```

---

### 9. Form Validation

**Location:** `/src/app/lib/validation.ts`, `/src/app/hooks/useFormValidation.ts`, `/src/app/components/ui/validation-message.tsx`

**Features:**
- Comprehensive validation rules
- Real-time validation
- Touch-based validation (validates after blur)
- Form-level validation
- Pre-built rules for UAE-specific formats (Emirates ID, phone numbers)

**Usage:**
```tsx
import { useFormValidation } from '@/app/hooks/useFormValidation';
import { validationRules } from '@/app/lib/validation';

const { fields, handleChange, handleBlur, handleSubmit } = useFormValidation({
  initialValues: {
    email: '',
    password: '',
  },
  validationRules: {
    email: [validationRules.required('Email'), validationRules.email()],
    password: [validationRules.required('Password'), validationRules.strongPassword()],
  },
  onSubmit: async (values) => {
    await submitForm(values);
  },
});

<EnhancedInput
  label="Email"
  value={fields.email.value}
  onChange={handleChange('email')}
  onBlur={handleBlur('email')}
  validationState={fields.email.error ? 'error' : 'none'}
  errorText={fields.email.error}
/>
```

**Available Validation Rules:**
- `required(fieldName)`
- `email()`
- `minLength(min, fieldName)`
- `maxLength(max, fieldName)`
- `phoneNumber()` - UAE format
- `emiratesId()` - Emirates ID format
- `documentNumber()` - DOC-YYYY-XXXXX format
- `strongPassword()`
- `url()`
- `date()`, `futureDate()`, `pastDate()`
- `fileSize(maxSizeMB)`
- `fileType(allowedTypes)`
- And more...

---

## 🎯 Best Practices

### 1. Always Show Loading States
```tsx
// ❌ DON'T: Show content instantly
const data = getData();
return <div>{data}</div>;

// ✅ DO: Add realistic loading delay
const isLoading = useDelayedLoader(true, 500);
if (isLoading) return <CardSkeleton />;
return <div>{data}</div>;
```

### 2. Never Leave Empty Screens Blank
```tsx
// ❌ DON'T: Show nothing
if (documents.length === 0) return null;

// ✅ DO: Show empty state with action
if (documents.length === 0) {
  return <EmptyDocuments onUpload={handleUpload} />;
}
```

### 3. Provide Feedback for All Actions
```tsx
// ❌ DON'T: Silent actions
const handleDelete = async () => {
  await deleteDocument(id);
};

// ✅ DO: Show loading and success/error feedback
const handleDelete = async () => {
  const promise = deleteDocument(id);
  toast.promise(promise, {
    loading: 'Deleting...',
    success: 'Document deleted successfully',
    error: 'Failed to delete document',
  });
};
```

### 4. Validate Forms Properly
```tsx
// ❌ DON'T: No validation or instant validation
<input onChange={e => setEmail(e.target.value)} />

// ✅ DO: Touch-based validation with proper feedback
<EnhancedInput
  label="Email"
  value={fields.email.value}
  onChange={handleChange('email')}
  onBlur={handleBlur('email')}
  validationState={fields.email.error ? 'error' : 'none'}
  errorText={fields.email.error}
/>
```

### 5. Use Animations Sparingly
```tsx
// ❌ DON'T: Excessive or slow animations
<motion.div animate={{ scale: 2 }} transition={{ duration: 2 }}>

// ✅ DO: Subtle, fast animations (150-300ms)
<FadeIn delay={0.1}>
  <Card>Content</Card>
</FadeIn>
```

---

## 🚀 Quick Start

To use these components in your views:

1. **Import the components you need:**
```tsx
import { Button } from '@/app/components/ui/button';
import { CardSkeleton } from '@/app/components/ui/page-loader';
import { EmptyDocuments } from '@/app/components/ui/empty-state';
import toast from '@/app/lib/toast';
```

2. **Add loading states:**
```tsx
const isLoading = useDelayedLoader(true, 500);
if (isLoading) return <CardSkeleton />;
```

3. **Add empty states:**
```tsx
if (items.length === 0) return <EmptyDocuments />;
```

4. **Add toasts for feedback:**
```tsx
onClick={() => {
  toast.success('Action completed');
}}
```

5. **Use enhanced inputs in forms:**
```tsx
<EnhancedInput
  label="Document Name"
  required
  validationState={error ? 'error' : 'success'}
  errorText={error}
/>
```

---

## 📚 View the Showcase

To see all components in action, you can add this to your settings or create a dedicated design system page:

```tsx
import { DesignSystemShowcase } from '@/app/components/design-system/DesignSystemShowcase';

// In your view
<DesignSystemShowcase />
```

This will show interactive examples of all components with different states and configurations.

---

## 🎨 Design Principles

1. **Never Show Instant Content** - Always add 300-800ms loading delay
2. **Always Provide Feedback** - Toast notifications for all actions
3. **Never Leave Screens Empty** - Use empty states with helpful context
4. **Animate Subtly** - 150-300ms transitions, ease-out curves
5. **Validate Intelligently** - Touch-based validation, clear error messages
6. **Make Everything Clickable React** - Hover, active, focus states everywhere

---

## 🔧 Customization

All components use Tailwind CSS and can be customized via:
- Class name overrides
- Theme CSS variables in `/src/styles/theme.css`
- Component props (variant, size, etc.)

Example:
```tsx
<Button 
  className="bg-blue-900 hover:bg-blue-800"
  size="lg"
>
  Custom Button
</Button>
```
