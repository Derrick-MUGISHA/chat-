
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nlicxioalkoquoaijmkl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5saWN4aW9hbGtvcXVvYWlqbWtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1NzQxMTgsImV4cCI6MjA2MTE1MDExOH0.OVMJdrdklK2H1LjCdH-JnRxlZ-ZYXsLQrDXUIvZZl_A'

export const supabase = createClient(supabaseUrl, supabaseKey)