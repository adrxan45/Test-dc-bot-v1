import { interactions, message } from "https://deno.land/x/discordinteractions/mod.ts";
import { serve } from "https://deno.land/std/http/server.ts";

const client = interactions({
    publicKey: "cd32e04354ab43a628a3a19a40f712399a1466fe7f9b94417f917d3cb096d65b"
})
    .slash("hello", (i) => message({ content: `Hello ${i.member?.user.username}!` }))
    .slash("quote", async (_) => {
        const response = await fetch("https://api.quotable.io/random");
        const quote = await response.json();
        return message({ content: `"${quote.content}" —${quote.author}` });
    })

serve(client.handle);