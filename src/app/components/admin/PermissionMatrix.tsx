import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Shield, Lock, Eye, Edit, Trash2, Share2, Download, Upload, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../ui/badge';

const roles = ['Admin', 'Manager', 'Staff', 'Auditor', 'Guest'];

const permissions = [
    { id: 'doc_view', name: 'View Documents', icon: Eye, category: 'Documents' },
    { id: 'doc_create', name: 'Create Documents', icon: Upload, category: 'Documents' },
    { id: 'doc_edit', name: 'Edit Documents', icon: Edit, category: 'Documents' },
    { id: 'doc_delete', name: 'Delete Documents', icon: Trash2, category: 'Documents' },
    { id: 'doc_share', name: 'Share Documents', icon: Share2, category: 'Documents' },
    { id: 'doc_download', name: 'Download Documents', icon: Download, category: 'Documents' },
    { id: 'workflow_create', name: 'Create Workflows', icon: Upload, category: 'Workflows' },
    { id: 'workflow_approve', name: 'Approve Workflows', icon: Check, category: 'Workflows' },
    { id: 'workflow_reject', name: 'Reject Workflows', icon: X, category: 'Workflows' },
    { id: 'archive_access', name: 'Access Archive', icon: Eye, category: 'Archive' },
    { id: 'archive_restore', name: 'Restore from Archive', icon: Upload, category: 'Archive' },
    { id: 'audit_view', name: 'View Audit Logs', icon: Eye, category: 'Compliance' },
    { id: 'audit_export', name: 'Export Audit Reports', icon: Download, category: 'Compliance' },
    { id: 'user_manage', name: 'Manage Users', icon: Edit, category: 'Admin' },
    { id: 'user_delete', name: 'Delete Users', icon: Trash2, category: 'Admin' },
    { id: 'settings_view', name: 'View Settings', icon: Eye, category: 'Admin' },
    { id: 'settings_edit', name: 'Edit Settings', icon: Edit, category: 'Admin' },
];

const defaultPermissions: Record<string, Record<string, boolean>> = {
    Admin: {
        doc_view: true, doc_create: true, doc_edit: true, doc_delete: true, doc_share: true, doc_download: true,
        workflow_create: true, workflow_approve: true, workflow_reject: true,
        archive_access: true, archive_restore: true,
        audit_view: true, audit_export: true,
        user_manage: true, user_delete: true,
        settings_view: true, settings_edit: true,
    },
    Manager: {
        doc_view: true, doc_create: true, doc_edit: true, doc_delete: false, doc_share: true, doc_download: true,
        workflow_create: true, workflow_approve: true, workflow_reject: true,
        archive_access: true, archive_restore: false,
        audit_view: true, audit_export: true,
        user_manage: false, user_delete: false,
        settings_view: true, settings_edit: false,
    },
    Staff: {
        doc_view: true, doc_create: true, doc_edit: false, doc_delete: false, doc_share: false, doc_download: true,
        workflow_create: true, workflow_approve: false, workflow_reject: false,
        archive_access: false, archive_restore: false,
        audit_view: false, audit_export: false,
        user_manage: false, user_delete: false,
        settings_view: false, settings_edit: false,
    },
    Auditor: {
        doc_view: true, doc_create: false, doc_edit: false, doc_delete: false, doc_share: false, doc_download: true,
        workflow_create: false, workflow_approve: false, workflow_reject: false,
        archive_access: true, archive_restore: false,
        audit_view: true, audit_export: true,
        user_manage: false, user_delete: false,
        settings_view: true, settings_edit: false,
    },
    Guest: {
        doc_view: true, doc_create: false, doc_edit: false, doc_delete: false, doc_share: false, doc_download: false,
        workflow_create: false, workflow_approve: false, workflow_reject: false,
        archive_access: false, archive_restore: false,
        audit_view: false, audit_export: false,
        user_manage: false, user_delete: false,
        settings_view: false, settings_edit: false,
    },
};

