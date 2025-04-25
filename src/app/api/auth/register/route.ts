// pages/api/auth/register.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'
import { sendVerificationCode } from '@/lib/textflow'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { phoneNumber } = req.body

    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' })
    }

    // Check if this phone number already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('phone_number', phoneNumber)
      .single()

    // Generate and send verification code
    const verificationCode = await sendVerificationCode(phoneNumber)

    // Store verification code in the verification_codes table with expiration
    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + 10) // Code expires in 10 minutes

    const { error } = await supabase
      .from('verification_codes')
      .upsert({
        phone_number: phoneNumber,
        code: verificationCode,
        expires_at: expiresAt.toISOString(),
      })

    if (error) {
      console.error('Database error:', error)
      return res.status(500).json({ error: 'Failed to save verification code' })
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Verification code sent',
      isExistingUser: !!existingUser
    })
  } catch (error) {
    console.error('Registration error:', error)
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to send verification code' 
    })
  }
}