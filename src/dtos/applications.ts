type ApplicationStatus = 'approved' | 'rejected' | 'waiting'

export interface IApplication {
  id?: number
  name: string
  email: string
  birth_date: string
  year_of_experience: number
  position_applied: string
  application_date: string
  status: ApplicationStatus
}

export type Column = {
  name: string
  canBeSorted: boolean
  key: keyof IApplication
}
