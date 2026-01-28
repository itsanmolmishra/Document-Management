import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Lock, Unlock, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../ui/badge';

interface CheckInOutModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    document: any;
    mode: 'checkout' | 'checkin';
}

export const CheckInOutModal: React.FC<CheckInOutModalProps> = ({ 
    open, 
    onOpenChange, 
    document,
    mode 
}) => {
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (mode === 'checkout') {
            toast.success('Document Checked Out', {
                description: `${document?.name} is now locked for editing. Remember to check it back in when done.`,
                icon: <Lock className="h-4 w-4" />
            });
        } else {
            toast.success('Document Checked In', {
                description: `${document?.name} has been checked in successfully. Changes are now visible to all users.`,
                icon: <CheckCircle className="h-4 w-4" />
            });
        }

        setIsLoading(false);
        setComment('');
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] bg-white">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        {mode === 'checkout' ? (
                            <>
                                <Lock className="h-5 w-5 text-blue-600" />
                                Check Out Document
                            </>
                        ) : (
                            <>
                                <Unlock className="h-5 w-5 text-green-600" />
                                Check In Document
                            </>
                        )}
                    </DialogTitle>
                    <DialogDescription>
                        {mode === 'checkout' 
                            ? 'Lock this document for exclusive editing. Other users will be unable to modify it until you check it back in.'
                            : 'Check in your changes and release the lock. This will make your edits visible to all users.'
                        }
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Document Info */}
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <div className="flex items-start gap-3">
                            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                                <span className="text-xs font-bold">DOC</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-slate-900 truncate">{document?.name}</h4>
                                <p className="text-xs text-slate-500 mt-1">
                                    {document?.type} • {document?.classification}
                                </p>
                                {document?.lockedBy && mode === 'checkout' && (
                                    <div className="mt-2">
                                        <Badge variant="destructive" className="text-xs">
                                            <Lock className="h-3 w-3 mr-1" />
                                            Locked by {document.lockedBy}
                                        </Badge>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Warning for Check Out */}
                    {mode === 'checkout' && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
                            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                            <div className="text-sm">
                                <p className="font-semibold text-amber-900">Important</p>
                                <p className="text-amber-700 mt-1">
                                    While checked out, other users cannot edit this document. Remember to check it back in after making your changes.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Success Info for Check In */}
                    {mode === 'checkin' && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                            <div className="text-sm">
                                <p className="font-semibold text-green-900">Ready to Check In</p>
                                <p className="text-green-700 mt-1">
                                    Your changes will be saved as a new version. The document will be unlocked for other users.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Comment Field */}
                    <div className="space-y-2">
                        <Label htmlFor="comment" className="text-slate-700">
                            {mode === 'checkout' ? 'Reason for Check Out' : 'Version Comment'} 
                            {mode === 'checkin' && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        <Textarea 
                            id="comment"
                            placeholder={mode === 'checkout' 
                                ? 'E.g., "Updating financial figures for Q4"'
                                : 'Describe the changes you made...'
                            }
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="resize-none h-24"
                            disabled={isLoading}
                        />
                        {mode === 'checkin' && (
                            <p className="text-xs text-slate-500">
                                This comment will appear in the document's version history
                            </p>
                        )}
                    </div>

                    {/* Auto-Lock Duration (for checkout) */}
                    {mode === 'checkout' && (
                        <div className="space-y-2">
                            <Label className="text-slate-700">Auto-Release Lock After</Label>
                            <select className="flex h-10 w-full items-center justify-between rounded-[6px] border-2 border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all">
                                <option value="2h">2 Hours</option>
                                <option value="4h">4 Hours (Recommended)</option>
                                <option value="8h">8 Hours (Full Day)</option>
                                <option value="24h">24 Hours</option>
                                <option value="manual">Manual (No Auto-Release)</option>
                            </select>
                            <p className="text-xs text-slate-500">
                                Document will automatically unlock if not checked in within this time
                            </p>
                        </div>
                    )}
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button 
                        variant="outline" 
                        onClick={() => onOpenChange(false)}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSubmit}
                        disabled={isLoading || (mode === 'checkin' && !comment.trim())}
                        loading={isLoading}
                        loadingText={mode === 'checkout' ? 'Checking Out...' : 'Checking In...'}
                        variant={mode === 'checkout' ? 'primary' : 'success'}
                    >
                        {mode === 'checkout' ? (
                            <>
                                <Lock className="h-4 w-4 mr-2" />
                                Check Out
                            </>
                        ) : (
                            <>
                                <Unlock className="h-4 w-4 mr-2" />
                                Check In
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
