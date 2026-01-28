import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Share2, Copy, Mail, Link as LinkIcon, Calendar, Shield, Clock, ExternalLink, Users, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface ShareModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    document: any;
}

export const ShareModal: React.FC<ShareModalProps> = ({ 
    open, 
    onOpenChange, 
    document 
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [shareLink, setShareLink] = useState('');
    const [emails, setEmails] = useState('');
    const [message, setMessage] = useState('');
    const [expirationDays, setExpirationDays] = useState('7');
    const [requirePassword, setRequirePassword] = useState(false);
    const [allowDownload, setAllowDownload] = useState(true);
    const [trackViews, setTrackViews] = useState(true);
    const [copied, setCopied] = useState(false);

    const generateShareLink = () => {
        setIsLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            const link = `https://dof.gov.ae/share/${Math.random().toString(36).substr(2, 9)}`;
            setShareLink(link);
            setIsLoading(false);
            
            toast.success('Share Link Generated', {
                description: 'The link is valid for ' + expirationDays + ' days'
            });
        }, 1000);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareLink);
        setCopied(true);
        toast.success('Link Copied', {
            description: 'Share link copied to clipboard'
        });
        setTimeout(() => setCopied(false), 2000);
    };

    const sendEmailInvite = () => {
        setIsLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            toast.success('Email Invitations Sent', {
                description: `Sent to ${emails.split(',').length} recipient(s)`
            });
            setIsLoading(false);
            setEmails('');
            setMessage('');
        }, 1500);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] bg-white max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <Share2 className="h-5 w-5 text-blue-600" />
                        Share Document
                    </DialogTitle>
                    <DialogDescription>
                        Share "{document?.name}" securely with internal teams or external partners
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="internal" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="internal" className="gap-2">
                            <Users className="h-4 w-4" />
                            Internal Share
                        </TabsTrigger>
                        <TabsTrigger value="external" className="gap-2">
                            <ExternalLink className="h-4 w-4" />
                            External Link
                        </TabsTrigger>
                    </TabsList>

                    {/* Internal Share Tab */}
                    <TabsContent value="internal" className="space-y-6">
                        {/* Email Recipients */}
                        <div className="space-y-2">
                            <Label htmlFor="emails" className="text-slate-700">
                                Email Addresses <span className="text-red-500">*</span>
                            </Label>
                            <Input 
                                id="emails"
                                type="text"
                                placeholder="ahmed@finance.gov.ae, sarah@finance.gov.ae"
                                value={emails}
                                onChange={(e) => setEmails(e.target.value)}
                                className="font-mono text-sm"
                            />
                            <p className="text-xs text-slate-500">
                                Separate multiple emails with commas
                            </p>
                        </div>

                        {/* Permission Level */}
                        <div className="space-y-2">
                            <Label className="text-slate-700">Permission Level</Label>
                            <select className="flex h-10 w-full items-center justify-between rounded-[6px] border-2 border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all">
                                <option value="view">Can View Only</option>
                                <option value="comment">Can View & Comment</option>
                                <option value="edit">Can Edit</option>
                                <option value="admin">Full Control (Admin)</option>
                            </select>
                        </div>

                        {/* Access Duration */}
                        <div className="space-y-2">
                            <Label className="text-slate-700">Access Duration</Label>
                            <select 
                                className="flex h-10 w-full items-center justify-between rounded-[6px] border-2 border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                                value={expirationDays}
                                onChange={(e) => setExpirationDays(e.target.value)}
                            >
                                <option value="1">1 Day</option>
                                <option value="7">7 Days (Recommended)</option>
                                <option value="30">30 Days</option>
                                <option value="90">90 Days</option>
                                <option value="permanent">Permanent Access</option>
                            </select>
                            <p className="text-xs text-slate-500">
                                Access will automatically expire after this period
                            </p>
                        </div>

                        {/* Personal Message */}
                        <div className="space-y-2">
                            <Label htmlFor="message" className="text-slate-700">
                                Personal Message (Optional)
                            </Label>
                            <Textarea 
                                id="message"
                                placeholder="Add a message to recipients..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="resize-none h-20"
                            />
                        </div>

                        {/* Notification Options */}
                        <div className="space-y-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <h4 className="text-sm font-semibold text-slate-900">Notification Options</h4>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-sm font-normal">Email Notification</Label>
                                    <p className="text-xs text-slate-500">Send invitation via email</p>
                                </div>
                                <Switch checked={true} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-sm font-normal">Notify on Access</Label>
                                    <p className="text-xs text-slate-500">Alert when document is viewed</p>
                                </div>
                                <Switch checked={trackViews} onCheckedChange={setTrackViews} />
                            </div>
                        </div>

                        <Button 
                            className="w-full bg-blue-900 hover:bg-blue-800"
                            onClick={sendEmailInvite}
                            disabled={!emails.trim() || isLoading}
                            loading={isLoading}
                            loadingText="Sending Invitations..."
                        >
                            <Mail className="h-4 w-4 mr-2" />
                            Send Email Invitation
                        </Button>
                    </TabsContent>

                    {/* External Link Tab */}
                    <TabsContent value="external" className="space-y-6">
                        {/* Security Settings */}
                        <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-center gap-2 text-blue-900 mb-2">
                                <Shield className="h-4 w-4" />
                                <h4 className="text-sm font-semibold">Security Options</h4>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-sm font-normal text-blue-900">Require Password</Label>
                                    <p className="text-xs text-blue-700">Recipients must enter password to access</p>
                                </div>
                                <Switch checked={requirePassword} onCheckedChange={setRequirePassword} />
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-sm font-normal text-blue-900">Allow Download</Label>
                                    <p className="text-xs text-blue-700">Permit downloading original file</p>
                                </div>
                                <Switch checked={allowDownload} onCheckedChange={setAllowDownload} />
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-sm font-normal text-blue-900">Track Views</Label>
                                    <p className="text-xs text-blue-700">Log all access attempts</p>
                                </div>
                                <Switch checked={trackViews} onCheckedChange={setTrackViews} />
                            </div>
                        </div>

                        {/* Link Expiration */}
                        <div className="space-y-2">
                            <Label className="text-slate-700 flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Link Expiration
                            </Label>
                            <select 
                                className="flex h-10 w-full items-center justify-between rounded-[6px] border-2 border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                                value={expirationDays}
                                onChange={(e) => setExpirationDays(e.target.value)}
                            >
                                <option value="1">1 Day</option>
                                <option value="3">3 Days</option>
                                <option value="7">7 Days (Recommended)</option>
                                <option value="14">14 Days</option>
                                <option value="30">30 Days</option>
                            </select>
                        </div>

                        {/* Max View Count */}
                        <div className="space-y-2">
                            <Label className="text-slate-700">Maximum View Count</Label>
                            <select className="flex h-10 w-full items-center justify-between rounded-[6px] border-2 border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all">
                                <option value="unlimited">Unlimited</option>
                                <option value="1">1 View Only</option>
                                <option value="5">5 Views</option>
                                <option value="10">10 Views</option>
                                <option value="25">25 Views</option>
                            </select>
                            <p className="text-xs text-slate-500">
                                Link will expire after this many views
                            </p>
                        </div>

                        {/* Generate Button */}
                        {!shareLink ? (
                            <Button 
                                className="w-full bg-blue-900 hover:bg-blue-800"
                                onClick={generateShareLink}
                                loading={isLoading}
                                loadingText="Generating Link..."
                            >
                                <LinkIcon className="h-4 w-4 mr-2" />
                                Generate Secure Link
                            </Button>
                        ) : (
                            <div className="space-y-3">
                                {/* Generated Link */}
                                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                    <div className="flex items-center gap-2 text-green-900 mb-3">
                                        <Check className="h-4 w-4" />
                                        <p className="text-sm font-semibold">Secure Link Generated</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Input 
                                            value={shareLink}
                                            readOnly
                                            className="font-mono text-xs bg-white"
                                        />
                                        <Button 
                                            variant="outline" 
                                            size="icon"
                                            onClick={copyToClipboard}
                                            className={copied ? 'border-green-500 bg-green-50' : ''}
                                        >
                                            {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between text-xs text-green-700">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            Expires in {expirationDays} days
                                        </span>
                                        <span>0 views</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="grid grid-cols-2 gap-2">
                                    <Button variant="outline" onClick={() => setShareLink('')}>
                                        Generate New Link
                                    </Button>
                                    <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                        Revoke Link
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Warning */}
                        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-sm">
                            <p className="text-amber-900">
                                <strong>⚠️ External Sharing:</strong> This link can be accessed by anyone. Ensure the document classification allows external sharing per DOF policy.
                            </p>
                        </div>
                    </TabsContent>
                </Tabs>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button 
                        variant="outline" 
                        onClick={() => onOpenChange(false)}
                    >
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
