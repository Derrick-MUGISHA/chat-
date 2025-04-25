// pages/api/auth/verify.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { phoneNumber, verificationCode, deviceId, deviceName, publicKey } = req.body

    if (!phoneNumber || !verificationCode || !deviceId || !publicKey) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Verify the code
    const { data: verificationData, error: verificationError } = await supabase
      .from('verification_codes')
      .select('*')
      .eq('phone_number', phoneNumber)
      .eq('code', verificationCode)
      .single()

    if (verificationError || !verificationData) {
      return res.status(400).json({ error: 'Invalid verification code' })
    }

    // Check if code is expired
    if (new Date(verificationData.expires_at) < new Date()) {
      return res.status(400).json({ error: 'Verification code has expired' })
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('phone_number', phoneNumber)
      .single()

    let userId: string
    let isNewUser = false

    if (!existingUser) {
      // Create new user
      const { data: newUser, error: createUserError } = await supabase
        .from('users')
        .insert({
          phone_number: phoneNumber,
          created_at: new Date().toISOString(),
        })
        .select('id')
        .single()

      if (createUserError || !newUser) {
        return res.status(500).json({ error: 'Failed to create user account' })
      }

      userId = newUser.id
      isNewUser = true
    } else {
      userId = existingUser.id
    }

    // Register the device
    const { error: deviceError } = await supabase
      .from('devices')
      .insert({
        user_id: userId,
        device_id: deviceId,
        device_name: deviceName || 'Unknown Device',
        public_key: publicKey,
        created_at: new Date().toISOString(),
      })

    if (deviceError) {
      return res.status(500).json({ error: 'Failed to register device' })
    }

    // Generate session token
    const sessionToken = uuidv4()
    
    // Store session
    const { error: sessionError } = await supabase
      .from('sessions')
      .insert({
        user_id: userId,
        device_id: deviceId,
        token: sessionToken,
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      })

    if (sessionError) {
      return res.status(500).json({ error: 'Failed to create session' })
    }

    // Set the session token as a cookie
    res.setHeader('Set-Cookie', `m2you_session=${sessionToken}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${30 * 24 * 60 * 60}`);

    // Delete the verification code
    await supabase
      .from('verification_codes')
      .delete()
      .eq('phone_number', phoneNumber)

    return res.status(200).json({ 
      success: true, 
      isNewUser,
      userId
    })
  } catch (error) {
    console.error('Verification error:', error)
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to verify code' 
    })
  }
}