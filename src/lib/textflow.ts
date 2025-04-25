
import axios from 'axios'

const TEXTFLOW_API_KEY = 'TtZ2MGHjE87c4DumDUjWLORSB97jDnpBNG5IvkxjnycAiLDSYS6flaZ9XO96WRBq'

export async function sendVerificationCode(phoneNumber: string): Promise<string> {
  try {
    // Generate a random 6-digit code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Send SMS via TextFlow API
    const response = await axios.post(
      'https://api.textflow.me/messages',
      {
        phone_number: phoneNumber,
        message: `Your M2 You verification code is: ${verificationCode}`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TEXTFLOW_API_KEY}`,
        },
      }
    )
    
    if (response.status !== 200) {
      throw new Error('Failed to send verification code')
    }
    
    return verificationCode
  } catch (error) {
    console.error('TextFlow API error:', error)
    throw new Error('Failed to send verification code')
  }
}