import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from "@angular/core";

import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { MessageService } from "../../../Core/Services/MessageService/message.service";
import { AppService } from "../../../Core/Services/app.service";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-modal-chat",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, TranslateModule],
  templateUrl: "./modal-chat.component.html",
  styleUrl: "./modal-chat.component.css",
})
export class ModalChatComponent {
  @Input() treatment: any;
  message = new FormControl("", [Validators.required, noWhitespaceValidator()]);
  user$!: any;
  messages: any[] = [];

  @ViewChild("chatHistory") chatHistory!: ElementRef;

  constructor(
    private messageService: MessageService,
    private appService: AppService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges() {
    this.cdr.detectChanges(); // Ensure view is updated
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    const chatHistoryElement = this.chatHistory.nativeElement;
    chatHistoryElement.scrollTop = chatHistoryElement.scrollHeight;
  }

  ngOnInit(): void {
    this.appService.getUser$.subscribe((data) => {
      this.user$ = data;
    });

    this.appService.getMesssages$.subscribe((data) => {
      this.messages = data;

      for (let index = 0; index < this.messages.length; index++) {
        const element = this.messages[index];
        this.onMessageSeen(element);
      }

      this.cdr.detectChanges(); // Ensure view updates
      this.scrollToBottom(); // Scroll after adding
    });
  }
  ngAfterViewInit() {
    this.scrollToBottom();
  }

  ngAfterContentInit(): void {
    this.messageService.getMessages(this.treatment?.id);
  }

  sendMessage(e: Event) {
    e.preventDefault();
    let messageRequest = {
      sender: this.user$.id,
      treatment: this.treatment.id,
      message: this.message.value,
    };
    console.log(messageRequest);

    if (this.message.valid) {
      this.messageService.saveNewMessage(messageRequest);
      this.scrollToBottom(); // Scroll after adding
    }

    this.message.reset();
  }

  onMessageSeen(message: any) {
    console.log(message);

    if (!this.isSeenByCurrentUser(message)) {
      this.messageService.markAsSeen(message.id, this.user$.id);
    }
  }
  isSeenByCurrentUser(message: any): boolean {
    return message.seenBy.some(
      (user: { id: any }) => user.id === this.user$.id
    );
  }
}

function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isWhitespace = control.value.trim().length === 0;
    return isWhitespace ? { whitespace: true } : null;
  };
}
