import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { EnhancedInput } from '../ui/enhanced-input';
import { useApp } from '../../context/AppContext';
import { useButtonLoader } from '@/app/hooks/useDelayedLoader';
import { UploadCloud, File, X, CheckCircle } from 'lucide-react';
import toast from '@/app/lib/toast';

export const UploadModal = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    const { t } = useApp();
    const [file, setFile] = useState<File | null>(null);
    const [step, setStep] = useState(1);
    const { isLoading, withLoading } = useButtonLoader();
    
    // Form state
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        department: '',
        classification: '',
        retention: '',
        description: ''
    });
    
    // Validation errors
    const [errors, setErrors] = useState({
        title: '',
        type: '',
        department: '',
        classification: '',
        retention: ''
    });

    const validateFile = (file: File): string | null => {
        const maxSize = 50 * 1024 * 1024; // 50MB
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
        
        if (file.size > maxSize) {
            return 'File size exceeds 50MB limit';
        }
        
        if (!allowedTypes.includes(file.type)) {
            return 'File type not supported. Please upload PDF, DOC, DOCX, JPG, or PNG';
        }
        
        return null;
    };

    const handleFileDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const selectedFile = e.dataTransfer.files[0];
            const error = validateFile(selectedFile);
            
            if (error) {
                toast.error('Upload Failed', error);
                return;
            }
            
            setFile(selectedFile);
            setFormData({ ...formData, title: selectedFile.name.split('.')[0] });
            setStep(2);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            const error = validateFile(selectedFile);
            
            if (error) {
                toast.error('Upload Failed', error);
                return;
            }
            
            setFile(selectedFile);
            setFormData({ ...formData, title: selectedFile.name.split('.')[0] });
            setStep(2);
        }
    };

    const validateForm = (): boolean => {
        const newErrors = {
            title: formData.title.trim() === '' ? 'Document title is required' : '',
            type: formData.type === '' ? 'Document type is required' : '',
            department: formData.department === '' ? 'Department is required' : '',
            classification: formData.classification === '' ? 'Classification is required' : '',
            retention: formData.retention === '' ? 'Retention period is required' : ''
        };
        
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            toast.error('Validation Failed', 'Please fill in all required fields');
            return;
        }

        await withLoading(async () => {
            // Simulate API call
            return new Promise((resolve) => {
                setTimeout(() => {
                    toast.success('Upload Successful', `${formData.title} has been uploaded and is pending review`);
                    onOpenChange(false);
                    resetForm();
                    resolve(true);
                }, 1500);
            });
        });
    };

    const resetForm = () => {
        setStep(1);
        setFile(null);
        setFormData({
            title: '',
            type: '',
            department: '',
            classification: '',
            retention: '',
            description: ''
        });
        setErrors({
            title: '',
            type: '',
            department: '',
            classification: '',
            retention: ''
        });
    };

    return (
        <Dialog open={open} onOpenChange={(open) => {
            if (!open && !isLoading) {
                resetForm();
            }
            onOpenChange(open);
        }}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{t('upload.title')}</DialogTitle>
                    <DialogDescription>{t('upload.hint')}</DialogDescription>
                </DialogHeader>

                {step === 1 && (
                    <div 
                        className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center hover:bg-slate-50 hover:border-blue-400 transition-all cursor-pointer group"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleFileDrop}
                        onClick={() => document.getElementById('file-upload')?.click()}
                    >
                        <UploadCloud className="h-12 w-12 text-slate-400 group-hover:text-blue-600 mx-auto mb-4 transition-colors" />
                        <h3 className="text-lg font-medium text-slate-900">Click or drag file to upload</h3>
                        <p className="text-sm text-slate-500 mt-2">Maximum file size 50 MB • PDF, DOC, DOCX, JPG, PNG</p>
                        <input id="file-upload" type="file" className="hidden" onChange={handleFileSelect} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-100 rounded-md">
                            <File className="h-8 w-8 text-blue-600" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900 truncate">{file?.name}</p>
                                <p className="text-xs text-slate-500">{(file?.size || 0) / 1024 > 1024 ? `${((file?.size || 0) / 1024 / 1024).toFixed(2)} MB` : `${((file?.size || 0) / 1024).toFixed(2)} KB`}</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => { setStep(1); setFile(null); }} disabled={isLoading}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <EnhancedInput
                                    label={t('upload.docTitle')}
                                    required
                                    value={formData.title}
                                    onChange={(e) => {
                                        setFormData({ ...formData, title: e.target.value });
                                        if (errors.title) setErrors({ ...errors, title: '' });
                                    }}
                                    validationState={errors.title ? 'error' : formData.title ? 'success' : 'none'}
                                    errorText={errors.title}
                                    successText={formData.title && !errors.title ? 'Looks good!' : ''}
                                    placeholder="Enter document title"
                                    disabled={isLoading}
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-slate-700">
                                    {t('upload.docType')} <span className="text-red-500">*</span>
                                </Label>
                                <Select value={formData.type} onValueChange={(value) => {
                                    setFormData({ ...formData, type: value });
                                    if (errors.type) setErrors({ ...errors, type: '' });
                                }} disabled={isLoading}>
                                    <SelectTrigger className={errors.type ? 'border-red-300' : ''}>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="financial">Financial Report</SelectItem>
                                        <SelectItem value="legal">Legal Document</SelectItem>
                                        <SelectItem value="hr">HR Document</SelectItem>
                                        <SelectItem value="technical">Technical</SelectItem>
                                        <SelectItem value="contract">Contract</SelectItem>
                                        <SelectItem value="policy">Policy</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.type && <p className="text-xs text-red-600">{errors.type}</p>}
                            </div>
                            
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-slate-700">
                                    {t('upload.dept')} <span className="text-red-500">*</span>
                                </Label>
                                <Select value={formData.department} onValueChange={(value) => {
                                    setFormData({ ...formData, department: value });
                                    if (errors.department) setErrors({ ...errors, department: '' });
                                }} disabled={isLoading}>
                                    <SelectTrigger className={errors.department ? 'border-red-300' : ''}>
                                        <SelectValue placeholder="Select dept" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="finance">Finance</SelectItem>
                                        <SelectItem value="it">IT</SelectItem>
                                        <SelectItem value="hr">HR</SelectItem>
                                        <SelectItem value="legal">Legal</SelectItem>
                                        <SelectItem value="procurement">Procurement</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.department && <p className="text-xs text-red-600">{errors.department}</p>}
                            </div>
                            
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-slate-700">
                                    {t('upload.class')} <span className="text-red-500">*</span>
                                </Label>
                                <Select value={formData.classification} onValueChange={(value) => {
                                    setFormData({ ...formData, classification: value });
                                    if (errors.classification) setErrors({ ...errors, classification: '' });
                                }} disabled={isLoading}>
                                    <SelectTrigger className={errors.classification ? 'border-red-300' : ''}>
                                        <SelectValue placeholder="Select classification" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="public">Public</SelectItem>
                                        <SelectItem value="internal">Internal</SelectItem>
                                        <SelectItem value="confidential">Confidential</SelectItem>
                                        <SelectItem value="restricted">Restricted</SelectItem>
                                        <SelectItem value="secret">Secret</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.classification && <p className="text-xs text-red-600">{errors.classification}</p>}
                            </div>
                            
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-slate-700">
                                    {t('upload.retention')} <span className="text-red-500">*</span>
                                </Label>
                                <Select value={formData.retention} onValueChange={(value) => {
                                    setFormData({ ...formData, retention: value });
                                    if (errors.retention) setErrors({ ...errors, retention: '' });
                                }} disabled={isLoading}>
                                    <SelectTrigger className={errors.retention ? 'border-red-300' : ''}>
                                        <SelectValue placeholder="Select policy" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="3">3 Years</SelectItem>
                                        <SelectItem value="5">5 Years</SelectItem>
                                        <SelectItem value="7">7 Years</SelectItem>
                                        <SelectItem value="10">10 Years</SelectItem>
                                        <SelectItem value="15">15 Years</SelectItem>
                                        <SelectItem value="perm">Permanent</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.retention && <p className="text-xs text-red-600">{errors.retention}</p>}
                            </div>
                            
                            <div className="space-y-2 col-span-2">
                                <Label className="text-sm font-medium text-slate-700">{t('upload.desc')}</Label>
                                <Input 
                                    placeholder="Brief description of contents...\" 
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className="bg-amber-50 p-3 rounded-md text-xs text-amber-800 border border-amber-200 flex items-start gap-2">
                            <span className="text-amber-600 mt-0.5">⚠</span>
                            <span>{t('upload.warning')}</span>
                        </div>
                    </div>
                )}

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>Cancel</Button>
                    <Button 
                        onClick={handleSubmit} 
                        disabled={step === 1} 
                        loading={isLoading}
                        loadingText="Uploading..."
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        {t('upload.submit')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};