export const PermissionMatrix = () => {
    const [permissionState, setPermissionState] = useState(defaultPermissions);
    const [hasChanges, setHasChanges] = useState(false);

    const togglePermission = (role: string, permissionId: string) => {
        setPermissionState(prev => ({
            ...prev,
            [role]: {
                ...prev[role],
                [permissionId]: !prev[role][permissionId]
            }
        }));
        setHasChanges(true);
    };

    const handleSave = () => {
        // Simulate API call
        setTimeout(() => {
            toast.success('Permissions Saved', {
                description: 'Permission matrix has been updated successfully'
            });
            setHasChanges(false);
        }, 500);
    };

    const handleReset = () => {
        setPermissionState(defaultPermissions);
        setHasChanges(false);
        toast.success('Permissions Reset', {
            description: 'All permissions have been reset to defaults'
        });
    };

    const getRoleBadge = (role: string) => {
        switch(role) {
            case 'Admin': return 'destructive';
            case 'Manager': return 'default';
            case 'Staff': return 'secondary';
            case 'Auditor': return 'outline';
            case 'Guest': return 'outline';
            default: return 'outline';
        }
    };

    const groupedPermissions = permissions.reduce((acc, perm) => {
        if (!acc[perm.category]) acc[perm.category] = [];
        acc[perm.category].push(perm);
        return acc;
    }, {} as Record<string, typeof permissions>);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                        <Shield className="h-6 w-6 text-blue-600" />
                        Permission Matrix
                    </h1>
                    <p className="text-slate-500 text-sm">Configure role-based access control (RBAC) for the system</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleReset} disabled={!hasChanges}>
                        Reset to Defaults
                    </Button>
                    <Button className="bg-blue-900 hover:bg-blue-800" onClick={handleSave} disabled={!hasChanges}>
                        <Check className="h-4 w-4 mr-2" />
                        Save Changes
                    </Button>
                </div>
            </div>

            {/* Role Legend */}
            <div className="flex gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-900">Roles:</span>
                </div>
                {roles.map(role => (
                    <Badge key={role} variant={getRoleBadge(role) as any} className="text-xs">
                        {role}
                    </Badge>
                ))}
            </div>

            {/* Permission Groups */}
            {Object.entries(groupedPermissions).map(([category, perms]) => (
                <Card key={category} className="shadow-sm border-slate-200">
                    <CardHeader className="border-b border-slate-100 pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Lock className="h-5 w-5 text-slate-600" />
                            {category} Permissions
                        </CardTitle>
                        <CardDescription>
                            Manage access permissions for {category.toLowerCase()} operations
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="text-left p-4 font-semibold text-sm text-slate-900 w-[300px]">
                                            Permission
                                        </th>
                                        {roles.map(role => (
                                            <th key={role} className="text-center p-4 font-semibold text-sm text-slate-900">
                                                <Badge variant={getRoleBadge(role) as any} className="text-xs">
                                                    {role}
                                                </Badge>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {perms.map((permission, idx) => (
                                        <tr 
                                            key={permission.id} 
                                            className={`border-t border-slate-100 hover:bg-slate-50/50 transition-colors ${idx % 2 === 1 ? 'bg-slate-50/30' : ''}`}
                                        >
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                                                        <permission.icon className="h-4 w-4" />
                                                    </div>
                                                    <span className="text-sm font-medium text-slate-900">
                                                        {permission.name}
                                                    </span>
                                                </div>
                                            </td>
                                            {roles.map(role => (
                                                <td key={role} className="p-4 text-center">
                                                    <div className="flex justify-center">
                                                        <Switch 
                                                            checked={permissionState[role][permission.id]}
                                                            onCheckedChange={() => togglePermission(role, permission.id)}
                                                        />
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            ))}

            {/* Summary Stats */}
            <Card className="shadow-sm border-slate-200 bg-gradient-to-br from-blue-50 to-slate-50">
                <CardHeader>
                    <CardTitle className="text-sm font-semibold text-slate-900">Permission Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {roles.map(role => {
                            const enabledCount = Object.values(permissionState[role]).filter(Boolean).length;
                            const totalCount = permissions.length;
                            const percentage = Math.round((enabledCount / totalCount) * 100);
                            
                            return (
                                <div key={role} className="p-4 bg-white rounded-lg border border-slate-200">
                                    <Badge variant={getRoleBadge(role) as any} className="mb-2 text-xs">
                                        {role}
                                    </Badge>
                                    <p className="text-2xl font-bold text-slate-900">{enabledCount}/{totalCount}</p>
                                    <p className="text-xs text-slate-500 mt-1">{percentage}% enabled</p>
                                    <div className="mt-2 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-blue-600 transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Save Warning */}
            {hasChanges && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4">
                    <div className="bg-amber-50 border-2 border-amber-200 rounded-lg px-6 py-4 shadow-xl flex items-center gap-4">
                        <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                            <Shield className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                            <p className="font-semibold text-amber-900">Unsaved Changes</p>
                            <p className="text-sm text-amber-700">You have modified permissions</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                            <Button variant="outline" size="sm" onClick={handleReset}>
                                Discard
                            </Button>
                            <Button size="sm" onClick={handleSave} className="bg-blue-900 hover:bg-blue-800">
                                Save Now
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
