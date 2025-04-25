// pages/api/user/profile.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get session token from cookie
    const sessionToken = req.cookies.m2you_session

    if (!sessionToken) {
      return res.status(401).json({ error: 'Not authenticated' })
    }

    // Get user from session
    const { data: session, error: sessionError } = await supabase
      .from('sessions')
      .select('user_id')
      .eq('token', sessionToken)
      .single()

    if (sessionError || !session) {
      return res.status(401).json({ error: 'Invalid session' })
    }

    const { name } = req.body

    if (!name) {
      return res.status(400).json({ error: 'Name is required' })
    }

    // Update user profile
    const { error: updateError } = await supabase
      .from('users')
      .update({
        name,
        updated_at: new Date().toISOString(),
      })
      .eq('id', session.user_id)

    if (updateError) {
      return res.status(500).json({ error: 'Failed to update profile' })
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Profile updated successfully' 
    })
  } catch (error) {
    console.error('Profile update error:', error)
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to update profile' 
    })
  }
}