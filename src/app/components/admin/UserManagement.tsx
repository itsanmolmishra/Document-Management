import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Search, Plus, Edit, Trash2, Shield, Users, UserPlus, MoreHorizontal } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { Card, CardContent } from '../ui/card';

const initialUsers = [
    { id: 1, name: 'Ahmed Rashid', email: 'ahmed.rashid@finance.gov.ae', role: 'Admin', department: 'Finance', status: 'Active', lastLogin: '2 hours ago' },
    { id: 2, name: 'Sarah Mohammed', email: 'sarah.m@finance.gov.ae', role: 'Manager', department: 'Finance', status: 'Active', lastLogin: '1 day ago' },
    { id: 3, name: 'Fatima Ali', email: 'fatima.ali@finance.gov.ae', role: 'Staff', department: 'HR', status: 'Active', lastLogin: '3 hours ago' },
    { id: 4, name: 'John Davis', email: 'john.davis@finance.gov.ae', role: 'Staff', department: 'IT', status: 'Active', lastLogin: '1 week ago' },
    { id: 5, name: 'Mariam Hassan', email: 'mariam@finance.gov.ae', role: 'Manager', department: 'Legal', status: 'Inactive', lastLogin: '1 month ago' },
];

export const UserManagement = () => {
    const [users, setUsers] = useState(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Staff',
        department: '',
        password: ''
    });

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreate = () => {
        if (!formData.name || !formData.email || !formData.department) {
            toast.error('Missing Fields', { description: 'Please fill in all required fields' });
            return;
        }

        const newUser = {
            id: users.length + 1,
            name: formData.name,
            email: formData.email,
            role: formData.role,
            department: formData.department,
            status: 'Active',
            lastLogin: 'Never'
        };

        setUsers([...users, newUser]);
        toast.success('User Created', { description: `${formData.name} has been added to the system` });
        setCreateModalOpen(false);
        setFormData({ name: '', email: '', role: 'Staff', department: '', password: '' });
    };

    const handleEdit = (user: any) => {
        setSelectedUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            department: user.department,
            password: ''
        });
        setEditModalOpen(true);
    };

    const handleUpdate = () => {
        setUsers(users.map(u => 
            u.id === selectedUser.id 
                ? { ...u, name: formData.name, email: formData.email, role: formData.role, department: formData.department }
                : u
        ));
        toast.success('User Updated', { description: `${formData.name}'s information has been updated` });
        setEditModalOpen(false);
        setSelectedUser(null);
    };

    const handleDelete = (userId: number) => {
        if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            setUsers(users.filter(u => u.id !== userId));
            toast.success('User Deleted', { description: 'User has been removed from the system' });
        }
    };

    const getRoleBadge = (role: string) => {
        switch(role) {
            case 'Admin': return 'destructive';
            case 'Manager': return 'default';
            case 'Staff': return 'secondary';
            default: return 'outline';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                        <Users className="h-6 w-6 text-blue-600" />
                        User Management
                    </h1>
                    <p className="text-slate-500 text-sm">Manage system users, roles, and permissions</p>
                </div>
                <Button className="bg-blue-900 hover:bg-blue-800 gap-2" onClick={() => setCreateModalOpen(true)}>
                    <UserPlus className="h-4 w-4" />
                    Add New User
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="shadow-sm border-slate-200">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Total Users</p>
                                <p className="text-2xl font-bold text-slate-900">{users.length}</p>
                            </div>
                            <div className="h-12 w-12 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-center">
                                <Users className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-slate-200">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Active Users</p>
                                <p className="text-2xl font-bold text-slate-900">{users.filter(u => u.status === 'Active').length}</p>
                            </div>
                            <div className="h-12 w-12 bg-green-50 rounded-xl border border-green-100 flex items-center justify-center">
                                <Shield className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-slate-200">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Admins</p>
                                <p className="text-2xl font-bold text-slate-900">{users.filter(u => u.role === 'Admin').length}</p>
                            </div>
                            <div className="h-12 w-12 bg-red-50 rounded-xl border border-red-100 flex items-center justify-center">
                                <Shield className="h-6 w-6 text-red-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-sm border-slate-200">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Managers</p>
                                <p className="text-2xl font-bold text-slate-900">{users.filter(u => u.role === 'Manager').length}</p>
                            </div>
                            <div className="h-12 w-12 bg-purple-50 rounded-xl border border-purple-100 flex items-center justify-center">
                                <Users className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search Bar */}
            <div className="flex gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input 
                        placeholder="Search by name, email, or department..." 
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50/50 hover:bg-slate-50/80">
                            <TableHead className="w-[250px] font-semibold text-slate-600">User</TableHead>
                            <TableHead className="font-semibold text-slate-600">Role</TableHead>
                            <TableHead className="font-semibold text-slate-600">Department</TableHead>
                            <TableHead className="font-semibold text-slate-600">Status</TableHead>
                            <TableHead className="font-semibold text-slate-600">Last Login</TableHead>
                            <TableHead className="text-right font-semibold text-slate-600">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id} className="hover:bg-slate-50/50">
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900">{user.name}</p>
                                            <p className="text-xs text-slate-500">{user.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={getRoleBadge(user.role) as any}>
                                        {user.role}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-slate-600">{user.department}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className={`h-2 w-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-slate-300'}`} />
                                        <span className="text-sm">{user.status}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-slate-500 text-sm">{user.lastLogin}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-1">
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                            onClick={() => handleEdit(user)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Create User Modal */}
            <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
                <DialogContent className="sm:max-w-[500px] bg-white">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl">
                            <UserPlus className="h-5 w-5 text-blue-600" />
                            Add New User
                        </DialogTitle>
                        <DialogDescription>
                            Create a new user account with appropriate role and permissions
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                            <Input 
                                id="name"
                                placeholder="Ahmed Rashid"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                            <Input 
                                id="email"
                                type="email"
                                placeholder="ahmed.rashid@finance.gov.ae"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="role">Role <span className="text-red-500">*</span></Label>
                                <select 
                                    id="role"
                                    className="flex h-10 w-full items-center justify-between rounded-[6px] border-2 border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                >
                                    <option value="Staff">Staff</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="department">Department <span className="text-red-500">*</span></Label>
                                <select 
                                    id="department"
                                    className="flex h-10 w-full items-center justify-between rounded-[6px] border-2 border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                >
                                    <option value="">Select Department</option>
                                    <option value="Finance">Finance</option>
                                    <option value="HR">Human Resources</option>
                                    <option value="IT">Information Technology</option>
                                    <option value="Legal">Legal Affairs</option>
                                    <option value="Operations">Operations</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Initial Password <span className="text-red-500">*</span></Label>
                            <Input 
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <p className="text-xs text-slate-500">User will be prompted to change password on first login</p>
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreate} className="bg-blue-900 hover:bg-blue-800">
                            Create User
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit User Modal */}
            <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
                <DialogContent className="sm:max-w-[500px] bg-white">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl">
                            <Edit className="h-5 w-5 text-blue-600" />
                            Edit User
                        </DialogTitle>
                        <DialogDescription>
                            Update user information and permissions
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-name">Full Name</Label>
                            <Input 
                                id="edit-name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="edit-email">Email Address</Label>
                            <Input 
                                id="edit-email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-role">Role</Label>
                                <select 
                                    id="edit-role"
                                    className="flex h-10 w-full items-center justify-between rounded-[6px] border-2 border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                >
                                    <option value="Staff">Staff</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit-department">Department</Label>
                                <select 
                                    id="edit-department"
                                    className="flex h-10 w-full items-center justify-between rounded-[6px] border-2 border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                >
                                    <option value="Finance">Finance</option>
                                    <option value="HR">Human Resources</option>
                                    <option value="IT">Information Technology</option>
                                    <option value="Legal">Legal Affairs</option>
                                    <option value="Operations">Operations</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleUpdate} className="bg-blue-900 hover:bg-blue-800">
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
