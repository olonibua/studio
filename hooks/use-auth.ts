import { useAuthStore } from '@/store/auth-store';

export const useAuth = () => {
  const {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth,
    updateProfile,
    setUser,
    setLoading,
  } = useAuthStore();

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth,
    updateProfile,
    setUser,
    setLoading,
    // Computed values
    isLoggedIn: isAuthenticated && !!user,
    isBuyer: user?.role === 'buyer',
    isSeller: user?.role === 'seller',
    isAdmin: user?.role === 'admin',
    userInitials: user?.name 
      ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() 
      : '',
  };
}; 