import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qjrirsvrxlemamvjhdwz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqcmlyc3ZyeGxlbWFtdmpoZHd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjgwMTcsImV4cCI6MjA3MzYwNDAxN30.kB9RtLF_AkJkq2rZuXjUcHvjFTr_n2RybsTqSQu_Bbs'

export const supabase = createClient(supabaseUrl, supabaseKey)