import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { SIGNAL_R_CHAT_HUB_URL } from '../../shared/constants';

@Injectable({ providedIn: 'root' })
export class SignalRChatService {
  hubConnection!: signalR.HubConnection;

  startConnection(): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(SIGNAL_R_CHAT_HUB_URL, {
        withCredentials: false // Ensure credentials are included
      })
      .build();

    return this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => {
        console.log('Error while starting connection: ' + err);
        throw err;
      });
  }

  sendMessageToGroup(groupName: string, user: string, message: string) {
    this.hubConnection
      .invoke('SendMessageToGroup', groupName, user, message)
      .catch((err) => console.error(err));
  }

  addToGroup(groupName: string): Promise<void> {
    return this.hubConnection
      .invoke('AddToGroup', groupName)
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  removeFromGroup(groupName: string): Promise<void> {
    return this.hubConnection
      .invoke('RemoveFromGroup', groupName)
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  onReceiveMessage(callback: (user: string, message: string) => void) {
    this.hubConnection.on('ReceiveMessage', callback);
  }

  stopConnection(): Promise<void> {
    return this.hubConnection
      .stop()
      .then(() => console.log('Connection stopped'))
      .catch((err) => {
        console.log('Error while stopping connection: ' + err);
        throw err;
      });
  }
}