import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { User, Bell, Lock, Globe } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Settings = () => {
    const { user, language, toggleLanguage } = useApp();

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-900">Settings & Preferences</h1>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="system">System</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your contact details and role information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-700">
                                    {user?.name.substring(0, 2).toUpperCase()}
                                </div>
                                <Button variant="outline">Change Avatar</Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" defaultValue={user?.name} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" defaultValue="ahmed.rashid@finance.gov.ae" disabled />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dept">Department</Label>
                                    <Input id="dept" defaultValue={user?.department} disabled />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Input id="role" defaultValue={user?.role} disabled />
                                </div>
                            </div>
                            <div className="pt-4">
                                <Button className="bg-blue-900">Save Changes</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>Manage how you receive alerts and updates.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Email Notifications</Label>
                                    <p className="text-sm text-slate-500">Receive daily summaries and urgent alerts.</p>
                                </div>
                                <Switch checked={true} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Desktop Alerts</Label>
                                    <p className="text-sm text-slate-500">Show pop-ups when signed in.</p>
                                </div>
                                <Switch checked={true} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Approval Requests</Label>
                                    <p className="text-sm text-slate-500">Notify me immediately when approval is needed.</p>
                                </div>
                                <Switch checked={true} />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    <Card>
                        <CardHeader>
                            <CardTitle>Security Settings</CardTitle>
                            <CardDescription>Manage your password and session security.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current">Current Password</Label>
                                <Input id="current" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new">New Password</Label>
                                <Input id="new" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm">Confirm New Password</Label>
                                <Input id="confirm" type="password" />
                            </div>
                            <div className="pt-4">
                                <Button className="bg-blue-900">Update Password</Button>
                            </div>
                            
                            <div className="border-t border-slate-100 pt-6 mt-6">
                                <h4 className="font-medium mb-4">Two-Factor Authentication</h4>
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-green-600 shadow-sm">
                                            <Lock className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium">UAE PASS Integration</p>
                                            <p className="text-xs text-slate-500">Active and secured</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" disabled>Connected</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                 <TabsContent value="system">
                    <Card>
                        <CardHeader>
                            <CardTitle>System Preferences</CardTitle>
                            <CardDescription>Customize your interface experience.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Interface Language</Label>
                                    <p className="text-sm text-slate-500">Switch between English and Arabic.</p>
                                </div>
                                <Button variant="outline" onClick={toggleLanguage} className="gap-2">
                                    <Globe className="h-4 w-4" />
                                    {language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};
