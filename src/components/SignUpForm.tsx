'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
  ILoginPayload,
  createUser,
  getUserState,
} from '@/redux/features/user/userSlice';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function SignupForm({ className, ...props }: UserAuthFormProps) {
  const { isLoading, error, isAuthenticate } = useSelector(getUserState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: ILoginPayload) => {
    dispatch(createUser(data));
  };

  React.useEffect(() => {
    if (isAuthenticate) navigate('/');
  }, [isAuthenticate]);
  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register('email', { required: true })}
            />
            <Input
              id="password"
              placeholder="your password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              {...register('password', { required: true })}
            />
            {/* <Input
              id="confirm-password"
              placeholder="confirm password"
              type="confirm-password"
              autoCapitalize="none"
              autoCorrect="off"
              {...register('confirmPassword', { required: true })}
            /> */}
          </div>
          <Button disabled={isLoading}>
            {isLoading && <p>loading</p>}
            Create Account
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <p className="text-red-600">{error}</p>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? <p>loading</p> : <p>GitHub</p>}
      </Button>
    </div>
  );
}
