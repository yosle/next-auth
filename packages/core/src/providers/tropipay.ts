import { debug } from "console"
import { OAuthConfig, OAuthUserConfig } from "./index.js"
/**
 * @module Tropipay
 */

export interface TropipayProfile extends Record<string, any> {
  id: string
  name: string
  surname: string
  email: string
  company: string
  phone: string
  address: string
  walletId: string
  t_c_version: string
  role: string
  nationality: null | number
  state: number
  balance: number
  countryDestinationId: number
  kycLevel: number
  occupationId: number
  clientTypeId: number
  isPublicOffice: boolean
  birthCountryId: number
  province: string
  groupId: number
  lastLogin: string
  pendingIn: number
  pendingOut: number
  lang: string
  shortId: string
  documentTypeId: number
  documentExpirationDate: null | string
  contracts: any
  liveProof: true
  needMigration: any
  twoFaType: number
  twoFaMode: number
  otherOccupationDetail: string
  merchantId: number
  errorPaymentEntityId: any
  errorWalletId: any
  verified: any
  notes: any
  sex: string
  documentCountryId: number
  businessId: any
  businessUserType: any
  businessPercent: any
  affiliateEarnings: number
  affiliateSync: any
  relationType: any
  subscribedCampaign: boolean
  createdAt: string
  updatedAt: string
  group: any
  business?: {
    id: number
    userId: string
    publicName: string
    type: any
    category: any
    address: string
    postalCode: any
    city: string
    province: string
    countryDestinationId: any
    webSite: string
    industry: any
    businessServices: any
    isAFinancialInstitution: any
    registrationTypeId: any
    creationDate: any
    aproveDate: any
    netWorthTypeId: any
    estimatedMonthlyVolume: any
    sourceOfIncome: any
    state: number
    amountEmployeesId: number
    merchantEmail: string
    merchantPhone: string
    merchantCompany: string
    ticket: any
    createdAt: string
    updatedAt: string
    merchantId: number
  }
  userDetail: {
    logo: string
    backgroundImg: string
    web: string
  }
  logo: string
  operation: boolean
  preauthorized: boolean
  hasExpiredDocument: boolean
  crispSignEmail: string
  amountLimitChargeCards: number
}
const TROPIPAY_HOST = process.env.TROPIPAY_HOST || "https://www.tropipay.com"
export default function Tropipay<P extends TropipayProfile>(
  options?: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: "tropipay",
    name: "Tropipay",
    type: "oauth",
    checks: ["pkce", "state"],
    clientId: process.env.TROPIPAY_CLIENT_ID,
    clientSecret: process.env.TROPIPAY_CLIENT_SECRET,
    authorization: {
      url: `${process.env.TROPIPAY_HOST}/api/v2/access/authorize`,
      params: {
        scope: "ALLOW_GET_PROFILE_DATA",
      },
    },
    token: {
      url: `${process.env.TROPIPAY_HOST}/api/v2/access/token`,
    },
    userinfo: {
      url: `${process.env.TROPIPAY_HOST}/api/users/profile`,
      async request(context) {
        const profile = await fetch(
          `${process.env.TROPIPAY_HOST}/api/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${context.tokens.access_token}`,
              "Content-Type": "application/json",
            },
          }
        )
        return await profile.json()
      },
    },
    profile(profile) {
      return {
        id: profile.id,
        name: profile.name,
        surname: profile.surname,
        email: profile.email,
        image: profile.logo || null,
        walletId: profile.walletId,
        role: profile.role,
        nationality: profile.nationality,
        state: profile.state,
        balance: profile.balance,
        countryDestinationId: profile.countryDestinationId,
        kycLevel: profile.kycLevel,
        occupationId: profile.occupationId,
        clientTypeId: profile.clientTypeId,
        birthCountryId: profile.birthCountryId,
        province: profile.province,
        groupId: profile.groupId,
        lastLogin: profile.lastLogin,
        pendingIn: profile.pendingIn,
        pendingOut: profile.pendingOut,
        lang: profile.lang,
        shortId: profile.shortId,
        liveProof: profile.liveProof,
        twoFaType: profile.twoFaType,
        twoFaMode: profile.twoFaMode,
        otherOccupationDetail: profile.otherOccupationDetail,
        merchantId: profile.merchantId,
        verified: profile.verified,
        notes: profile.notes,
        sex: profile.sex,
        documentCountryId: profile.documentCountryId,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
        group: profile.group,
      }
    },
  }
}
