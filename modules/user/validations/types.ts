interface ClientProps {
  ClientId: boolean;
  Label: string;
  Description: string;
}

interface TokenProps {
  expires_in: number;
  user_token: string;
}

export type UserProps = {
  CurrentClient: ClientProps;
  Email: string;
  IsAdministrator: boolean;
  Name: string;
  UserId: 9495;
  UserToken: TokenProps;
};
