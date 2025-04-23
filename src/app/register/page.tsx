"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MessageSquare, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { generateKeyPair } from "@/lib/encryption"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Check, ChevronsUpDown } from "lucide-react"

// Comprehensive country codes with flags
const countryCodes = [
  // Same country codes as in the Login component
    { code: "+93", country: "AF", flag: "🇦🇫", name: "Afghanistan" },
    { code: "+355", country: "AL", flag: "🇦🇱", name: "Albania" },
    { code: "+213", country: "DZ", flag: "🇩🇿", name: "Algeria" },
    { code: "+376", country: "AD", flag: "🇦🇩", name: "Andorra" },
    { code: "+244", country: "AO", flag: "🇦🇴", name: "Angola" },
    { code: "+1", country: "AG", flag: "🇦🇬", name: "Antigua and Barbuda" },
    { code: "+54", country: "AR", flag: "🇦🇷", name: "Argentina" },
    { code: "+374", country: "AM", flag: "🇦🇲", name: "Armenia" },
    { code: "+61", country: "AU", flag: "🇦🇺", name: "Australia" },
    { code: "+43", country: "AT", flag: "🇦🇹", name: "Austria" },
    { code: "+994", country: "AZ", flag: "🇦🇿", name: "Azerbaijan" },
    { code: "+1", country: "BS", flag: "🇧🇸", name: "Bahamas" },
    { code: "+973", country: "BH", flag: "🇧🇭", name: "Bahrain" },
    { code: "+880", country: "BD", flag: "🇧🇩", name: "Bangladesh" },
    { code: "+1", country: "BB", flag: "🇧🇧", name: "Barbados" },
    { code: "+375", country: "BY", flag: "🇧🇾", name: "Belarus" },
    { code: "+32", country: "BE", flag: "🇧🇪", name: "Belgium" },
    { code: "+501", country: "BZ", flag: "🇧🇿", name: "Belize" },
    { code: "+229", country: "BJ", flag: "🇧🇯", name: "Benin" },
    { code: "+975", country: "BT", flag: "🇧🇹", name: "Bhutan" },
    { code: "+591", country: "BO", flag: "🇧🇴", name: "Bolivia" },
    { code: "+387", country: "BA", flag: "🇧🇦", name: "Bosnia and Herzegovina" },
    { code: "+267", country: "BW", flag: "🇧🇼", name: "Botswana" },
    { code: "+55", country: "BR", flag: "🇧🇷", name: "Brazil" },
    { code: "+673", country: "BN", flag: "🇧🇳", name: "Brunei" },
    { code: "+359", country: "BG", flag: "🇧🇬", name: "Bulgaria" },
    { code: "+226", country: "BF", flag: "🇧🇫", name: "Burkina Faso" },
    { code: "+257", country: "BI", flag: "🇧🇮", name: "Burundi" },
    { code: "+855", country: "KH", flag: "🇰🇭", name: "Cambodia" },
    { code: "+237", country: "CM", flag: "🇨🇲", name: "Cameroon" },
    { code: "+1", country: "CA", flag: "🇨🇦", name: "Canada" },
    { code: "+238", country: "CV", flag: "🇨🇻", name: "Cape Verde" },
    { code: "+236", country: "CF", flag: "🇨🇫", name: "Central African Republic" },
    { code: "+235", country: "TD", flag: "🇹🇩", name: "Chad" },
    { code: "+56", country: "CL", flag: "🇨🇱", name: "Chile" },
    { code: "+86", country: "CN", flag: "🇨🇳", name: "China" },
    { code: "+57", country: "CO", flag: "🇨🇴", name: "Colombia" },
    { code: "+269", country: "KM", flag: "🇰🇲", name: "Comoros" },
    { code: "+242", country: "CG", flag: "🇨🇬", name: "Congo" },
    { code: "+243", country: "CD", flag: "🇨🇩", name: "Congo, Democratic Republic of the" },
    { code: "+506", country: "CR", flag: "🇨🇷", name: "Costa Rica" },
    { code: "+225", country: "CI", flag: "🇨🇮", name: "Côte d'Ivoire" },
    { code: "+385", country: "HR", flag: "🇭🇷", name: "Croatia" },
    { code: "+53", country: "CU", flag: "🇨🇺", name: "Cuba" },
    { code: "+357", country: "CY", flag: "🇨🇾", name: "Cyprus" },
    { code: "+420", country: "CZ", flag: "🇨🇿", name: "Czech Republic" },
    { code: "+45", country: "DK", flag: "🇩🇰", name: "Denmark" },
    { code: "+253", country: "DJ", flag: "🇩🇯", name: "Djibouti" },
    { code: "+1", country: "DM", flag: "🇩🇲", name: "Dominica" },
    { code: "+1", country: "DO", flag: "🇩🇴", name: "Dominican Republic" },
    { code: "+670", country: "TL", flag: "🇹🇱", name: "East Timor" },
    { code: "+593", country: "EC", flag: "🇪🇨", name: "Ecuador" },
    { code: "+20", country: "EG", flag: "🇪🇬", name: "Egypt" },
    { code: "+503", country: "SV", flag: "🇸🇻", name: "El Salvador" },
    { code: "+240", country: "GQ", flag: "🇬🇶", name: "Equatorial Guinea" },
    { code: "+291", country: "ER", flag: "🇪🇷", name: "Eritrea" },
    { code: "+372", country: "EE", flag: "🇪🇪", name: "Estonia" },
    { code: "+268", country: "SZ", flag: "🇸🇿", name: "Eswatini" },
    { code: "+251", country: "ET", flag: "🇪🇹", name: "Ethiopia" },
    { code: "+679", country: "FJ", flag: "🇫🇯", name: "Fiji" },
    { code: "+358", country: "FI", flag: "🇫🇮", name: "Finland" },
    { code: "+33", country: "FR", flag: "🇫🇷", name: "France" },
    { code: "+241", country: "GA", flag: "🇬🇦", name: "Gabon" },
    { code: "+220", country: "GM", flag: "🇬🇲", name: "Gambia" },
    { code: "+995", country: "GE", flag: "🇬🇪", name: "Georgia" },
    { code: "+49", country: "DE", flag: "🇩🇪", name: "Germany" },
    { code: "+233", country: "GH", flag: "🇬🇭", name: "Ghana" },
    { code: "+30", country: "GR", flag: "🇬🇷", name: "Greece" },
    { code: "+1", country: "GD", flag: "🇬🇩", name: "Grenada" },
    { code: "+502", country: "GT", flag: "🇬🇹", name: "Guatemala" },
    { code: "+224", country: "GN", flag: "🇬🇳", name: "Guinea" },
    { code: "+245", country: "GW", flag: "🇬🇼", name: "Guinea-Bissau" },
    { code: "+592", country: "GY", flag: "🇬🇾", name: "Guyana" },
    { code: "+509", country: "HT", flag: "🇭🇹", name: "Haiti" },
    { code: "+504", country: "HN", flag: "🇭🇳", name: "Honduras" },
    { code: "+852", country: "HK", flag: "🇭🇰", name: "Hong Kong" },
    { code: "+36", country: "HU", flag: "🇭🇺", name: "Hungary" },
    { code: "+354", country: "IS", flag: "🇮🇸", name: "Iceland" },
    { code: "+91", country: "IN", flag: "🇮🇳", name: "India" },
    { code: "+62", country: "ID", flag: "🇮🇩", name: "Indonesia" },
    { code: "+98", country: "IR", flag: "🇮🇷", name: "Iran" },
    { code: "+964", country: "IQ", flag: "🇮🇶", name: "Iraq" },
    { code: "+353", country: "IE", flag: "🇮🇪", name: "Ireland" },
    { code: "+972", country: "IL", flag: "🇮🇱", name: "Israel" },
    { code: "+39", country: "IT", flag: "🇮🇹", name: "Italy" },
    { code: "+1", country: "JM", flag: "🇯🇲", name: "Jamaica" },
    { code: "+81", country: "JP", flag: "🇯🇵", name: "Japan" },
    { code: "+962", country: "JO", flag: "🇯🇴", name: "Jordan" },
    { code: "+7", country: "KZ", flag: "🇰🇿", name: "Kazakhstan" },
    { code: "+254", country: "KE", flag: "🇰🇪", name: "Kenya" },
    { code: "+686", country: "KI", flag: "🇰🇮", name: "Kiribati" },
    { code: "+850", country: "KP", flag: "🇰🇵", name: "North Korea" },
    { code: "+82", country: "KR", flag: "🇰🇷", name: "South Korea" },
    { code: "+383", country: "XK", flag: "🇽🇰", name: "Kosovo" },
    { code: "+965", country: "KW", flag: "🇰🇼", name: "Kuwait" },
    { code: "+996", country: "KG", flag: "🇰🇬", name: "Kyrgyzstan" },
    { code: "+856", country: "LA", flag: "🇱🇦", name: "Laos" },
    { code: "+371", country: "LV", flag: "🇱🇻", name: "Latvia" },
    { code: "+961", country: "LB", flag: "🇱🇧", name: "Lebanon" },
    { code: "+266", country: "LS", flag: "🇱🇸", name: "Lesotho" },
    { code: "+231", country: "LR", flag: "🇱🇷", name: "Liberia" },
    { code: "+218", country: "LY", flag: "🇱🇾", name: "Libya" },
    { code: "+423", country: "LI", flag: "🇱🇮", name: "Liechtenstein" },
    { code: "+370", country: "LT", flag: "🇱🇹", name: "Lithuania" },
    { code: "+352", country: "LU", flag: "🇱🇺", name: "Luxembourg" },
    { code: "+853", country: "MO", flag: "🇲🇴", name: "Macau" },
    { code: "+389", country: "MK", flag: "🇲🇰", name: "North Macedonia" },
    { code: "+261", country: "MG", flag: "🇲🇬", name: "Madagascar" },
    { code: "+265", country: "MW", flag: "🇲🇼", name: "Malawi" },
    { code: "+60", country: "MY", flag: "🇲🇾", name: "Malaysia" },
    { code: "+960", country: "MV", flag: "🇲🇻", name: "Maldives" },
    { code: "+223", country: "ML", flag: "🇲🇱", name: "Mali" },
    { code: "+356", country: "MT", flag: "🇲🇹", name: "Malta" },
    { code: "+692", country: "MH", flag: "🇲🇭", name: "Marshall Islands" },
    { code: "+222", country: "MR", flag: "🇲🇷", name: "Mauritania" },
    { code: "+230", country: "MU", flag: "🇲🇺", name: "Mauritius" },
    { code: "+52", country: "MX", flag: "🇲🇽", name: "Mexico" },
    { code: "+691", country: "FM", flag: "🇫🇲", name: "Micronesia" },
    { code: "+373", country: "MD", flag: "🇲🇩", name: "Moldova" },
    { code: "+377", country: "MC", flag: "🇲🇨", name: "Monaco" },
    { code: "+976", country: "MN", flag: "🇲🇳", name: "Mongolia" },
    { code: "+382", country: "ME", flag: "🇲🇪", name: "Montenegro" },
    { code: "+212", country: "MA", flag: "🇲🇦", name: "Morocco" },
    { code: "+258", country: "MZ", flag: "🇲🇿", name: "Mozambique" },
    { code: "+95", country: "MM", flag: "🇲🇲", name: "Myanmar" },
    { code: "+264", country: "NA", flag: "🇳🇦", name: "Namibia" },
    { code: "+674", country: "NR", flag: "🇳🇷", name: "Nauru" },
    { code: "+977", country: "NP", flag: "🇳🇵", name: "Nepal" },
    { code: "+31", country: "NL", flag: "🇳🇱", name: "Netherlands" },
    { code: "+64", country: "NZ", flag: "🇳🇿", name: "New Zealand" },
    { code: "+505", country: "NI", flag: "🇳🇮", name: "Nicaragua" },
    { code: "+227", country: "NE", flag: "🇳🇪", name: "Niger" },
    { code: "+234", country: "NG", flag: "🇳🇬", name: "Nigeria" },
    { code: "+47", country: "NO", flag: "🇳🇴", name: "Norway" },
    { code: "+968", country: "OM", flag: "🇴🇲", name: "Oman" },
    { code: "+92", country: "PK", flag: "🇵🇰", name: "Pakistan" },
    { code: "+680", country: "PW", flag: "🇵🇼", name: "Palau" },
    { code: "+970", country: "PS", flag: "🇵🇸", name: "Palestine" },
    { code: "+507", country: "PA", flag: "🇵🇦", name: "Panama" },
    { code: "+675", country: "PG", flag: "🇵🇬", name: "Papua New Guinea" },
    { code: "+595", country: "PY", flag: "🇵🇾", name: "Paraguay" },
    { code: "+51", country: "PE", flag: "🇵🇪", name: "Peru" },
    { code: "+63", country: "PH", flag: "🇵🇭", name: "Philippines" },
    { code: "+48", country: "PL", flag: "🇵🇱", name: "Poland" },
    { code: "+351", country: "PT", flag: "🇵🇹", name: "Portugal" },
    { code: "+974", country: "QA", flag: "🇶🇦", name: "Qatar" },
    { code: "+40", country: "RO", flag: "🇷🇴", name: "Romania" },
    { code: "+7", country: "RU", flag: "🇷🇺", name: "Russia" },
    { code: "+250", country: "RW", flag: "🇷🇼", name: "Rwanda" },
    { code: "+1", country: "KN", flag: "🇰🇳", name: "Saint Kitts and Nevis" },
    { code: "+1", country: "LC", flag: "🇱🇨", name: "Saint Lucia" },
    { code: "+1", country: "VC", flag: "🇻🇨", name: "Saint Vincent and the Grenadines" },
    { code: "+685", country: "WS", flag: "🇼🇸", name: "Samoa" },
    { code: "+378", country: "SM", flag: "🇸🇲", name: "San Marino" },
    { code: "+239", country: "ST", flag: "🇸🇹", name: "São Tomé and Príncipe" },
    { code: "+966", country: "SA", flag: "🇸🇦", name: "Saudi Arabia" },
    { code: "+221", country: "SN", flag: "🇸🇳", name: "Senegal" },
    { code: "+381", country: "RS", flag: "🇷🇸", name: "Serbia" },
    { code: "+248", country: "SC", flag: "🇸🇨", name: "Seychelles" },
    { code: "+232", country: "SL", flag: "🇸🇱", name: "Sierra Leone" },
    { code: "+65", country: "SG", flag: "🇸🇬", name: "Singapore" },
    { code: "+421", country: "SK", flag: "🇸🇰", name: "Slovakia" },
    { code: "+386", country: "SI", flag: "🇸🇮", name: "Slovenia" },
    { code: "+677", country: "SB", flag: "🇸🇧", name: "Solomon Islands" },
    { code: "+252", country: "SO", flag: "🇸🇴", name: "Somalia" },
    { code: "+27", country: "ZA", flag: "🇿🇦", name: "South Africa" },
    { code: "+211", country: "SS", flag: "🇸🇸", name: "South Sudan" },
    { code: "+34", country: "ES", flag: "🇪🇸", name: "Spain" },
    { code: "+94", country: "LK", flag: "🇱🇰", name: "Sri Lanka" },
    { code: "+249", country: "SD", flag: "🇸🇩", name: "Sudan" },
    { code: "+597", country: "SR", flag: "🇸🇷", name: "Suriname" },
    { code: "+46", country: "SE", flag: "🇸🇪", name: "Sweden" },
    { code: "+41", country: "CH", flag: "🇨🇭", name: "Switzerland" },
    { code: "+963", country: "SY", flag: "🇸🇾", name: "Syria" },
    { code: "+886", country: "TW", flag: "🇹🇼", name: "Taiwan" },
    { code: "+992", country: "TJ", flag: "🇹🇯", name: "Tajikistan" },
    { code: "+255", country: "TZ", flag: "🇹🇿", name: "Tanzania" },
    { code: "+66", country: "TH", flag: "🇹🇭", name: "Thailand" },
    { code: "+228", country: "TG", flag: "🇹🇬", name: "Togo" },
    { code: "+676", country: "TO", flag: "🇹🇴", name: "Tonga" },
    { code: "+1", country: "TT", flag: "🇹🇹", name: "Trinidad and Tobago" },
    { code: "+216", country: "TN", flag: "🇹🇳", name: "Tunisia" },
    { code: "+90", country: "TR", flag: "🇹🇷", name: "Turkey" },
    { code: "+993", country: "TM", flag: "🇹🇲", name: "Turkmenistan" },
    { code: "+688", country: "TV", flag: "🇹🇻", name: "Tuvalu" },
    { code: "+256", country: "UG", flag: "🇺🇬", name: "Uganda" },
    { code: "+380", country: "UA", flag: "🇺🇦", name: "Ukraine" },
    { code: "+971", country: "AE", flag: "🇦🇪", name: "United Arab Emirates" },
    { code: "+44", country: "GB", flag: "🇬🇧", name: "United Kingdom" },
    { code: "+1", country: "US", flag: "🇺🇸", name: "United States" },
    { code: "+598", country: "UY", flag: "🇺🇾", name: "Uruguay" },
    { code: "+998", country: "UZ", flag: "🇺🇿", name: "Uzbekistan" },
    { code: "+678", country: "VU", flag: "🇻🇺", name: "Vanuatu" },
    { code: "+379", country: "VA", flag: "🇻🇦", name: "Vatican City" },
    { code: "+58", country: "VE", flag: "🇻🇪", name: "Venezuela" },
    { code: "+84", country: "VN", flag: "🇻🇳", name: "Vietnam" },
    { code: "+967", country: "YE", flag: "🇾🇪", name: "Yemen" },
    { code: "+260", country: "ZM", flag: "🇿🇲", name: "Zambia" },
    { code: "+263", country: "ZW", flag: "🇿🇼", name: "Zimbabwe" },
    { code: "+672", country: "AQ", flag: "🇦🇶", name: "Antarctica" },
]

