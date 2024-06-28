import { Component, EventEmitter, Input, Output, effect, inject } from '@angular/core';
import { Ichat } from '../../interface/chatResponse';
import { MatIconModule } from '@angular/material/icon';
import { ChatService } from '../../supabase/chat.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent {
  @Output() close = new EventEmitter<void>();
  //@Input() chatData!: Ichat;
   text!:string
 users!:any
 full_name!:string
 router=inject(Router)
  private chatService=inject(ChatService)
  constructor(){
    effect(()=>{
     //console.log(this.chatService.savedChat() );
     //this.users=this.chatService.savedChat().users.full_name
     this.users=(this.chatService.savedChat() as {users:string}).users
     this.text=(this.chatService.savedChat() as {text:string}).text
      this.full_name=this.users["full_name"]
    
     
    })
  }
  deleteChat(){
    const id=(this.chatService.savedChat() as {id:string}).id
    this.chatService.deleteChat(id).then(
      (res)=>{
        this.closeModal()
     let currentUrl=this.router.url
     this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
      this.router.navigate([currentUrl])
     })
        //this.chatService.listChat()
      }
    ).catch((error)=>alert(error))
  }
  closeModal() {
    this.close.emit();
  }
}
