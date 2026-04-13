# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Supabase Integration

This project uses Supabase for database and authentication.

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a Supabase project at [supabase.com](https://supabase.com).

3. Copy your project URL and anon key from the Supabase dashboard.

4. Create a `.env.local` file in the root directory and add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. The Supabase client is available at `src/lib/supabase.ts` for use in your components.

# analogheal
