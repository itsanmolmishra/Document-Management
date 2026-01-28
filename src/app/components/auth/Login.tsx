import React, { useState } from 'react';
import { useApp, UserRole } from '../../context/AppContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Shield, Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export const Login = () => {
  const { login, t, toggleLanguage, language } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('staff');
  const [showMFA, setShowMFA] = useState(false);

  const handleLogin = () => {
    setShowMFA(true);
  };

  const handleVerify = () => {
    login(selectedRole);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="absolute top-4 right-4">
         <Button variant="ghost" size="sm" onClick={toggleLanguage} className="gap-2">
            <Globe className="h-4 w-4" />
            {language === 'en' ? 'العربية' : 'English'}
         </Button>
      </div>

      <div className="mb-8 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-12 w-12 text-blue-900" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{t('auth.title')}</h1>
        <p className="text-slate-500 font-medium">{t('auth.subtitle')}</p>
      </div>

      <Card className="w-full max-w-md shadow-xl border-slate-200">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">
             {showMFA ? "Verify Identity" : t('auth.signin')}
          </CardTitle>
          <CardDescription>
            {showMFA ? "Enter the code sent to your mobile" : "Secure access for government personnel"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showMFA ? (
            <>
              <div className="space-y-2">
                <Label>{t('auth.username')}</Label>
                <Input placeholder="ID-XXXXX" />
              </div>
              <div className="space-y-2">
                <Label>{t('auth.password')}</Label>
                <Input type="password" />
              </div>
              
              {/* Role Switcher for Demo Purposes */}
              <div className="space-y-2 pt-2">
                <Label className="text-xs text-slate-400 uppercase">Select Role (Demo Only)</Label>
                <Select value={selectedRole} onValueChange={(v) => setSelectedRole(v as UserRole)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="staff">{t('role.staff')}</SelectItem>
                    <SelectItem value="manager">{t('role.manager')}</SelectItem>
                    <SelectItem value="records">{t('role.records')}</SelectItem>
                    <SelectItem value="compliance">{t('role.compliance')}</SelectItem>
                    <SelectItem value="admin">{t('role.admin')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          ) : (
            <div className="space-y-2">
                <Label>One-Time Password</Label>
                <Input placeholder="000000" className="text-center text-2xl tracking-widest" maxLength={6} />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          {!showMFA ? (
             <>
                <Button className="w-full bg-blue-900 hover:bg-blue-800" onClick={handleLogin}>
                    {t('auth.signin')}
                </Button>
                <div className="relative w-full py-2">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200" /></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-500">OR</span></div>
                </div>
                <Button variant="outline" className="w-full" onClick={handleLogin}>
                   <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Dubai_Government_Logo.png/640px-Dubai_Government_Logo.png" className="h-4 w-auto mr-2 grayscale opacity-50" alt="" />
                   {t('auth.uaepass')}
                </Button>
             </>
          ) : (
              <Button className="w-full bg-blue-900" onClick={handleVerify}>
                  Verify & Access
              </Button>
          )}
        </CardFooter>
      </Card>

      <p className="mt-8 text-xs text-slate-400 max-w-sm text-center">
        {t('auth.footer')}
      </p>
    </div>
  );
};
