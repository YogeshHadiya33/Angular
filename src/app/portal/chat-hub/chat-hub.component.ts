import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatMessage } from '../../business_logic/models/chat-message.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignalRChatService } from '../../business_logic/services/signalr-chat.service';
import { v4 as uuidv4 } from 'uuid';
import { NotificationService } from '../../business_logic/services/notification.service';

@Component({
  selector: 'app-chat-hub',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-hub.component.html',
  styleUrls: ['./chat-hub.component.scss']
})
export class ChatHubComponent implements OnInit {
  @ViewChild('chatBox') chatBox!: ElementRef;
  messages: ChatMessage[] = [];
  username: string = '';
  messageText: string = '';
  groupName: string = '';
  groupUrl: string | null = null;

  constructor(
    private signalRChatService: SignalRChatService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.signalRChatService.startConnection().then(() => {
      this.signalRChatService.onReceiveMessage((user: string, message: string) => {
        this.messages.push({ username: user, message: message });
        this.scrollToBottom();
      });

      this.route.queryParams.subscribe(params => {
        const groupId = params['group'];
        if (groupId) {
          this.groupName = groupId;
          this.joinGroup(this.groupName);
        }
      });
    }).catch(err => {
      console.error('Error establishing connection:', err);
    });
  }

  createGroup(): void {
    this.groupName = uuidv4();
    this.groupUrl = `${window.location.origin}${window.location.pathname}?group=${this.groupName}`;
    this.router.navigate([], { queryParams: { group: this.groupName }, replaceUrl: true });
    console.log(`Created group: ${this.groupName}`);
  }

  createNewGroup(): void {
    if (this.groupName) {
      this.signalRChatService.removeFromGroup(this.groupName).then(() => {
        this.groupName = '';
        this.groupUrl = null;
        this.messages = []; // Clear old messages
        this.createGroup();
      }).catch(err => {
        console.error('Error leaving group:', err);
        this.messages = []; // Clear old messages even if there's an error leaving the current group
        this.createGroup();
      });
    } else {
      this.createGroup();
    }
  }

  joinGroup(groupName: string): void {
    this.signalRChatService.addToGroup(groupName).then(() => {
      console.log(`Joined group: ${groupName}`);
    }).catch(err => {
      console.error('Error joining group:', err);
    });
  }

  sendMessage(): void {
    if (this.username.trim() && this.messageText.trim() && this.groupName.trim()) {
      this.signalRChatService.sendMessageToGroup(this.groupName, this.username, this.messageText);
      this.messageText = '';
    } else {
      this.notificationService.showError('Username and message are required.'); 
    }
  }

  scrollToBottom(): void {
    setTimeout(() => {
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    }, 0);
  }

  ngOnDestroy(): void {
    this.signalRChatService.removeFromGroup(this.groupName).then(() => {
      this.signalRChatService.stopConnection();
    }).catch(err => {
      console.error('Error leaving group or stopping connection:', err);
    });
  }
}