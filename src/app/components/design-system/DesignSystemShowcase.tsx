import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { EnhancedInput } from '../ui/enhanced-input';
import { FormField, TextareaField } from '../ui/form-field';
import { 
  PageLoader, 
  SectionLoader, 
  CardSkeleton, 
  TableSkeleton, 
  InlineLoader 
} from '../ui/page-loader';
import { useDelayedLoader, useButtonLoader } from '@/app/hooks/useDelayedLoader';
import toast from '@/app/lib/toast';
import { AlertBanner, InlineAlert } from '../ui/alert-banner';
import { 
  EmptyState, 
  EmptyDocuments, 
  EmptySearch, 
  EmptyNotifications,
  ErrorState 
} from '../ui/empty-state';
import { 
  InteractiveCard, 
  InteractiveListItem, 
  InteractiveBadge,
  InteractiveIconButton 
} from '../ui/interactive-card';
import { 
  FadeIn, 
  SlideUp, 
  ScaleIn, 
  StaggerChildren, 
  StaggerItem,
  HoverScale 
} from '../ui/animated-container';
import { ValidationMessage, FieldError, FormErrorSummary } from '../ui/validation-message';
import { useFormValidation } from '@/app/hooks/useFormValidation';
import { validationRules } from '@/app/lib/validation';
import { 
  FileText, 
  Upload, 
  Download, 
  Trash2, 
  Search, 
  Heart,
  Star,
  Share2,
  Settings as SettingsIcon
} from 'lucide-react';

/**
 * Design System Showcase
 * Demonstrates all the new production-grade components and features
 */
