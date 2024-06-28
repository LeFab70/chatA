import { Component, effect, inject, signal } from '@angular/core';
import { SupabaseServiceTsService } from '../../services/supabase.service.ts.service';
import { Router } from '@angular/router';
import { DatePipe,  NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChatService } from '../../supabase/chat.service';
import { Ichat } from '../../interface/chatResponse';
import { DeleteModalComponent } from '../../layout/delete-modal/delete-modal.component';
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    MatIconModule,
   DeleteModalComponent,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    DatePipe,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  user: any;
  chatForm!: FormGroup;
  chatData!:Ichat
  chats = signal<Ichat[]>([]);
  private fb = inject(FormBuilder);
  private chatService = inject(ChatService);
  messages: { id: number; text: string }[] = [];
  newMessage: string = '';
  editingMessage: { id: string; text: string } | null = null;
  constructor(
    private supabaseService: SupabaseServiceTsService,
    private router: Router
  ) {
    // console.log(localStorage.getItem('session') as string);
    this.user = supabaseService.getUser();
    // this.user=this.supabaseService.getUser(localStorage.getItem('session') as string)
    // console.log(this.user);

    this.chatForm = this.fb.group({
      chatMessage: ['', Validators.required],
    });

    effect(() => {
      this.loadMessages();
    });
  }
  isModalOpen = false;

  openModal(chat:Ichat) {
    //console.log(chat);
    this.chatService.selectedChats(chat)
    this.isModalOpen = true;

    
  }

  ngOnInit() {
    this.loadMessages; // Appelez fetchData() une fois au chargement du composant
    setInterval(() => {
      this.loadMessages// Rafraîchissez les données toutes les x millisecondes
    }, 5000); // Exemple : rafraîchissement toutes les 5 secondes
  }




  closeModal() {
    this.isModalOpen = false;
  }



  getFirstWord(str: string | undefined): string {
    // Utiliser la méthode split pour diviser la chaîne en mots
    const words = str?.trim().split(/\s+/) || '';
    // Retourner le premier mot
    //console.log(words[0]);
    if (words?.length === 0) {
      return '';
    }
    return words[0];
  }
  // ngOnInit() {
  //   this.user = this.supabaseService.isLoggedIn;
  //   if (!this.user) {
  //     this.router.navigate(['/login']);
  //   }
  //   this.loadMessages();
  // }
  loadMessages() {
    // Load messages from your database
    this.chatService
      .listChat()
      .then((res: Ichat[] | null) => {
        if (res !== null) {
          this.chats.set(res);
          // console.log(this.chats);
        }
      })
      .catch((error) => alert(error));
  }

  sendMessage() {
    // if (event.key === 'Enter' && !event.shiftKey) {
    //   // Éviter le comportement par défaut du formulaire
    //   event.preventDefault();}
    // console.log(this.newMessage.trim());
    // if (this.newMessage.trim()) {
    //   const message = { id: Date.now(), text: this.newMessage.trim() };
    //   this.messages.push(message);
    //   this.newMessage = '';
    //   console.log(message);

    //   // Save the message to your database
    // }
    const chatValue = this.chatForm.value.chatMessage;
    this.chatService
      .chatMessage(chatValue)
      .then((res) => {
        //console.log(res);
        this.chatForm.reset();
        this.loadMessages();
      })
      .catch((error) => alert(error));
  }

  deleteMessage(id: string) {
    //this.messages = this.messages.filter((message) => message.id !== id);
    // Delete the message from your database
  }

  editMessage(id: string, newText: string) {
    // const message = this.messages.find((message) => message.id === id);
    // if (message) {
    //   message.text = newText;
    //   // Update the message in your database
    // }
  }

  async logout() {
    this.supabaseService
      .signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((Error) => alert(Error));
  }

  startEditing(message: { id: string; text: string }) {
    //this.editingMessage = { ...message };
  }

  saveEditing() {
    // if (this.editingMessage) {
    //   const index = this.messages.findIndex(
    //     (message) => message.id === this.editingMessage!.id
    //   );
    //   if (index !== -1) {
    //     this.messages[index] = this.editingMessage;
    //     // Update the message in your database
    //   }
    //   this.editingMessage = null;
    // }
  }

  cancelEditing() {
    this.editingMessage = null;
  }

  timeSince(date: string): string|undefined{
    const nowDate: number = new Date().getTime();
    const dateDate = new Date(date);
    if (date) {
      const secondsPast = Math.floor((nowDate - dateDate.getTime()) / 1000);

      if (secondsPast < 60) {
        return `il y a ${secondsPast} secondes`;
      } else if (secondsPast < 3600) {
        const minutes = Math.floor(secondsPast / 60);
        return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
      } else if (secondsPast < 86400) {
        const hours = Math.floor(secondsPast / 3600);
        return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
      } else {
        const days = Math.floor(secondsPast / 86400);
        return `il y a ${days} jour${days > 1 ? 's' : ''}`;
      }
    }
    return undefined;
  }
}
