import { Component, OnInit } from '@angular/core';
// import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from 'src/app/Services/chat.service';
import {Observable} from 'rxjs';
import {scan} from 'rxjs/operators';
// import { PusherService } from 'src/app/services/pusher.service';
@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;
  constructor(
    public chat: ChatService,
    // public pusher: PusherService
    ) { }

  ngOnInit() {
    this.chat.talk();

    // Nối vào mảng sau mỗi tin nhắn mới được thêm vào nguồn dữ liệu
    this.messages = this.chat.conversation.asObservable().pipe(scan((acc, val) => acc.concat(val)));
  }

  senMessage() {
    this.chat.converse(this.formValue);
  }

}
