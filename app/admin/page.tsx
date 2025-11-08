'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KeyRound, LogIn, Scissors } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useSiteSettings } from '@/lib/hooks/use-settings';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { settings, isLoading: isLoadingSettings } = useSiteSettings();

  const handleLogin = async () => {
    if (!password) {
      setError('Lütfen şifrenizi girin.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Giriş başarısız');
      }

      if (result.authenticated) {
        sessionStorage.setItem('isAdminAuthenticated', 'true');
        toast({
          title: 'Giriş Başarılı',
          description: 'Yönetici paneline yönlendiriliyorsunuz.',
        });
        router.push('/admin/dashboard');
      } else {
        setError('Hatalı şifre. Lütfen tekrar deneyin.');
      }
    } catch (err: any) {
      setError(err.message || 'Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
      toast({
        title: 'Hata',
        description: err.message || 'Giriş yapılamadı.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
       <div
        className="absolute inset-0 h-full w-full bg-background -z-10"
        style={{backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)' , backgroundSize: '20px 20px'}}
      />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-sm shadow-2xl shadow-primary/10">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center gap-2 mb-2">
              <Scissors className="text-primary h-7 w-7"/>
              <h1 className="text-2xl font-bold">{isLoadingSettings ? '...' : settings?.brandName}</h1>
            </div>
            <CardTitle className="text-xl">Yönetici Paneli</CardTitle>
            <CardDescription>Lütfen devam etmek için şifrenizi girin.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="********"
                  className="pl-10"
                />
              </div>
            </div>
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            <Button onClick={handleLogin} className="w-full" disabled={isLoading || isLoadingSettings}>
              <LogIn className="mr-2 h-4 w-4" />
              {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
