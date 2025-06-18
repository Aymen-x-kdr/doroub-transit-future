
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Signup = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { signup } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: t('error'),
        description: t('passwordsDontMatch'),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await signup(name, email, password);
      toast({
        title: t('success'),
        description: t('welcome'),
      });
      navigate('/home');
    } catch (error) {
      toast({
        title: t('error'),
        description: t('signupFailed'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-doroub-gradient flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">دروب</h1>
          <h2 className="text-2xl font-bold text-white mb-4">DOROUB</h2>
          <p className="text-white/80">{t('signup')}</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-xl">
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-white/90 mb-2 block">
                {t('name')}
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-xl"
                placeholder={t('yourFullName')}
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-white/90 mb-2 block">
                {t('email')}
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-xl"
                placeholder={t('yourEmail')}
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-white/90 mb-2 block">
                {t('password')}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-xl"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-white/90 mb-2 block">
                {t('confirmPassword')}
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-xl"
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-doroub-blue hover:bg-white/90 font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105"
            >
              {isLoading ? t('creatingAccount') : t('signup')}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-white/80">
              {t('alreadyHaveAccount')}{' '}
              <Link to="/login" className="text-white font-semibold hover:underline">
                {t('login')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
