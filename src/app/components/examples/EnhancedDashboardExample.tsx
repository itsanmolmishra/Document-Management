import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { EnhancedInput } from '../ui/enhanced-input';
import { CardSkeleton } from '../ui/page-loader';
import { useDelayedLoader, useButtonLoader } from '@/app/hooks/useDelayedLoader';
import { InteractiveCard, InteractiveListItem } from '../ui/interactive-card';
import { FadeIn, StaggerChildren, StaggerItem } from '../ui/animated-container';
import toast from '@/app/lib/toast';
import { EmptyDocuments } from '../ui/empty-state';
import { AlertBanner } from '../ui/alert-banner';
import { FileText, Upload, Download, Search, Trash2 } from 'lucide-react';

/**
 * Enhanced Dashboard Example
 * Demonstrates how to apply the design system improvements to a real component
 * 
 * Key Improvements:
 * 1. Loading states with realistic delays
 * 2. Interactive elements with proper hover/active states
 * 3. Smooth animations for content appearance
 * 4. Toast notifications for actions
 * 5. Empty states when no data
 * 6. Alert banners for important messages
 * 7. Enhanced form inputs with validation
 */

interface Document {
  id: string;
  name: string;
  size: string;
  updatedAt: string;
  status: 'draft' | 'approved' | 'pending';
}

const mockDocuments: Document[] = [
  { id: '1', name: 'Budget Report Q1 2025.pdf', size: '2.4 MB', updatedAt: '2 hours ago', status: 'approved' },
  { id: '2', name: 'Contract Agreement.docx', size: '1.1 MB', updatedAt: '5 hours ago', status: 'pending' },
  { id: '3', name: 'Financial Summary.xlsx', size: '3.8 MB', updatedAt: '1 day ago', status: 'draft' },
];

export const EnhancedDashboardExample: React.FC = () => {
  // Loading state with realistic delay (500-800ms)
  const isLoading = useDelayedLoader(true, 500, 800);
  
  // Button loading state
  const { isLoading: isUploading, withLoading } = useButtonLoader();
  
  // Component state
  const [documents] = useState<Document[]>(mockDocuments);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBanner, setShowBanner] = useState(true);

  // Handle document upload with loading and feedback
  const handleUpload = async () => {
    await withLoading(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.documentUploaded('New Document.pdf');
    }, 1500); // Minimum 1.5s loading time
  };

  // Handle document download with feedback
  const handleDownload = (docName: string) => {
    toast.loading('Preparing download...', 'Please wait while we prepare your file.');
    
    setTimeout(() => {
      toast.success('Download Started', `${docName} is being downloaded.`);
    }, 1500);
  };

  // Handle document delete with confirmation
  const handleDelete = (docName: string) => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success/failure
        Math.random() > 0.2 ? resolve(docName) : reject(new Error('Failed'));
      }, 1500);
    });

    toast.promise(promise, {
      loading: 'Deleting document...',
      success: `${docName} deleted successfully`,
      error: 'Failed to delete document. Please try again.',
    });
  };

  // Show loading skeleton while data loads
  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-96 bg-slate-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-3 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  // Show empty state if no documents
  if (documents.length === 0) {
    return (
      <div className="p-6">
        <EmptyDocuments onUpload={handleUpload} />
      </div>
    );
  }

  return (
    <FadeIn className="space-y-6 p-6">
      {/* Alert Banner */}
      {showBanner && (
        <FadeIn>
          <AlertBanner
            variant="info"
            title="System Maintenance Notice"
            message="Scheduled maintenance will occur on Saturday, 10:00 PM - 11:00 PM. Access may be intermittent during this time."
            onClose={() => setShowBanner(false)}
          />
        </FadeIn>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Documents</h1>
          <p className="text-slate-500 mt-1">Manage and organize your documents</p>
        </div>
        <Button 
          loading={isUploading} 
          loadingText="Uploading..."
          onClick={handleUpload}
        >
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {/* Search Input with Enhanced Styling */}
      <Card>
        <CardContent className="p-4">
          <EnhancedInput
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            helperText="Search by name, type, or content"
            containerClassName="mb-0"
          />
        </CardContent>
      </Card>

      {/* Stats Cards with Hover Effect */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StaggerChildren>
          <StaggerItem>
            <InteractiveCard onClick={() => toast.info('Total Documents', 'View all your documents')}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Total Documents</p>
                    <h3 className="text-3xl font-bold text-slate-900 mt-1">128</h3>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </InteractiveCard>
          </StaggerItem>

          <StaggerItem>
            <InteractiveCard onClick={() => toast.info('Pending Approval', '3 documents need your attention')}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Pending</p>
                    <h3 className="text-3xl font-bold text-slate-900 mt-1">3</h3>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <FileText className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </InteractiveCard>
          </StaggerItem>

          <StaggerItem>
            <InteractiveCard onClick={() => toast.info('Storage', 'View storage details')}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Storage</p>
                    <h3 className="text-3xl font-bold text-slate-900 mt-1">1.2 GB</h3>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </InteractiveCard>
          </StaggerItem>
        </StaggerChildren>
      </div>

      {/* Document List with Interactive Items */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
          <CardDescription>Your recently accessed files</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <StaggerChildren staggerDelay={0.05} className="divide-y divide-slate-200">
            {documents.map((doc) => (
              <StaggerItem key={doc.id}>
                <InteractiveListItem
                  onClick={() => setSelectedDoc(doc.id)}
                  selected={selectedDoc === doc.id}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-slate-900">{doc.name}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>{doc.updatedAt}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(doc.name);
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(doc.name);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </InteractiveListItem>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="h-auto py-4"
            onClick={() => toast.info('Search', 'Opening advanced search...')}
          >
            <Search className="h-4 w-4" />
            Advanced Search
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-4"
            onClick={() => toast.info('Archive', 'Opening archive view...')}
          >
            <FileText className="h-4 w-4" />
            View Archive
          </Button>
        </CardContent>
      </Card>
    </FadeIn>
  );
};
