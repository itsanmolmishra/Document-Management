import React from 'react';
import { StatusBadge, CompactStatusBadge, StatusPill } from '../ui/status-badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export const StatusBadgeDemo = () => {
    const statuses = ['Under Review', 'Approved', 'Active', 'Archived', 'Locked', 'Draft', 'Pending', 'Rejected'];

    return (
        <div className="space-y-8 p-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Status Badge Variants</h1>
                <p className="text-slate-500 mt-1">Three consistent badge styles with fixed widths</p>
            </div>

            {/* Standard Status Badge */}
            <Card>
                <CardHeader>
                    <CardTitle>Standard Status Badge</CardTitle>
                    <CardDescription>Fixed width (104px), rounded-full, clean design</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Small */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-700 mb-3">Small (88px × 24px)</h3>
                        <div className="flex flex-wrap gap-3">
                            {statuses.map(status => (
                                <StatusBadge key={status} status={status} size="sm" />
                            ))}
                        </div>
                    </div>

                    {/* Medium (Default) */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-700 mb-3">Medium (104px × 28px) - Default</h3>
                        <div className="flex flex-wrap gap-3">
                            {statuses.map(status => (
                                <StatusBadge key={status} status={status} size="md" />
                            ))}
                        </div>
                    </div>

                    {/* Large */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-700 mb-3">Large (120px × 32px)</h3>
                        <div className="flex flex-wrap gap-3">
                            {statuses.map(status => (
                                <StatusBadge key={status} status={status} size="lg" />
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Compact Status Badge with Icon */}
            <Card>
                <CardHeader>
                    <CardTitle>Compact Status Badge (with Icons)</CardTitle>
                    <CardDescription>Minimum width (96px), includes emoji icons</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Small */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-700 mb-3">Small</h3>
                        <div className="flex flex-wrap gap-3">
                            {statuses.map(status => (
                                <CompactStatusBadge key={status} status={status} size="sm" />
                            ))}
                        </div>
                    </div>

                    {/* Medium (Default) */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-700 mb-3">Medium - Default</h3>
                        <div className="flex flex-wrap gap-3">
                            {statuses.map(status => (
                                <CompactStatusBadge key={status} status={status} size="md" />
                            ))}
                        </div>
                    </div>

                    {/* Large */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-700 mb-3">Large</h3>
                        <div className="flex flex-wrap gap-3">
                            {statuses.map(status => (
                                <CompactStatusBadge key={status} status={status} size="lg" />
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Status Pill with Dot */}
            <Card>
                <CardHeader>
                    <CardTitle>Status Pill (with Dot Indicator)</CardTitle>
                    <CardDescription>Fixed width (104px), includes colored dot indicator - Recommended for tables</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Small */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-700 mb-3">Small</h3>
                        <div className="flex flex-wrap gap-3">
                            {statuses.map(status => (
                                <StatusPill key={status} status={status} size="sm" />
                            ))}
                        </div>
                    </div>

                    {/* Medium (Default) */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-700 mb-3">Medium - Default ⭐ Recommended</h3>
                        <div className="flex flex-wrap gap-3">
                            {statuses.map(status => (
                                <StatusPill key={status} status={status} size="md" />
                            ))}
                        </div>
                    </div>

                    {/* Large */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-700 mb-3">Large</h3>
                        <div className="flex flex-wrap gap-3">
                            {statuses.map(status => (
                                <StatusPill key={status} status={status} size="lg" />
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Table Example */}
            <Card>
                <CardHeader>
                    <CardTitle>In Table Context (Recommended: StatusPill Medium)</CardTitle>
                    <CardDescription>How the badges look in a real table</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border border-slate-200 rounded-lg overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="text-left p-4 font-semibold text-sm text-slate-700">Document</th>
                                    <th className="text-left p-4 font-semibold text-sm text-slate-700">Owner</th>
                                    <th className="text-left p-4 font-semibold text-sm text-slate-700">Date</th>
                                    <th className="text-left p-4 font-semibold text-sm text-slate-700">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {statuses.map((status, idx) => (
                                    <tr key={idx} className="border-t border-slate-100 hover:bg-slate-50/50">
                                        <td className="p-4 text-sm text-slate-900">Annual Budget Report Q{idx + 1}</td>
                                        <td className="p-4 text-sm text-slate-600">Ahmed R.</td>
                                        <td className="p-4 text-sm text-slate-500">Jan {20 + idx}, 2025</td>
                                        <td className="p-4">
                                            <StatusPill status={status} size="md" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Color Palette */}
            <Card>
                <CardHeader>
                    <CardTitle>Color Palette Reference</CardTitle>
                    <CardDescription>Consistent colors across all status types</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-amber-100 border border-amber-200 rounded-lg">
                            <div className="w-8 h-8 bg-amber-500 rounded-full mb-2"></div>
                            <p className="text-xs font-semibold text-amber-900">Warning</p>
                            <p className="text-xs text-amber-700">Under Review, Pending</p>
                        </div>
                        <div className="p-4 bg-green-100 border border-green-200 rounded-lg">
                            <div className="w-8 h-8 bg-green-500 rounded-full mb-2"></div>
                            <p className="text-xs font-semibold text-green-900">Success</p>
                            <p className="text-xs text-green-700">Approved, Active</p>
                        </div>
                        <div className="p-4 bg-slate-100 border border-slate-200 rounded-lg">
                            <div className="w-8 h-8 bg-slate-400 rounded-full mb-2"></div>
                            <p className="text-xs font-semibold text-slate-900">Neutral</p>
                            <p className="text-xs text-slate-700">Archived, Draft</p>
                        </div>
                        <div className="p-4 bg-red-100 border border-red-200 rounded-lg">
                            <div className="w-8 h-8 bg-red-500 rounded-full mb-2"></div>
                            <p className="text-xs font-semibold text-red-900">Danger</p>
                            <p className="text-xs text-red-700">Locked, Rejected</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
