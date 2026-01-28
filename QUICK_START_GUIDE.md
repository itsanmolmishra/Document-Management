# Quick Start Guide: Applying Design System to Existing Components

This guide shows you exactly how to upgrade your existing DMAS components with the new design system.

---

## 🔄 Before & After Examples

### Example 1: Adding Loading States to a Component

#### ❌ BEFORE (DocumentRepo.tsx)
```tsx
import React from 'react';
import { Card } from '../ui/card';

export const DocumentRepo = () => {
  const documents = getDocuments(); // Instant
  
  return (
    <div>
      {documents.map(doc => (
        <Card key={doc.id}>{doc.name}</Card>
      ))}
    </div>
  );
};
```

#### ✅ AFTER (With Loading States)
```tsx
import React from 'react';
import { Card } from '../ui/card';
import { CardSkeleton } from '../ui/page-loader';
import { useDelayedLoader } from '@/app/hooks/useDelayedLoader';
import { FadeIn, StaggerChildren, StaggerItem } from '../ui/animated-container';

export const DocumentRepo = () => {
  const documents = getDocuments();
  
  // Add realistic loading delay
  const isLoading = useDelayedLoader(true, 500, 800);
  
  // Show skeleton while loading
  if (isLoading) {
    return (
      <div className="space-y-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }
  
  // Animate content when it appears
  return (
    <FadeIn>
      <StaggerChildren className="space-y-4">
        {documents.map(doc => (
          <StaggerItem key={doc.id}>
            <Card>{doc.name}</Card>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </FadeIn>
  );
};
```

**Changes made:**
1. ✅ Added `useDelayedLoader` for realistic timing
2. ✅ Show `CardSkeleton` while loading
3. ✅ Wrapped content in `FadeIn` animation
4. ✅ Used `StaggerChildren`/`StaggerItem` for list animation

---

### Example 2: Adding Empty States

#### ❌ BEFORE
```tsx
export const DocumentRepo = () => {
  const documents = getDocuments();
  
  if (documents.length === 0) {
    return <div>No documents</div>; // Unhelpful
  }
  
  return <div>{/* documents */}</div>;
};
```

#### ✅ AFTER
```tsx
import { EmptyDocuments } from '../ui/empty-state';

export const DocumentRepo = () => {
  const documents = getDocuments();
  
  if (documents.length === 0) {
    return <EmptyDocuments onUpload={() => openUploadModal()} />;
  }
  
  return <div>{/* documents */}</div>;
};
```

**Changes made:**
1. ✅ Replaced plain text with `EmptyDocuments` component
2. ✅ Added action button to help user

---

### Example 3: Upgrading Buttons with Loading States

#### ❌ BEFORE
```tsx
const handleUpload = async () => {
  await uploadDocument();
};

return <Button onClick={handleUpload}>Upload</Button>;
```

#### ✅ AFTER
```tsx
import { useButtonLoader } from '@/app/hooks/useDelayedLoader';
import toast from '@/app/lib/toast';

const { isLoading, withLoading } = useButtonLoader();

const handleUpload = async () => {
  await withLoading(async () => {
    await uploadDocument();
    toast.documentUploaded('MyFile.pdf');
  }, 1500); // Minimum 1.5s loading
};

return (
  <Button 
    loading={isLoading} 
    loadingText="Uploading..."
    onClick={handleUpload}
  >
    Upload
  </Button>
);
```

**Changes made:**
1. ✅ Added `useButtonLoader` hook
2. ✅ Wrapped action in `withLoading`
3. ✅ Added loading props to Button
4. ✅ Added toast notification for feedback

---

### Example 4: Converting Cards to Interactive

#### ❌ BEFORE
```tsx
const documents = [...];

return (
  <div className="grid grid-cols-3 gap-4">
    {documents.map(doc => (
      <Card key={doc.id} onClick={() => selectDoc(doc.id)}>
        <CardContent>{doc.name}</CardContent>
      </Card>
    ))}
  </div>
);
```

