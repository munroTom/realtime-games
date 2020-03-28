export type User = {
  displayName: string;
  active: boolean;
  isMe: boolean;
};

export type Users = Array<User>;

type Card = { user: string; played: boolean };
export type Deck = { [value: string]: Card };