export const DesignSystemShowcase: React.FC = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('buttons');
  
  const { isLoading: buttonLoading, withLoading } = useButtonLoader();
  const isPageLoading = useDelayedLoader(false, 500, 1000);

  // Form example
  const { fields, handleChange, handleBlur, handleSubmit, isSubmitting } = useFormValidation({
    initialValues: {
      documentName: '',
      email: '',
      description: '',
    },
    validationRules: {
      documentName: [
        validationRules.required('Document Name'),
        validationRules.minLength(3, 'Document Name'),
      ],
      email: [
        validationRules.required('Email'),
        validationRules.email(),
      ],
      description: [
        validationRules.maxLength(500, 'Description'),
      ],
    },
    onSubmit: async (values) => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Form Submitted', 'Your data has been saved successfully.');
      console.log('Form values:', values);
    },
  });

  const handleButtonAction = async () => {
    await withLoading(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.documentUploaded('Annual Report 2024.pdf');
    });
  };

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900">Design System Showcase</h1>
        <p className="text-slate-600">
          Production-grade components with loading states, animations, validation, and more.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-4">
        {['buttons', 'forms', 'loading', 'empty', 'interactive', 'toasts', 'animations'].map((tab) => (
          <InteractiveBadge
            key={tab}
            onClick={() => setActiveTab(tab)}
            selected={activeTab === tab}
            variant="outline"
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </InteractiveBadge>
        ))}
      </div>

      {/* Button States */}
      {activeTab === 'buttons' && (
        <FadeIn>
          <Card>
            <CardHeader>
              <CardTitle>Button States</CardTitle>
              <CardDescription>
                All buttons have 5 states: default, hover, active, loading, and disabled
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-slate-700">Button Variants</h4>
                <div className="flex flex-wrap gap-3">
                  <Button>Default Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="destructive">Destructive Button</Button>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-slate-700">Loading States</h4>
                <div className="flex flex-wrap gap-3">
                  <Button loading loadingText="Uploading...">Upload Document</Button>
                  <Button loading={buttonLoading} onClick={handleButtonAction}>
                    Click Me (2s delay)
                  </Button>
                  <Button variant="outline" loading>Processing</Button>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-slate-700">Disabled States</h4>
                <div className="flex flex-wrap gap-3">
                  <Button disabled>Disabled Button</Button>
                  <Button variant="outline" disabled>Disabled Outline</Button>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-slate-700">With Icons</h4>
                <div className="flex flex-wrap gap-3">
                  <Button><Upload className="h-4 w-4" /> Upload</Button>
                  <Button variant="outline"><Download className="h-4 w-4" /> Download</Button>
                  <Button variant="destructive"><Trash2 className="h-4 w-4" /> Delete</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      )}

      {/* Form Validation */}
      {activeTab === 'forms' && (
        <FadeIn>
          <Card>
            <CardHeader>
              <CardTitle>Form Validation</CardTitle>
              <CardDescription>
                Real-time validation with error, success, and warning states
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <EnhancedInput
                  label="Document Name"
                  placeholder="Enter document name"
                  required
                  value={fields.documentName.value}
                  onChange={handleChange('documentName')}
                  onBlur={handleBlur('documentName')}
                  validationState={fields.documentName.error ? 'error' : fields.documentName.touched && !fields.documentName.error ? 'success' : 'none'}
                  errorText={fields.documentName.error || undefined}
                  successText={fields.documentName.touched && !fields.documentName.error ? 'Looks good!' : undefined}
                />

                <EnhancedInput
                  label="Email Address"
                  type="email"
                  placeholder="user@example.com"
                  required
                  value={fields.email.value}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  validationState={fields.email.error ? 'error' : fields.email.touched && !fields.email.error ? 'success' : 'none'}
                  errorText={fields.email.error || undefined}
                  successText={fields.email.touched && !fields.email.error ? 'Valid email format' : undefined}
                  helperText="We'll never share your email with anyone else."
                />

                <TextareaField
                  label="Description"
                  placeholder="Enter a description..."
                  value={fields.description.value}
                  onChange={handleChange('description')}
                  onBlur={handleBlur('description')}
                  validationState={fields.description.error ? 'error' : 'none'}
                  errorText={fields.description.error || undefined}
                  helperText={`${fields.description.value.length}/500 characters`}
                />

                <div className="flex gap-3">
                  <Button type="submit" loading={isSubmitting} loadingText="Submitting...">
                    Submit Form
                  </Button>
                  <Button type="button" variant="outline" onClick={() => window.location.reload()}>
                    Reset
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </FadeIn>
      )}

      {/* Loading States */}
      {activeTab === 'loading' && (
        <FadeIn>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Loading States</CardTitle>
                <CardDescription>
                  Skeleton loaders and spinners for better UX
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm text-slate-700">Card Skeleton</h4>
                    <Button size="sm" variant="outline" onClick={() => setShowSkeleton(!showSkeleton)}>
                      {showSkeleton ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                  {showSkeleton && <CardSkeleton />}
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-slate-700">Section Loader</h4>
                  <SectionLoader rows={3} />
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-slate-700">Table Skeleton</h4>
                  <TableSkeleton rows={4} columns={3} />
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-slate-700">Inline Loader</h4>
                  <div className="flex items-center gap-3">
                    <InlineLoader size="sm" />
                    <InlineLoader size="md" />
                    <InlineLoader size="lg" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </FadeIn>
      )}

      {/* Empty States */}
      {activeTab === 'empty' && (
        <FadeIn>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Empty States</CardTitle>
                <CardDescription>
                  Never show blank screens - always provide context and actions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <EmptyDocuments onUpload={() => toast.info('Upload Modal', 'This would open the upload dialog')} />
                <EmptySearch />
                <EmptyNotifications />
                <ErrorState onRetry={() => toast.info('Retrying...', 'This would retry the action')} />
              </CardContent>
            </Card>
          </div>
        </FadeIn>
      )}

      {/* Interactive Elements */}
      {activeTab === 'interactive' && (
        <FadeIn>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Interactive Elements</CardTitle>
                <CardDescription>
                  All clickable elements with hover, active, and focus states
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-slate-700">Interactive Cards</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <InteractiveCard
                        key={i}
                        onClick={() => setSelectedCard(i)}
                        selected={selectedCard === i}
                      >
                        <CardContent className="p-4">
                          <FileText className="h-8 w-8 text-blue-600 mb-2" />
                          <h5 className="font-semibold">Card {i}</h5>
                          <p className="text-sm text-slate-500">Click to select</p>
                        </CardContent>
                      </InteractiveCard>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-slate-700">Interactive List Items</h4>
                  <div className="space-y-2">
                    {['Item 1', 'Item 2', 'Item 3'].map((item) => (
                      <InteractiveListItem key={item} onClick={() => toast.info('Item Clicked', item)}>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item}</span>
                          <span className="text-sm text-slate-500">Click me</span>
                        </div>
                      </InteractiveListItem>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-slate-700">Interactive Badges</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Finance', 'HR', 'IT', 'Legal'].map((tag) => (
                      <InteractiveBadge key={tag} onClick={() => toast.info('Tag Clicked', tag)}>
                        {tag}
                      </InteractiveBadge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-slate-700">Interactive Icon Buttons</h4>
                  <div className="flex gap-2">
                    <InteractiveIconButton onClick={() => toast.info('Liked!')} title="Like">
                      <Heart className="h-4 w-4" />
                    </InteractiveIconButton>
                    <InteractiveIconButton onClick={() => toast.info('Starred!')} title="Star" variant="outline">
                      <Star className="h-4 w-4" />
                    </InteractiveIconButton>
                    <InteractiveIconButton onClick={() => toast.info('Shared!')} title="Share" variant="solid">
                      <Share2 className="h-4 w-4" />
                    </InteractiveIconButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </FadeIn>
      )}

      {/* Toast Notifications */}
      {activeTab === 'toasts' && (
        <FadeIn>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Toast Notifications</CardTitle>
                <CardDescription>
                  Consistent feedback messages for all user actions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Button onClick={() => toast.success('Success!', 'Your action completed successfully.')}>
                    Show Success Toast
                  </Button>
                  <Button variant="destructive" onClick={() => toast.error('Error!', 'Something went wrong. Please try again.')}>
                    Show Error Toast
                  </Button>
                  <Button variant="outline" onClick={() => toast.warning('Warning!', 'Please review your input before proceeding.')}>
                    Show Warning Toast
                  </Button>
                  <Button variant="secondary" onClick={() => toast.info('Info', 'Here is some helpful information.')}>
                    Show Info Toast
                  </Button>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-slate-700">DMAS-Specific Toasts</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Button size="sm" onClick={() => toast.documentUploaded('Report.pdf')}>
                      Document Uploaded
                    </Button>
                    <Button size="sm" onClick={() => toast.documentApproved('Contract.docx')}>
                      Document Approved
                    </Button>
                    <Button size="sm" onClick={() => toast.settingsSaved()}>
                      Settings Saved
                    </Button>
                    <Button size="sm" onClick={() => toast.actionFailed('upload the document')}>
                      Action Failed
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-slate-700">Alert Banners</h4>
                  <AlertBanner
                    variant="info"
                    title="System Maintenance"
                    message="Scheduled maintenance will occur on Saturday at 10:00 PM."
                  />
                  <AlertBanner
                    variant="warning"
                    title="Action Required"
                    message="5 documents require your approval."
                    action={{ label: 'View Documents', onClick: () => toast.info('Navigating...') }}
                  />
                  <InlineAlert variant="error" message="Your session will expire in 5 minutes." />
                </div>
              </CardContent>
            </Card>
          </div>
        </FadeIn>
      )}

      {/* Animations */}
      {activeTab === 'animations' && (
        <FadeIn>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Animations & Transitions</CardTitle>
                <CardDescription>
                  Subtle motion that makes the app feel polished (150-300ms transitions)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-slate-700">Staggered List Animation</h4>
                  <StaggerChildren>
                    {[1, 2, 3, 4].map((i) => (
                      <StaggerItem key={i}>
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          Item {i} - Animates in sequence
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerChildren>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-slate-700">Hover Scale Effect</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <HoverScale key={i}>
                        <Card className="cursor-pointer">
                          <CardContent className="p-6 text-center">
                            <FileText className="h-10 w-10 mx-auto mb-2 text-blue-600" />
                            <p className="font-medium">Hover me!</p>
                          </CardContent>
                        </Card>
                      </HoverScale>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </FadeIn>
      )}
    </div>
  );
};
