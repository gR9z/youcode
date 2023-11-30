'use client';

import { signOut } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/loader';

const LogoutButton = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      await signOut();
    },
  });

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        mutation.mutate();
      }}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? (
        <Loader className="mr-2" size={12} />
      ) : (
        <LogOut className="mr-2" size={12} />
      )}
      Logout
    </Button>
  );
};

export default LogoutButton;
