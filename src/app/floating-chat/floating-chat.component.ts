import { HttpEventType } from '@angular/common/http';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SecurityContext,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { DomSanitizer } from '@angular/platform-browser';

export interface FloatingChat {
  name: string;
  message: string;
  time: Date;
  unread: number;
  id: string;
  isPrivate: boolean;
}

@Component({
  selector: 'app-floating-chat',
  templateUrl: './floating-chat.component.html',
  styleUrls: ['./floating-chat.component.scss'],
})
export class FloatingChatComponent implements OnInit, AfterViewChecked, OnChanges, AfterViewInit {
  @Output() toggleChat: EventEmitter<boolean> = new EventEmitter();

  isRecording: boolean = false;
  recordedTime: string = '00.00';
  blobUrl: any;
  allChats: FloatingChat[] = [];
  showPrivateChat = false;
  showGroupChat = false;
  user!: any;
  userCompany!: any;

  @ViewChild(MatMenuTrigger) trigger?: MatMenuTrigger;

  @ViewChildren('connectiontextarea')
  connectiontextarea!: QueryList<ElementRef>;

  @ViewChildren('circletextarea')
  circletextarea!: QueryList<ElementRef>;

  showDialog: boolean = false;
  memberCount: string = '';

  showDemarcation: boolean = false;
  isYesterday: boolean = false;

  teste: any;

  files: File[] = [];
  selected_files: {
    file: any;
    is_upload_in_progress: boolean;
    upload_result: any;
  } = {
    file: null,
    is_upload_in_progress: false,
    upload_result: null,
  };

  file_upload_config = {
    // API: this.global_utilities.getAPI("chatApi") + "file/s3upload",
    MIME_types_accepted: `application/pdf,image/png,image/jpg,image/jpeg,video/mp4,video/ogg,audio/mp3,application/msword,
    application/vnd.openxmlformats,application/epub+zip,audio/webm,video/webm,image/webp,video/3gpp,audio/3gpp,text/plain,
    audio/aac,video/x-msvideo,text/css,image/gif,video/mpeg`,
    is_multiple_selection_allowed: true,
    data: null,
  };
  groupedMessages: { [key: string]: any[] } = {};
  shouldScrollToBottom = false; // Flag to control scrolling
  showEmojiPicker: boolean = false;
  channel: any;
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  // progress: number | null = 0;
  teamMembers: any[] = [];
  mentions: string[] = [];
  matchingMembers: any[] = [];
  mentionsOpenedFromIcon: boolean = false;
  urlToPreview: string = '';
  urlName: string = '';
  showEmojiModal: boolean = false;
  connections: any;
  channels: any;

