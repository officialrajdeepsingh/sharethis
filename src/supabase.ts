import { createClient } from '@supabase/supabase-js'
import { Database } from 'lib/database.types'

// export const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// )

export const supabase = createClient<Database>(
  "https://gpvqirgoamynyuvazcup.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwdnFpcmdvYW15bnl1dmF6Y3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM2MTMxMjQsImV4cCI6MTk4OTE4OTEyNH0.vyqjV7Cdsy76rpCk4Pq6KI9R3F3uV7Tt5zYlUyQfbhI"
)

