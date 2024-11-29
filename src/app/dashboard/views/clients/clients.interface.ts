export interface ClientCreationDTO {
  name: string
  salary: string
  companyValue: string
}

export interface IClient extends ClientCreationDTO {
  id: number
}

export interface IPaginatedClients {
  data: IClient[]
  total: number
}