#### ✅ AFTER
```tsx
import { InteractiveCard } from '../ui/interactive-card';

const [selectedId, setSelectedId] = useState<string | null>(null);
const documents = [...];

return (
  <div className="grid grid-cols-3 gap-4">
    {documents.map(doc => (
      <InteractiveCard 
        key={doc.id}
        onClick={() => setSelectedId(doc.id)}
        selected={selectedId === doc.id}
      >
        <CardContent>{doc.name}</CardContent>
      </InteractiveCard>
    ))}
  </div>
);
```

**Changes made:**
1. ✅ Replaced `Card` with `InteractiveCard`
2. ✅ Added selected state tracking
3. ✅ Automatic hover/active/focus states

---

### Example 5: Enhancing Forms with Validation

#### ❌ BEFORE
```tsx
const [email, setEmail] = useState('');
const [error, setError] = useState('');

const handleSubmit = () => {
  if (!email) {
    setError('Email required');
    return;
  }
  submitForm({ email });
};

return (
  <form onSubmit={handleSubmit}>
    <Input 
      value={email}
      onChange={e => setEmail(e.target.value)}
    />
    {error && <span className="text-red-500">{error}</span>}
    <Button type="submit">Submit</Button>
  </form>
);
```

#### ✅ AFTER
```tsx
import { EnhancedInput } from '../ui/enhanced-input';
import { useFormValidation } from '@/app/hooks/useFormValidation';
import { validationRules } from '@/app/lib/validation';
import toast from '@/app/lib/toast';

const { fields, handleChange, handleBlur, handleSubmit, isSubmitting } = useFormValidation({
  initialValues: { email: '' },
  validationRules: {
    email: [
      validationRules.required('Email'),
      validationRules.email()
    ]
  },
  onSubmit: async (values) => {
    await submitForm(values);
    toast.success('Form Submitted', 'Your data has been saved.');
  }
});

return (
  <form onSubmit={handleSubmit}>
    <EnhancedInput
      label="Email Address"
      required
      value={fields.email.value}
      onChange={handleChange('email')}
      onBlur={handleBlur('email')}
      validationState={fields.email.error ? 'error' : fields.email.touched ? 'success' : 'none'}
      errorText={fields.email.error || undefined}
      successText={fields.email.touched && !fields.email.error ? 'Valid email' : undefined}
    />
    <Button type="submit" loading={isSubmitting} loadingText="Submitting...">
      Submit
    </Button>
  </form>
);
```

**Changes made:**
1. ✅ Replaced manual validation with `useFormValidation` hook
2. ✅ Used `EnhancedInput` with validation states
3. ✅ Added touch-based validation (validates after blur)
4. ✅ Added loading state to button
5. ✅ Added toast notification on success

---

### Example 6: Adding Toast Notifications to Actions

#### ❌ BEFORE
```tsx
const handleDelete = async (id: string) => {
  await deleteDocument(id);
  // User has no idea if it worked
};

const handleApprove = async (id: string) => {
  await approveDocument(id);
  // Silent success
};
```

#### ✅ AFTER
```tsx
import toast from '@/app/lib/toast';

const handleDelete = async (id: string, name: string) => {
  const promise = deleteDocument(id);
  
  toast.promise(promise, {
    loading: 'Deleting document...',
    success: `${name} deleted successfully`,
    error: 'Failed to delete document. Please try again.',
  });
  
  await promise;
};

const handleApprove = async (id: string, name: string) => {
  try {
    await approveDocument(id);
    toast.documentApproved(name);
  } catch (error) {
    toast.actionFailed('approve the document');
  }
};
```

**Changes made:**
1. ✅ Added toast.promise for delete (shows loading → success/error)
2. ✅ Used pre-built DMAS toast for approval
3. ✅ Added error handling with feedback

---

### Example 7: Adding Alert Banners

