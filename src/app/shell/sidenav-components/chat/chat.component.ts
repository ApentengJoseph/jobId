import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';

interface Message {
  sender: string;
  text: string;
  timestamp: Date;
  image: string;
}
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @ViewChild('chatWindow') chatWindowRef!: ElementRef;
  openNewChat: boolean = false;
  messageSent: boolean = false;
  selectedTabCircle: boolean = false;
  messages: Message[] = [];
  newMessage: string = '';
  senderImg: string = '';
  chatDetails = [
    {
      img: '../../../../assets/images/onboard.png',
      user: 'Send message to General Circle',
      text: '“Take a chill pill” was sent to General',
      time: '12:36',
    },
    {
      img: '../../../../assets/images/onboard.png',
      user: 'Send message to General Circle',
      text: '“Ralph Jesse was onboarded successfully',
      time: '12:36',
    },
    {
      img: '../../../../assets/images/avatar.png',
      user: 'Victoria Peter',
      text: '“I am not sure about that',
      time: '12:36',
    },
    {
      img: '../../../../assets/images/Normal.png',
      user: 'Timothy Ese',
      text: '“I am not sure about that',
      time: '12:36',
    },
    {
      img: '../../../../assets/images/avatar.png',
      user: 'Victoria Peter',
      text: '“I am not sure about that',
      time: '12:36',
    },
    {
      img: '../../../../assets/images/Normal.png',
      user: 'Timothy Ese',
      text: '“I am not sure about that',
      time: '12:36',
    },
    {
      img: '../../../../assets/images/avatar.png',
      user: 'Victoria Peter',
      text: '“I am not sure about that',
      time: '12:36',
    },
    {
      img: '../../../../assets/images/Normal.png',
      user: 'Timothy Ese',
      text: '“I am not sure about that',
      time: '12:36',
    },
    {
      img: '../../../../assets/images/avatar.png',
      user: 'Victoria Peter',
      text: '“I am not sure about that',
      time: '12:36',
    },
    {
      img: '../../../../assets/images/Normal.png',
      user: 'Timothy Ese',
      text: '“I am not sure about that',
      time: '12:36',
    },
    {
      img: '../../../../assets/images/avatar.png',
      user: 'Victoria Peter',
      text: '“I am not sure about that',
      time: '12:36',
    },
    {
      img: '../../../../assets/images/Normal.png',
      user: 'Timothy Ese',
      text: '“I am not sure about that',
      time: '12:36',
    },
  ];
  circleDetails = [
    {
      img: '../../../../assets/icons/ash.png',
      user: 'General',
      text: '“Take a chill pill” was sent to General',
    },
    {
      img: '../../../../assets/icons/lock-.svg',
      user: 'Welcome',
      text: '“Ralph Jesse was onboarded successfully',
    },
    {
      img: '../../../../assets/icons/ash.png',
      user: 'Design Team',
      text: '“I am not sure about that',
    },
    {
      img: '../../../../assets/icons/ash.png',
      user: 'All Team Members',
      text: '“I am not sure about that',
    },
    {
      img: '../../../../assets/icons/ash.png',
      user: 'Design Team',
      text: '“I am not sure about that',
    },
  ];
  contacts = [
    {
      img: '../../../../assets/images/avatar.png',
      name: 'Hakeem Chan',
    },
    {
      img: '../../../../assets/images/Normal.png',
      name: 'Ralph Jesse',
    },
    {
      img: '../../../../assets/images/avatar.png',
      name: 'Victoria Peters',
    },
    {
      img: '../../../../assets/images/Normal.png',
      name: 'Idris Buike',
    },
    {
      img: '../../../../assets/images/avatar.png',
      name: 'Gangu Pube',
    },
    {
      img: '../../../../assets/images/Normal.png',
      name: 'Walter White',
    },
    {
      img: '../../../../assets/images/avatar.png',
      name: 'Reece James',
    },
    {
      img: '../../../../assets/images/Normal.png',
      name: 'Philip Won',
    },
    {
      img: '../../../../assets/images/avatar.png',
      name: 'Hakeem Chan',
    },
    {
      img: '../../../../assets/images/Normal.png',
      name: 'Hakeem Chan',
    },
  ];

  selectedTab: number = 0;
  constructor(public dialogRef: MatDialogRef<ChatComponent>) {}

  ngAfterViewInit() {
    if (this.chatWindowRef) {
      this.scrollToBottom();
    }
  }
  ngOnInit(): void {}
  selectTab(index: number) {
    this.selectedTab = index;
  }
  closeDialog() {
    this.dialogRef.close();
  }
  sendMessage() {
    if (this.newMessage && this.newMessage.trim() !== '') {
      this.messages.push({
        sender: 'You',
        text: this.newMessage,
        timestamp: new Date(),
        image: this.senderImg,
      });
      this.newMessage = '';
      setTimeout(() => {
        this.scrollToBottom();
      }, 0);
    }
    this.messageSent = true;
  }

  receiveMessage(message: string) {
    this.messages.push({ sender: '', text: message, timestamp: new Date(), image: this.senderImg });
    setTimeout(() => {
      this.scrollToBottom();
    }, 0);
  }

  scrollToBottom() {
    try {
      this.chatWindowRef.nativeElement.scrollTop = this.chatWindowRef.nativeElement.scrollHeight;
    } catch (err) {}
  }
  startNewChat() {
    this.openNewChat = !this.openNewChat;
  }
}
