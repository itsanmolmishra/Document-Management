import React, { useState } from 'react';
import { 
    Sheet, 
    SheetContent, 
    SheetHeader, 
    SheetTitle, 
    SheetDescription,
    SheetFooter
} from '../ui/sheet';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { 
    FileText, 
    Shield, 
    History, 
    Clock, 
    User, 
    Tag, 
    Lock,
    Eye,
    Download,
    Share2,
    Trash2,
    FileCheck,
    Unlock,
    GitCompare
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { CheckInOutModal } from './CheckInOutModal';
import { ShareModal } from './ShareModal';
import { VersionComparison } from './VersionComparison';

interface DocumentDetailsProps {
    document: any;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const DocumentDetails = ({ document, open, onOpenChange }: DocumentDetailsProps) => {
    const [checkInOutOpen, setCheckInOutOpen] = useState(false);
    const [checkInOutMode, setCheckInOutMode] = useState<'checkout' | 'checkin'>('checkout');
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [versionComparisonOpen, setVersionComparisonOpen] = useState(false);
    
    if (!document) return null;

    const handleCheckOut = () => {
        setCheckInOutMode('checkout');
        setCheckInOutOpen(true);
    };

    const handleCheckIn = () => {
        setCheckInOutMode('checkin');
        setCheckInOutOpen(true);
    };

    const handleShare = () => {
        setShareModalOpen(true);
    };

    const handleCompareVersions = () => {
        setVersionComparisonOpen(true);
    };

    return (
        <>
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-[400px] sm:w-[540px] flex flex-col p-0">
                <SheetHeader className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-start gap-4">
                        <div className="h-12 w-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm">
                            <FileText className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                            <Badge variant="outline" className="mb-2 bg-white">{document.classification}</Badge>
                            <SheetTitle className="text-xl font-bold text-slate-900 leading-tight mb-1">{document.name}</SheetTitle>
                            <SheetDescription className="flex items-center gap-2">
                                <span className="font-mono text-xs text-slate-500">REF-{1000 + document.id}</span>
                                <span>•</span>
                                <span>v2.4 (Latest)</span>
                            </SheetDescription>
                        </div>
                    </div>
                </SheetHeader>

                <Tabs defaultValue="metadata" className="flex-1 flex flex-col overflow-hidden">
                    <div className="px-6 pt-4 border-b border-slate-100">
                        <TabsList className="bg-slate-100">
                            <TabsTrigger value="metadata">Metadata</TabsTrigger>
                            <TabsTrigger value="history">History</TabsTrigger>
                            <TabsTrigger value="security">Security</TabsTrigger>
                            <TabsTrigger value="retention">Retention</TabsTrigger>
                        </TabsList>
                    </div>

                    <ScrollArea className="flex-1">
                        <div className="p-6">
                            <TabsContent value="metadata" className="mt-0 space-y-6">
                                <section className="space-y-3">
                                    <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                                        <Tag className="h-4 w-4 text-slate-500" />
                                        General Information
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-slate-500 mb-1">Document Type</p>
                                            <p className="font-medium text-slate-900">{document.type || 'PDF Document'}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 mb-1">File Size</p>
                                            <p className="font-medium text-slate-900">2.4 MB</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 mb-1">Created Date</p>
                                            <p className="font-medium text-slate-900">{document.date}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 mb-1">Last Modified</p>
                                            <p className="font-medium text-slate-900">Today, 10:42 AM</p>
                                        </div>
                                    </div>
                                </section>

                                <div className="h-px bg-slate-100" />

                                <section className="space-y-3">
                                    <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                                        <User className="h-4 w-4 text-slate-500" />
                                        Ownership
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-slate-500 mb-1">Owner</p>
                                            <div className="flex items-center gap-2">
                                                <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                                                    {document.owner.charAt(0)}
                                                </div>
                                                <p className="font-medium text-slate-900">{document.owner}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 mb-1">Department</p>
                                            <p className="font-medium text-slate-900">Finance Dept.</p>
                                        </div>
                                    </div>
                                </section>

                                <div className="h-px bg-slate-100" />

                                <section className="space-y-3">
                                    <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                                        <FileCheck className="h-4 w-4 text-slate-500" />
                                        Approval Status
                                    </h3>
                                    <div className="p-3 bg-green-50 rounded-lg border border-green-100 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-semibold text-green-800">Fully Approved</p>
                                            <p className="text-xs text-green-600">Signed by H.E. Director General</p>
                                        </div>
                                        <Badge className="bg-green-600 hover:bg-green-700">Signed</Badge>
                                    </div>
                                </section>
                            </TabsContent>

                            <TabsContent value="history" className="mt-0 space-y-4">
                                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-slate-200">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="relative">
                                            <div className="absolute -left-6 top-1 h-4 w-4 rounded-full bg-white border-2 border-blue-500 z-10" />
                                            <div className="space-y-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-bold text-slate-900">Version 2.{4-i}</p>
                                                    <span className="text-xs text-slate-400">Jan {20-i}, 2025</span>
                                                </div>
                                                <p className="text-sm text-slate-600">Updated financial projections based on Q4 data.</p>
                                                <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                                                    <span className="font-medium text-blue-600">Ahmed R.</span>
                                                    <span>•</span>
                                                    <span>Edited</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="security" className="mt-0 space-y-6">
                                <div className="p-4 bg-slate-900 text-white rounded-lg">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Shield className="h-6 w-6 text-green-400" />
                                        <div>
                                            <p className="font-bold">Encryption Active</p>
                                            <p className="text-xs text-slate-300">AES-256 at Rest & TLS 1.3 in Transit</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-xs text-slate-300 border-t border-slate-700 pt-3">
                                        <div className="flex justify-between">
                                            <span>Encryption Key ID:</span>
                                            <span className="font-mono">K-9923-XF</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Last Security Scan:</span>
                                            <span>Passed (2h ago)</span>
                                        </div>
                                    </div>
                                </div>

                                <section className="space-y-3">
                                    <h3 className="text-sm font-semibold text-slate-900">Access Control List (ACL)</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                                            <div className="flex items-center gap-2">
                                                <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-700">FM</div>
                                                <span className="text-sm font-medium">Finance Managers</span>
                                            </div>
                                            <Badge variant="outline">Full Control</Badge>
                                        </div>
                                        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                                            <div className="flex items-center gap-2">
                                                <div className="h-6 w-6 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-700">AU</div>
                                                <span className="text-sm font-medium">Auditors</span>
                                            </div>
                                            <Badge variant="outline">Read Only</Badge>
                                        </div>
                                    </div>
                                </section>
                            </TabsContent>

                            <TabsContent value="retention" className="mt-0 space-y-6">
                                <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                                    <h3 className="font-bold text-amber-900 flex items-center gap-2 mb-2">
                                        <Clock className="h-4 w-4" />
                                        Retention Policy: 10 Years
                                    </h3>
                                    <p className="text-sm text-amber-800/80 mb-4">
                                        This document is classified as "Financial Record" and must be retained until 2035.
                                    </p>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between text-amber-900">
                                            <span>Expiry Date:</span>
                                            <span className="font-bold">Dec 31, 2035</span>
                                        </div>
                                        <div className="flex justify-between text-amber-900">
                                            <span>Disposal Action:</span>
                                            <span className="font-bold">Secure Shredding</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                                    <h4 className="font-semibold text-sm mb-2">Legal Hold Status</h4>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-green-500" />
                                        <span className="text-sm text-slate-600">No active legal holds</span>
                                    </div>
                                </div>
                            </TabsContent>
                        </div>
                    </ScrollArea>
                </Tabs>

                <SheetFooter className="p-6 border-t border-slate-100 bg-slate-50/50 sm:justify-between">
                    <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Dispose
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleShare}>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                        </Button>
                        <Button className="bg-blue-900 hover:bg-blue-800">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                        </Button>
                        <Button variant="outline" onClick={handleCompareVersions}>
                            <GitCompare className="h-4 w-4 mr-2" />
                            Compare Versions
                        </Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
        <CheckInOutModal open={checkInOutOpen} onOpenChange={setCheckInOutOpen} mode={checkInOutMode} document={document} />
        <ShareModal open={shareModalOpen} onOpenChange={setShareModalOpen} document={document} />
        <VersionComparison open={versionComparisonOpen} onOpenChange={setVersionComparisonOpen} document={document} />
        </>
    );
};