#### ❌ BEFORE
```tsx
export const Dashboard = () => {
  // No way to show important system messages
  
  return <div>{/* content */}</div>;
};
```

#### ✅ AFTER
```tsx
import { AlertBanner } from '../ui/alert-banner';
import { useState } from 'react';

export const Dashboard = () => {
  const [showBanner, setShowBanner] = useState(true);
  
  return (
    <div className="space-y-6">
      {showBanner && (
        <AlertBanner
          variant="warning"
          title="Maintenance Notice"
          message="Scheduled maintenance on Saturday 10:00 PM - 11:00 PM"
          onClose={() => setShowBanner(false)}
          action={{
            label: 'Learn More',
            onClick: () => window.open('/maintenance-info')
          }}
        />
      )}
      {/* content */}
    </div>
  );
};
```

**Changes made:**
1. ✅ Added dismissible alert banner
2. ✅ Included action button for more info
3. ✅ Proper warning styling

---

## 📋 Component Migration Checklist

Use this checklist when upgrading any component:

### Loading & Animation
- [ ] Add `useDelayedLoader` for realistic loading (500-800ms)
- [ ] Show skeleton loaders (`CardSkeleton`, `TableSkeleton`, etc.)
- [ ] Wrap content in `FadeIn` animation
- [ ] Use `StaggerChildren`/`StaggerItem` for lists

### Empty States
- [ ] Replace empty divs with proper `EmptyState` components
- [ ] Add helpful descriptions
- [ ] Include action buttons when applicable

### Buttons
- [ ] Add loading states to action buttons
- [ ] Use `useButtonLoader` for async operations
- [ ] Add minimum loading time (1-2 seconds)
- [ ] Include loading text

### Forms
- [ ] Replace `Input` with `EnhancedInput`
- [ ] Use `useFormValidation` hook
- [ ] Add validation rules from `validationRules`
- [ ] Show validation states (error/success)
- [ ] Include helper text
- [ ] Mark required fields with *

### Feedback
- [ ] Add toast notifications for all actions
- [ ] Use `toast.promise` for async operations
- [ ] Add alert banners for important messages
- [ ] Provide clear success/error messages

### Interactive Elements
- [ ] Convert cards to `InteractiveCard`
- [ ] Convert list items to `InteractiveListItem`
- [ ] Convert table rows to `InteractiveTableRow`
- [ ] Add selected state tracking
- [ ] Ensure proper hover/active/focus states

---

## 🎯 Priority Order

When upgrading components, follow this order:

1. **High Priority** (Do First)
   - Add loading states (biggest impact on perceived quality)
   - Add toast notifications (essential feedback)
   - Add empty states (never show blank screens)

2. **Medium Priority**
   - Enhance forms with validation
   - Convert to interactive elements
   - Add animations

3. **Low Priority** (Nice to Have)
   - Add alert banners
   - Fine-tune animation timings
   - Add advanced validation rules

---

## 💡 Quick Tips

### Tip 1: Copy from Examples
The easiest way to upgrade is to copy patterns from:
- `/src/app/components/examples/EnhancedDashboardExample.tsx`
- `/src/app/components/design-system/DesignSystemShowcase.tsx`

### Tip 2: Start Small
Pick one component, upgrade it fully, then move to the next.

### Tip 3: Test Interactions
After upgrading:
- Click everything to test hover/active states
- Tab through to test focus states
- Try form validation
- Trigger loading states

### Tip 4: Use Pre-built Toasts
Instead of creating custom toasts, use the pre-built ones:
```tsx
toast.documentUploaded('file.pdf');
toast.documentApproved('file.pdf');
toast.settingsSaved();
toast.actionFailed('upload the document');
```

---

## 🚀 You're Ready!

You now have:
- ✅ Complete component library
- ✅ Before/after examples
- ✅ Migration checklist
- ✅ Practical examples to copy from

Start upgrading your components one at a time, and your DMAS will feel like a professional, enterprise-grade application! 🎉
