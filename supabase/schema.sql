-- ProdSafe Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- Create users table (extends auth.users)
create table public.users (
  id uuid references auth.users(id) on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  plan text not null default 'free' check (plan in ('free', 'pro')),
  scans_remaining integer not null default 3,
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Create scans table
create table public.scans (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  project_name text not null,
  file_size integer,
  scan_type text not null check (scan_type in ('upload', 'github', 'url')),
  status text not null default 'pending' check (status in ('pending', 'scanning', 'completed', 'failed')),
  started_at timestamp with time zone default now() not null,
  completed_at timestamp with time zone,
  vulnerability_count jsonb default '{"critical": 0, "high": 0, "medium": 0, "low": 0}'::jsonb,
  report_url text,
  created_at timestamp with time zone default now() not null
);

-- Create vulnerabilities table
create table public.vulnerabilities (
  id uuid default uuid_generate_v4() primary key,
  scan_id uuid references public.scans(id) on delete cascade not null,
  severity text not null check (severity in ('critical', 'high', 'medium', 'low')),
  type text not null,
  title text not null,
  description text not null,
  file_path text,
  line_number integer,
  code_snippet text,
  fix_description text not null,
  ai_fix_prompt text not null,
  cve_id text,
  created_at timestamp with time zone default now() not null
);

-- Create subscription_tiers table for pricing plans
create table public.subscription_tiers (
  id text primary key,
  name text not null,
  price integer not null, -- price in cents
  scans_per_month integer not null, -- -1 for unlimited
  features jsonb not null default '[]'::jsonb,
  stripe_price_id text
);

-- Insert default subscription tiers
insert into public.subscription_tiers (id, name, price, scans_per_month, features, stripe_price_id) values
('free', 'Free', 0, 3, '["Basic vulnerability detection", "Email support", "PDF reports", "3 scans per month"]'::jsonb, null),
('pro', 'Pro', 2900, -1, '["Advanced vulnerability detection", "Priority support", "API access", "Unlimited scans", "Custom integrations", "Detailed analytics"]'::jsonb, null);

-- Enable Row Level Security (RLS)
alter table public.users enable row level security;
alter table public.scans enable row level security;
alter table public.vulnerabilities enable row level security;
alter table public.subscription_tiers enable row level security;

-- Create RLS policies for users table
create policy "Users can view own profile" on public.users
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.users
  for insert with check (auth.uid() = id);

-- Create RLS policies for scans table
create policy "Users can view own scans" on public.scans
  for select using (auth.uid() = user_id);

create policy "Users can insert own scans" on public.scans
  for insert with check (auth.uid() = user_id);

create policy "Users can update own scans" on public.scans
  for update using (auth.uid() = user_id);

-- Create RLS policies for vulnerabilities table
create policy "Users can view vulnerabilities from own scans" on public.vulnerabilities
  for select using (
    exists (
      select 1 from public.scans
      where scans.id = vulnerabilities.scan_id
      and scans.user_id = auth.uid()
    )
  );

create policy "Users can insert vulnerabilities for own scans" on public.vulnerabilities
  for insert with check (
    exists (
      select 1 from public.scans
      where scans.id = vulnerabilities.scan_id
      and scans.user_id = auth.uid()
    )
  );

-- Public access to subscription tiers for pricing page
create policy "Anyone can view subscription tiers" on public.subscription_tiers
  for select using (true);

-- Create indexes for better performance
create index idx_users_email on public.users(email);
create index idx_users_stripe_customer on public.users(stripe_customer_id);
create index idx_scans_user_id on public.scans(user_id);
create index idx_scans_status on public.scans(status);
create index idx_scans_created_at on public.scans(created_at desc);
create index idx_vulnerabilities_scan_id on public.vulnerabilities(scan_id);
create index idx_vulnerabilities_severity on public.vulnerabilities(severity);

-- Create function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger to automatically update updated_at
create trigger on_users_updated
  before update on public.users
  for each row execute procedure public.handle_updated_at();

-- Create function to automatically create user profile after signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger to create user profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Grant necessary permissions
grant usage on schema public to anon, authenticated;
grant all on all tables in schema public to authenticated;
grant all on all sequences in schema public to authenticated;