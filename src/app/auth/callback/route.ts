import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) return NextResponse.redirect(new URL('/login?error=oauth', url.origin));

  const supabase = await createClient();
  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
  if (exchangeError) return NextResponse.redirect(new URL('/login?error=oauth', url.origin));

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return NextResponse.redirect(new URL('/login?error=oauth', url.origin));

  const { data: profile } = await supabase
    .from('profiles')
    .select('onboarding_completed')
    .eq('id', userData.user.id)
    .maybeSingle();

  const destination = profile?.onboarding_completed ? '/dashboard' : '/onboarding';
  return NextResponse.redirect(new URL(destination, url.origin));
}