  constructor(private ref: ChangeDetectorRef, private sanitizer: DomSanitizer, private dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngAfterViewInit(): void {
    this.connectiontextarea.forEach((editableDiv, index) => {
      // Do something with each editable div
      console.log(`Editable Div ${index + 1}: `, editableDiv.nativeElement);
    });
  }

  ngOnInit(): void {
    // this.requestChannels();
    // this.fetchConnections();

    this.ref.detectChanges();
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }
  // onConnectionBlur(event: any, connection: Connection) {
  //   this.channelService.triggerTypingEvent({
  //     isTyping: false,
  //     roomId: '',
  //     connectionId: connection.id,
  //     userId: this.user.id,
  //     username: this.user.username
  //   })
  // }
  // onCircleBlur(event: any, circle: IChannel) {
  //   console.log('input blur: ', event);
  //   this.channelService.triggerTypingEvent({
  //     isTyping: false,
  //     roomId: circle.id!,
  //     connectionId: '',
  //     userId: this.user.id,
  //     username: this.user.username
  //   })
  // }
  // openCircleEmojiModal(circle: IChannel) {
  //   if (!circle.showEmojiPicker) {
  //     circle.showEmojiPicker = true;
  //   } else {
  //     this.closeCircleEmojiModal(circle);
  //   }
  //   this.setCircle(circle);
  // }

  // openConnectionEmojiModal(connection: Connection) {
  //   if (!connection.showEmojiPicker) {
  //     connection.showEmojiPicker = true;
  //   } else {
  //     this.closeConnectionEmojiModal(connection);
  //   }
  //   this.setConnection(connection);
  // }

  // closeCircleEmojiModal(circle: IChannel) {
  //   circle.showEmojiPicker = false;
  //   this.setCircle(circle);
  // }
  // closeConnectionEmojiModal(connection: Connection) {
  //   connection.showEmojiPicker = false;
  //   this.setConnection(connection);
  // }

  // connectionFileSelected(event: any, connection: Connection) {
  //   const selectedFile = event.target.files[0];
  //   if (connection.selectedFiles === undefined) {
  //     connection.selectedFiles = [];
  //   }
  //   if (selectedFile) {
  //     connection.selectedFiles.push(selectedFile);
  //     (connection.selectedFiles ?? []).forEach((file) => {
  //       this.uploadFile(file.file, connection);
  //     });
  //   }
  //   this.setConnection(connection);
  //   event.target.value = "";
  // }

  // circleFileSelected(event: any, circle: IChannel) {
  //   const selectedFile = event.target.files[0];
  //   if (circle.selectedFiles === undefined) {
  //     circle.selectedFiles = [];
  //   }
  //   if (selectedFile) {
  //     circle.selectedFiles.push(selectedFile);
  //     circle.selectedFiles.forEach((file) => {
  //       this.uploadFile(file.file, undefined, circle);
  //     });
  //   }
  //   this.setCircle(circle);
  //   event.target.value = "";
  // }

  // showHyperlinkControlDialog(isPrivate: boolean, item: IChannel | Connection) {
  //   this.dialog
  //     .open(HyperlinkControlComponent, {
  //       height: "auto",
  //       width: "300px",
  //     })
  //     .afterClosed()
  //     .subscribe((e) => {
  //       this.urlToPreview = e.data.url;
  //       this.urlName = e.data.name;

  //       const divElement = item.content;
  //       const appendedContent = `${divElement}<a href="${e.data.url}" >${e.data.name}</a>`;
  //       if (item.content === undefined) {
  //         item.content = "";
  //       }
  //       item.content += appendedContent;
  //       if (isPrivate) {
  //         this.setConnection(item as Connection);
  //       } else {
  //         this.setCircle(item as IChannel);
  //       }
  //     });
  // }

  openMentionsList() {
    this.mentionsOpenedFromIcon = true;
    this.matchingMembers = this.teamMembers;
  }

  loadMatchingUsers(query: string) {
    this.matchingMembers = this.teamMembers.filter(
      (e) =>
        e.FirstName.toLowerCase().includes(query.toLowerCase()) ||
        e.LastName.toLowerCase().includes(query.toLowerCase())
    );
    if (query.length >= 1) {
      this.trigger?.openMenu();
    } else {
      this.trigger?.closeMenu();
    }
  }

  // startCircleRecording(circle: IChannel) {
  //   if (!this.isRecording) {
  //     circle.isRecording = true;
  //     this.audioRecordingService.startRecording();
  //   }
  //   this.setCircle(circle);
  // }

  // startConnectionRecording(connection: Connection) {
  //   if (!connection.isRecording) {
  //     connection.isRecording = true;
  //     this.audioRecordingService.startRecording();
  //   }
  //   this.setConnection(connection);
  // }

  // setConnection(connection: Connection) {
  //   const unique = new Set([...this.openedConnectBoxes, connection]);
  //   this.openedConnectBoxes = [...unique];
  // }

  // setCircle(circle: IChannel) {
  //   const unique = new Set([...this.openedBoxes, circle]);
  //   this.openedBoxes = [...unique];
  // }

  // removeCircleFile(file: CustomFile, circle: IChannel) {
  //   circle.selectedFiles = circle.selectedFiles.filter(
  //     (e) => e.file.name !== file.file.name
  //   );
  //   if (file.file.type === "audio/wav") {
  //     circle.blobUrl = undefined;
  //   }
  //   this.setCircle(circle);
  // }

  // removeConnectionFile(file: CustomFile, connection: Connection) {
  //   connection.selectedFiles = connection.selectedFiles.filter(
  //     (e) => e.file.name !== file.file.name
  //   );
  //   if (file.file.type === "audio/wav") {
  //     connection.blobUrl = undefined;
  //   }
  //   this.setConnection(connection);
  // }

  // uploadFile(file: File, connection?: Connection, circle?: IChannel) {
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   if (connection !== undefined) {
  //     connection.progress = 1;
  //     this.setConnection(connection);
  //   }

  //   if (circle !== undefined) {
  //     circle.progress = 1;
  //     this.setCircle(circle);
  //   }
  //   this.file_upload_sub = this.fileUploadService
  //     .uploadFile(formData, this.file_upload_config.API)
  //     .subscribe({
  //       next: (e) => {
  //         if (e.type === HttpEventType.UploadProgress) {
  //            console.log("upload", connection);

  //           if (connection !== undefined) {
  //             connection.progress = Math.round(
  //               (100 / (e.total ?? 0)) * e.loaded
  //             );
  //             this.setConnection(connection);
  //              console.log("upload", connection.progress);
  //           }

  //           if (circle !== undefined) {
  //             circle.progress = Math.round((100 / (e.total ?? 0)) * e.loaded);
  //             this.setCircle(circle);
  //           }
  //         } else if (e.type === HttpEventType.Response) {
  //           this.files.push(e?.body);
  //           if (connection !== undefined) {
  //             connection.progress = null;
  //             this.setConnection(connection);
  //           }

  //           if (circle !== undefined) {
  //             circle.progress = null;
  //             this.setCircle(circle);
  //           }
  //         }
  //       },
  //       error: (error) => {
  //         this.selected_files.upload_result = error.message;
  //         this.selected_files.is_upload_in_progress = false;
  //         this.files = [];
  //         this.selected_files.file = null;
  //         if (connection !== undefined) {
  //           connection.progress = null;
  //         }

  //         if (circle !== undefined) {
  //           circle.progress = null;
  //         }
  //       },
  //     });
  // }

  emitEmojiToggle(emojiToggle: boolean) {
    this.showEmojiPicker = emojiToggle;
  }

  // fetchConnections(): void {
  //   this.channelService
  //     .getFloatingChatConnections()
  //     .subscribe((connections) => {
  //       connections.forEach((e) => {
  //         if (e.messages.length < 1) {
  //           this.channelService
  //             .getPrivateMessages(e.id, this.user.id)
  //             .subscribe((m) => {
  //               if (m.event === MESSAGE_EVENT.GET_PRIVATE_MESSAGES) {
  //                 m.data.forEach((element: Message) => {
  //                   if (element.receiverId === e.id) {
  //                     const unique = new Set([...e.messages, element]);
  //                     e.messages = [...unique];
  //                   }
  //                   if (element.user.id === e.id) {
  //                     const unique = new Set([...e.messages, element]);
  //                     e.messages = [...unique];
  //                   }
  //                 });
  //               }
  //             });
  //         }
  //       });
  //       this.connections = connections;
  //       const allChats = this.connections.map((e) => {
  //         console.log("messages ----", e);
  //         let mapped: FloatingChat = {
  //           name: e.username,
  //           message: (e.messages ?? [])[0].text ?? "",
  //           time: new Date((e.messages ?? [])[0].createdAt.toString()),
  //           unread: e.unRead ?? 0,
  //           id: e.id ?? "",
  //           isPrivate: true,
  //         };
  //         return mapped;
  //       });

  //       this.allChats = [...this.allChats, ...this.sortChats(allChats)];
  //     });
  // }

  scrollToBottom(): void {
    if (this.scrollContainer) {
      const containerElement = this.scrollContainer.nativeElement;
      containerElement.scrollTop = containerElement.scrollHeight;
    }
  }
  getSortedMessage(messages: any[]) {
    return messages.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  // reply(message: any) {
  //   this.selectedMessage.next(message);
  // }
  // sendPrivateMessage(connection: Connection) {
  //   let message = {
  //     text: connection.content,
  //     room: null,
  //     is_private: true,
  //     has_file: (connection.selectedFiles ?? []).length > 0,
  //     files: connection.selectedFiles ?? [],
  //     receiverId: connection.id,
  //     parentId: null,
  //     mentions: this.mentions,
  //     tenantId: this.user.tenantId,
  //   };
  //   this.channelService.sendMessage(message);
  //   this.files = [];
  //   connection.content = "";
  //   this.setConnection(connection);
  // }

  // sendCircleMessage(channel: IChannel) {
  //   let message = {
  //     text: channel.content,
  //     room: {
  //       id: channel.id,
  //       name: channel.name,
  //     },
  //     is_private: false,
  //     has_file: (channel.selectedFiles ?? []).length > 0,
  //     files: channel.selectedFiles ?? [],
  //     parentId: undefined,
  //     mentions: this.mentions,
  //     tenantId: this.user.tenantId,
  //     isDeleted: false,
  //   };
  //   this.channelService.sendMessage(message);
  //   this.files = [];
  //   this.setCircle(channel);
  // }

  // onConnectionInput(event: any, connection: Connection) {
  //   if (connection.content === undefined) {
  //     connection.content = "";
  //   }
  //   this.connectiontextarea.forEach((editableDiv) => {
  //     connection.content = editableDiv.nativeElement.innerHTML;
  //   });
  //   this.setConnection(connection);
  //   this.channelService.triggerTypingEvent({
  //     isTyping: true,
  //     roomId: '',
  //     connectionId: connection.id,
  //     userId: this.user.id,
  //     username: this.user.username
  //   })
  // }
  // onCircleInput(event: any, circle: IChannel) {
  //   if (circle.content === undefined) {
  //     circle.content = "";
  //   }
  //   this.circletextarea.forEach((editableDiv) => {
  //     circle.content = editableDiv.nativeElement.innerHTML;
  //   });
  //   this.setCircle(circle);
  //   this.channelService.triggerTypingEvent({
  //     isTyping: true,
  //     roomId: circle.id!,
  //     connectionId: '',
  //     userId: this.user.id,
  //     username: this.user.username
  //   })
  // }

  toggleFloatingchat() {
    this.toggleChat.emit(false);
  }

  // openBox(chat: FloatingChat) {
  //   if (chat.isPrivate) {
  //     const connection = this.connections.filter((e) => e.id === chat.id)[0];
  //     this.openConnectChatBox(connection);
  //   } else {
  //     const channel = this.channels.filter((e) => e.id === chat.id)[0];
  //     this.openChatBox(channel);
  //   }
  // }
  // openConnectChatBox(connect: Connection) {
  //    console.log(connect);
  //   if (!this.openedConnectBoxes.includes(connect)) {
  //     this.openedConnectBoxes.push(connect);
  //   }
  // }
  // openChatBox(channel: any) {
  //   if (!this.openedBoxes.includes(channel)) {
  //     this.openedBoxes.push(channel);
  //     (channel.messages ?? []).forEach((e: any) => {
  //       this.updateReadStatus({
  //         messageId: e.messageId,
  //         userId: this.user.id,
  //         id: e.id,
  //       });
  //     });
  //   }
  // }

  // closeChatBox(id: string) {
  //   this.openedConnectBoxes = this.openedConnectBoxes.filter(
  //     (e) => e.id !== id
  //   );
  //   this.openedConnectBoxes.forEach((e) => (e.content = ""));
  //   this.openedBoxes = this.openedBoxes.filter((e) => e.id !== id);
  //   this.openedBoxes.forEach((e) => (e.content = ""));
  // }

  // updateReadStatus(data: { messageId: string; userId: string; id: string }) {
  //   this.channelService
  //     .updateReadStatus(data.userId, data.id, data.messageId)
  //     .subscribe((response) => { });
  // }

  // requestChannels() {
  //   this.channelService.requestChannels(this.user).subscribe({
  //     next: (res) => {
  //        console.log("requesting", res);

  //       if (res.event == MESSAGE_EVENT.REQUEST_CHANNELS) {
  //         res.data.forEach((room: any) => {
  //           this.channelService
  //             .getChannelMessages(room._id)
  //             .subscribe((messages) => {
  //               room.messages = messages;
  //             });
  //         });
  //         this.channels = res.data;
  //         const allChats = this.channels.map((e) => {
  //           let mapped: FloatingChat = {
  //             name: e.name,
  //             message:
  //               (e.messages ?? [])[(e.messages ?? []).length - 1].text ?? "",
  //             time:
  //               (e.messages ?? [])[(e.messages ?? []).length - 1].createdAt ??
  //               new Date(),
  //             unread: e.unRead ?? 0,
  //             id: e.id ?? "",
  //             isPrivate: false,
  //           };
  //           return mapped;
  //         });

  //         this.allChats = [...this.allChats, ...this.sortChats(allChats)];
  //       }
  //     },
  //   });
  // }

  sortChats(allChats: FloatingChat[]) {
    return allChats.sort((a, b) => {
      return new Date(b.time).getTime() - new Date(a.time).getTime();
    });
  }
  getInitials(name: string): string {
    if (name !== '') {
      const nameSplit = name.split(' ');
      const first = nameSplit[0].substring(0, 1).toUpperCase();
      const last = nameSplit[1].substring(0, 1).toUpperCase();
      return `${first}${last}`;
    } else {
      return '';
    }
  }

  getMatchinInitials(firstname: string, lastname: string): string {
    const first = firstname.substring(0, 1);
    const last = lastname.substring(0, 1);
    return `${first}${last}`;
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
  }

  getReplacement(firstname: string, lastname: string) {
    return `${this.titleCaseWord(firstname)} ${this.titleCaseWord(lastname)} `;
  }

  // replaceConnectionString(
  //   firstname: string,
  //   lastname: string,
  //   connection: Connection
  // ) {
  //   if (connection.content == undefined) {
  //     connection.content = "";
  //   }
  //   let currentIndex = 0;
  //   let currentDiv: ElementRef<any> = new ElementRef("");
  //   this.connectiontextarea.forEach((editableDiv, index) => {
  //     currentIndex = index;
  //     currentDiv = editableDiv;
  //   });
  //   (
  //     this.connectiontextarea.get(currentIndex) ?? new ElementRef("")
  //   ).nativeElement.innerHTML += `@${this.getReplacement(firstname, lastname)}`;
  //   connection.content = currentDiv.nativeElement.innerHTML;
  //   this.setConnection(connection);

  //   this.pushMentions(firstname, lastname);
  // }

  // replaceCircleString(firstname: string, lastname: string, circle: IChannel) {
  //   if (circle.content == undefined) {
  //     circle.content = "";
  //   }
  //   let currentIndex = 0;
  //   let currentDiv: ElementRef<any> = new ElementRef("");
  //   this.circletextarea.forEach((editableDiv, index) => {
  //     currentIndex = index;
  //     currentDiv = editableDiv;
  //   });
  //   (
  //     this.circletextarea.get(currentIndex) ?? new ElementRef("")
  //   ).nativeElement.innerHTML += `@${this.getReplacement(firstname, lastname)}`;
  //   circle.content = currentDiv.nativeElement.innerHTML;
  //   this.setCircle(circle);
  //   this.pushMentions(firstname, lastname);
  // }

  pushMentions(firstname: string, lastname: string) {
    this.mentions.push(`@${this.getReplacement(firstname, lastname)}`);
  }

  getChannelInitials(name: string): string {
    const first = name[0].toUpperCase();
    const last = name[1].toUpperCase();
    return `${first}${last}`;
  }

  toggleEmojiModal() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  // resetConnectionTextArea(connection: Connection) {
  //   let currentIndex = 0;
  //   let currentDiv: ElementRef<any> = new ElementRef("");
  //   this.connectiontextarea.forEach((editableDiv, index) => {
  //     currentIndex = index;
  //     currentDiv = editableDiv;
  //   });
  //   (
  //     this.connectiontextarea.get(currentIndex) ?? new ElementRef("")
  //   ).nativeElement.innerHTML = "";
  //   connection.content = currentDiv.nativeElement.innerHTML;
  // }

  // resetCircleTextArea(circle: IChannel) {
  //   let currentIndex = 0;
  //   let currentDiv: ElementRef<any> = new ElementRef("");
  //   this.circletextarea.forEach((editableDiv, index) => {
  //     currentIndex = index;
  //     currentDiv = editableDiv;
  //   });
  //   (
  //     this.circletextarea.get(currentIndex) ?? new ElementRef("")
  //   ).nativeElement.innerHTML = "";
  //   circle.content = currentDiv.nativeElement.innerHTML;
  // }

  // handleConnectionEmojiSelection(emoji: any, connection: Connection) {
  //   if (connection.content === undefined) {
  //     connection.content = "";
  //   }
  //   let currentIndex = 0;
  //   let currentDiv: ElementRef<any> = new ElementRef("");
  //   this.connectiontextarea.forEach((editableDiv, index) => {
  //     currentIndex = index;
  //     currentDiv = editableDiv;
  //   });
  //   (
  //     this.connectiontextarea.get(currentIndex) ?? new ElementRef("")
  //   ).nativeElement.innerHTML += emoji.emoji.native;
  //   connection.content = currentDiv.nativeElement.innerHTML;
  //   this.setConnection(connection);
  // }

  // handleCircleEmojiSelection(emoji: any, circle: IChannel) {
  //   if (circle.content === undefined) {
  //     circle.content = "";
  //   }
  //   let currentIndex = 0;
  //   let currentDiv: ElementRef<any> = new ElementRef("");
  //   this.circletextarea.forEach((editableDiv, index) => {
  //     currentIndex = index;
  //     currentDiv = editableDiv;
  //   });
  //   (
  //     this.circletextarea.get(currentIndex) ?? new ElementRef("")
  //   ).nativeElement.innerHTML += emoji.emoji.native;
  //   circle.content = currentDiv.nativeElement.innerHTML;
  //   this.setCircle(circle);
  // }

  // onKeyDown(
  //   event: KeyboardEvent,
  //   item: Connection | IChannel,
  //   isPrivate: boolean
  // ): void {
  //   if (event.key === "Enter" && !event.shiftKey) {
  //     event.preventDefault();
  //     if (!isPrivate) {
  //       this.sendCircleMessage(item as IChannel);
  //     } else {
  //       this.sendPrivateMessage(item as Connection);
  //     }
  //   } else if (event.key === "Enter" && event.shiftKey) {
  //     this.handleShiftEnterKey();
  //   }
  // }

  handleShiftEnterKey(): void {
    const editableDiv = document.querySelector('.editable-div') as HTMLElement;
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    const br = document.createElement('br');

    if (range && editableDiv) {
      range.deleteContents();
      range.insertNode(br);
      range.setEndAfter(br);
      range.setStartAfter(br);

      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }

  // abortRecording() {
  //   if (this.isRecording) {
  //     this.isRecording = false;
  //     this.audioRecordingService.abortRecording();
  //   }
  // }

  // stopConnectionRecording(connection: Connection) {
  //   if (connection.isRecording) {
  //     this.audioRecordingService.stopRecording(undefined, connection);
  //     connection.isRecording = false;
  //   }
  //   this.setConnection(connection);
  // }
  // stopCircleRecording(circle: IChannel) {
  //   if (circle.isRecording) {
  //     this.audioRecordingService.stopRecording(circle);
  //     circle.isRecording = false;
  //   }
  //   this.setCircle(circle);
  // }

  // clearConnectionRecordedData(connection: Connection) {
  //   connection.blobUrl = undefined;
  //   this.setConnection(connection);
  // }
  // clearCircleRecordedData(circle: IChannel) {
  //   circle.blobUrl = undefined;
  //   this.setCircle(circle);
  // }
}
