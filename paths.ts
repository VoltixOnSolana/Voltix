export const paths = {
    home: () => "/",
    about: () => "/about",
    contact: () => "/contact",
    signIn: () => "/sign-in",
    signUp: () => "/sign-up",
    market: () => "/market",
    marketDetails: (symbol: string) => `/market/${symbol}`,
    userAccount: (id: string) => `/user/${id}/account`,
    userDeposit: (id: string) => `/user/${id}/deposit`,
    userSettings: (id: string) => `/user/${id}/settings`,
}