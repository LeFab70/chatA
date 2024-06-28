import { Injectable, signal } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { Ichat } from '../interface/chatResponse';
const SUPABASE_URL = environment.supabaseUrl;
const SUPABASE_ANON_KEY = environment.supabaseKey;
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private supabase!: SupabaseClient;
  public savedChat = signal({});
  constructor() {
    this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  async chatMessage(text: string) {
    //console.log(text);

    try {
      const { data, error } = await this.supabase.from('chat').insert({ text });
      if (error) {
        alert(error);
      }
      //console.log(data);
    } catch (error) {
      alert(error);
    }
  }

  async listChat() {
    try {
      const { data, error } = await this.supabase
        .from('chat')
        .select('*,users(*)')
        .order('created_at', { ascending: false })
        

      if (error) {
        alert(error.message);
      }
      //console.log(data);
      
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteChat(id: string) {
    const data = await this.supabase.from('chat').delete().eq('id', id);

    return data;
  }

  selectedChats(msg: Ichat) {
    this.savedChat.set(msg);
  }
}
