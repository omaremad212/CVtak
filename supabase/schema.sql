-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- CVs table
create table if not exists public.cvs (
  id uuid default uuid_generate_v4() primary key,
  user_id text not null,
  title text not null,
  content text not null,
  form_data jsonb not null default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Subscriptions table
create table if not exists public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id text not null unique,
  stripe_subscription_id text,
  stripe_customer_id text,
  status text not null default 'inactive',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes
create index if not exists cvs_user_id_idx on public.cvs(user_id);
create index if not exists subscriptions_user_id_idx on public.subscriptions(user_id);
create index if not exists subscriptions_status_idx on public.subscriptions(status);

-- RLS (Row Level Security)
alter table public.cvs enable row level security;
alter table public.subscriptions enable row level security;

-- Policies for CVs: only service role can access (server-side only)
create policy "Service role can do everything on cvs"
  on public.cvs
  for all
  using (true)
  with check (true);

-- Policies for subscriptions: only service role can access
create policy "Service role can do everything on subscriptions"
  on public.subscriptions
  for all
  using (true)
  with check (true);

-- Updated at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger cvs_updated_at
  before update on public.cvs
  for each row execute procedure public.handle_updated_at();

create trigger subscriptions_updated_at
  before update on public.subscriptions
  for each row execute procedure public.handle_updated_at();