interface Country {
  code: string;
  country: string;
  flag: string;
  name: string;
}

export default function Register() {
  const [step, setStep] = useState<"phone" | "verification" | "profile">("phone")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [countryCode, setCountryCode] = useState("")
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [verificationCode, setVerificationCode] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Detect user's country on component mount
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        const countryCode = data.country_code
        if (countryCode) {
          const foundCountry = countryCodes.find(c => c.country === countryCode)
          if (foundCountry) {
            setSelectedCountry(foundCountry)
            setCountryCode(foundCountry.code)
          } else {
            // Default to US if country not found
            const defaultCountry = countryCodes.find(c => c.country === "US") ?? null
            setSelectedCountry(defaultCountry)
            setCountryCode(defaultCountry?.code || "+1")
          }
        }
      } catch (error) {
        console.error("Failed to detect country:", error)
        // Default to US if detection fails
        const defaultCountry = countryCodes.find(c => c.country === "US") || null
        setSelectedCountry(defaultCountry)
        setCountryCode(defaultCountry?.code || "+1")
      }
    }
    detectCountry()
  }, [])

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const fullPhoneNumber = countryCode + phoneNumber.replace(/^0+/, '')
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: fullPhoneNumber }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send verification code")
      }

      toast({
        title: "Verification code sent",
        description: "Please check your phone for the verification code.",
      })

      setStep("verification")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send verification code",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Generate key pair for end-to-end encryption
      const { publicKey, privateKey } = await generateKeyPair()

      // Store private key securely in local storage
      localStorage.setItem("privateKey", privateKey)

      // Generate a unique device ID
      const deviceId = crypto.randomUUID()
      localStorage.setItem("deviceId", deviceId)

      const fullPhoneNumber = countryCode + phoneNumber.replace(/^0+/, '')
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: fullPhoneNumber,
          verificationCode,
          deviceId,
          deviceName: navigator.userAgent,
          publicKey,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to verify code")
      }

      if (data.isNewUser) {
        setStep("profile")
      } else {
        router.push("/chat")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to verify code",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile")
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })

      router.push("/chat")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update profile",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 relative overflow-hidden">
      {/* Premium SVG Background */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0D9488" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9A826" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#0D9488" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {/* Background */}
          <rect x="0" y="0" width="800" height="600" fill="#111827" />
          {/* Premium Background Elements */}
          <g className="luxury-pattern" opacity="0.05">
            <path d="M0,0 L800,0 L800,600 L0,600 Z" fill="url(#goldGradient)" />
            <path d="M0,150 L800,150" stroke="#F9A826" strokeWidth="0.5" strokeDasharray="4,8" />
            <path d="M0,300 L800,300" stroke="#F9A826" strokeWidth="0.5" strokeDasharray="4,8" />
            <path d="M0,450 L800,450" stroke="#F9A826" strokeWidth="0.5" strokeDasharray="4,8" />
            <path d="M150,0 L150,600" stroke="#F9A826" strokeWidth="0.5" strokeDasharray="4,8" />
            <path d="M400,0 L400,600" stroke="#F9A826" strokeWidth="0.5" strokeDasharray="4,8" />
            <path d="M650,0 L650,600" stroke="#F9A826" strokeWidth="0.5" strokeDasharray="4,8" />
          </g>
          {/* Animated Background Elements */}
          <g className="background-elements">
            <circle className="moving-circle" cx="100" cy="300" r="80" fill="url(#bgGradient)" opacity="0.2">
              <animateMotion dur="40s" repeatCount="indefinite" path="M100,300 C150,200 650,100 700,350 C650,450 150,500 100,300" />
            </circle>
            <circle className="moving-circle" cx="700" cy="300" r="100" fill="url(#bgGradient)" opacity="0.15">
              <animateMotion dur="35s" repeatCount="indefinite" path="M700,300 C650,400 150,500 100,250 C150,150 650,100 700,300" />
            </circle>
            <circle className="moving-circle" cx="200" cy="200" r="60" fill="url(#bgGradient)" opacity="0.1">
              <animateMotion dur="30s" repeatCount="indefinite" path="M200,200 C350,150 450,350 300,400 C150,350 100,250 200,200" />
            </circle>
            <circle className="moving-circle" cx="600" cy="400" r="70" fill="url(#bgGradient)" opacity="0.12">
              <animateMotion dur="45s" repeatCount="indefinite" path="M600,400 C500,450 300,350 400,200 C500,150 650,250 600,400" />
            </circle>
          </g>
          {/* Message Icon - Centered */}
          <g transform="translate(400, 300)" filter="url(#glow)" opacity="0.15">
            <path
              d="M-100,-75 L100,-75 C115,-75 125,-65 125,-50 L125,50 C125,65 115,75 100,75 L0,75 L-25,100 L-30,75 L-100,75 C-115,75 -125,65 -125,50 L-125,-50 C-125,-65 -115,-75 -100,-75 Z"
              fill="url(#emeraldGradient)"
              stroke="url(#goldGradient)"
              strokeWidth="3"
            />
          </g>
        </svg>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <Link href="/" className="flex items-center gap-2">
            <MessageSquare className="h-8 w-8 text-amber-400" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-300">M2 You</span>
          </Link>
        </div>

        {step === "phone" && (
          <Card className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 border-opacity-50 text-white">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center text-amber-300">Create your account</CardTitle>
              <CardDescription className="text-center text-gray-300">
                Enter your phone number to get started
              </CardDescription>
            </CardHeader>
            <form onSubmit={handlePhoneSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-200">Phone Number</Label>
                  <div className="flex gap-2">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-auto justify-between bg-gray-700 bg-opacity-50 border-gray-600 hover:bg-gray-600 text-white"
                        >
                          {selectedCountry ? (
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{selectedCountry.flag}</span>
                              <span>{selectedCountry.code}</span>
                            </div>
                          ) : (
                            <span>Select country</span>
                          )}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64 p-0 bg-gray-800 border border-gray-700">
                        <Command className="bg-transparent">
                          <CommandInput placeholder="Search country..." className="text-white" />
                          <CommandEmpty>No country found.</CommandEmpty>
                          <CommandList className="max-h-64 overflow-y-auto">
                            <CommandGroup>
                              {countryCodes.map((country) => (
                                <CommandItem
                                  key={`${country.country}-${country.code}`}
                                  value={`${country.name} ${country.code}`}
                                  onSelect={() => {
                                    setSelectedCountry(country)
                                    setCountryCode(country.code)
                                    setOpen(false)
                                  }}
                                  className="text-white hover:bg-gray-700"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="text-lg">{country.flag}</span>
                                    <span className="flex-1">{country.name}</span>
                                    <span className="text-gray-400">{country.code}</span>
                                  </div>
                                  {selectedCountry?.country === country.country && (
                                    <Check className="ml-auto h-4 w-4 text-amber-400" />
                                  )}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="flex-1 bg-gray-700 bg-opacity-50 border-gray-600 text-white focus:border-amber-400 focus:ring-amber-400"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-400">
                    We&apos;ll send you a verification code to this number
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-gray-900 hover:from-amber-400 hover:to-amber-300"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Verification Code"}
                </Button>
                <div className="text-center text-sm text-gray-400">
                  Already have an account?{" "}
                  <Link href="/login" className="text-amber-400 hover:underline">
                    Log in
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        )}

        {step === "verification" && (
          <Card className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 border-opacity-50 text-white">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center text-amber-300">Verify your phone</CardTitle>
              <CardDescription className="text-center text-gray-300">
                Enter the verification code sent to {selectedCountry?.flag} {countryCode} {phoneNumber}
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleVerificationSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code" className="text-gray-200">Verification Code</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="123456"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="bg-gray-700 bg-opacity-50 border-gray-600 text-white focus:border-amber-400 focus:ring-amber-400"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-gray-900 hover:from-amber-400 hover:to-amber-300"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-gray-300 hover:text-amber-400 hover:bg-gray-700"
                  onClick={() => setStep("phone")}
                  disabled={isLoading}
                >
                  Back
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}

        {step === "profile" && (
          <Card className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 border-opacity-50 text-white">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center text-amber-300">Complete your profile</CardTitle>
              <CardDescription className="text-center text-gray-300">
                Add your name to help friends recognize you
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleProfileSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-200">Your Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-700 bg-opacity-50 border-gray-600 text-white focus:border-amber-400 focus:ring-amber-400"
                    required
                  />
                  <p className="text-sm text-gray-400">
                    This is how you&apos;ll appear to other users
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-gray-900 hover:from-amber-400 hover:to-amber-300"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Complete Setup"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-gray-300 hover:text-amber-400 hover:bg-gray-700"
                  onClick={() => setStep("verification")}
                  disabled={isLoading}
                >
                  Back
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}

        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>Secure messaging with military-grade encryption</p>
          <p className="mt-1 flex items-center justify-center gap-1">
            <Shield className="h-3 w-3 text-amber-400" />
            End-to-end encrypted
          </p>
        </div>
      </div>
    </div>
  )
}

