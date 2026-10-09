-- Run once in the Supabase SQL editor. Only manually approved auth users can write.
create table if not exists public.admin_users (user_id uuid primary key references auth.users(id) on delete cascade);
alter table public.admin_users enable row level security;
create policy "admin can see own membership" on public.admin_users for select to authenticated using (user_id = (select auth.uid()));
grant select on public.admin_users to authenticated;
revoke insert, update, delete on public.admin_users from anon, authenticated;

create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('puppy','post','story','award')),
  slug text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  published boolean not null default false,
  sort_index integer not null default 0,
  payload jsonb not null check (jsonb_typeof(payload) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(kind, slug)
);
alter table public.content_items enable row level security;
create policy "published content is readable" on public.content_items for select to anon, authenticated using (published = true);
create policy "approved admins manage content" on public.content_items for all to authenticated
 using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
 with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));
grant select on public.content_items to anon;
grant select, insert, update, delete on public.content_items to authenticated;
create or replace function public.touch_content_updated_at() returns trigger language plpgsql set search_path = public as $$ begin new.updated_at = clock_timestamp(); return new; end; $$;
create trigger content_updated before update on public.content_items for each row execute function public.touch_content_updated_at();

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values ('lumo-media','lumo-media',true,5242880,array['image/webp','image/jpeg','image/png']) on conflict (id) do nothing;
create policy "admins upload media" on storage.objects for insert to authenticated with check (bucket_id = 'lumo-media' and exists (select 1 from public.admin_users where user_id = (select auth.uid())));
create policy "admins inspect media" on storage.objects for select to authenticated using (bucket_id = 'lumo-media' and exists (select 1 from public.admin_users where user_id = (select auth.uid())));
-- Media is public by design. Do not upload private documents or customer personal data.
-- No automatic user enrolment, no public write policy, no service-role key in the app.
-- After creating an auth user in Authentication > Users, add their UUID manually:
-- insert into public.admin_users(user_id) values ('YOUR-USER-UUID');
