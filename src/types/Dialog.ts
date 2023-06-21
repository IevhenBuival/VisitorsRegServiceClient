type EventType = "Ok" | "Cancel";

export interface IDialogProps {
  type: string;
  visitId?: string;
  name?: string;
  surname?: string;
}

export interface IDialogItem {
  event: EventType;
  method?: string;
  name?: string;
  surname?: string;
  visitId?: string;
}

export default interface IDialog {
  show: boolean;
  dialogProps: IDialogProps;
}
