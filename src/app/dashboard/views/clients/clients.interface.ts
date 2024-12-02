export interface ClientCreationDTO {
  name: string
  salary: number
  companyValue: number
}

export interface IClient extends ClientCreationDTO {
  id: number
}

export interface IPaginatedClients {
  data: IClient[]
  total: number
}