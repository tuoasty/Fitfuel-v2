import { Injectable } from '@nestjs/common';
import {createClient, SupabaseClient} from "@supabase/supabase-js";

@Injectable()
export class SupabaseService {
    private readonly supabase:SupabaseClient;
    constructor(){
        this.supabase = createClient("https://nkwfrmiuazvqdmfktfka.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rd2ZybWl1YXp2cWRtZmt0ZmthIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzYxMjgyMiwiZXhwIjoyMDYzMTg4ODIyfQ.c_kodP-ACLOx8t6Z7Anm3PPyhWA6lSRikJcDtLjpGwc")
    }

    async create(bucketName:string, fileName:string, file:File) {
        const {data, error} = await this.supabase.storage.from(bucketName).upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
        })
        if (error != null) {
            console.log(error)
            return null
        } else {
            return data.fullPath;
        }
    }
}
