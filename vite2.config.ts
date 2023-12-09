import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

declare const __dirname:string;

export default defineConfig({
    root:`${__dirname}/web/html`,
    base:"/build/",
    mode:"development",

    plugins:[
        react(),
        checker({
            typescript:true
        })
    ],

    resolve:{
        alias:{
            components:`${__dirname}/web/components`,
            lib:`${__dirname}/web/lib`,
            css:`${__dirname}/web/css`,
            apis:`${__dirname}/web/apis`,
            hooks:`${__dirname}/web/hooks`,
            store:`${__dirname}/web/store`,
            assets:`${__dirname}/web/assets`,
            cscripts:`${__dirname}/web/cscripts`
        }
    },

    server:{
        port:4000,
        hmr:false
    },

    build:{
        outDir:`${__dirname}/build-cscripts`,
        target:["esnext"],
        sourcemap:true,
        emptyOutDir:true,

        lib:{
            entry:`${__dirname}/web/cscripts/anilist-hook.ts`,
            name:"anilist-hook",
            fileName:"anilist-hook"
        },

        // rollupOptions:{
        //     input:{
        //         popup:`${__dirname}/web/html/popup/index.html`,
        //         showlist:`${__dirname}/web/html/showlist/index.html`,
        //         anilistHook:`${__dirname}/web/lib/anilist-hooks/anilist-hook.ts`
        //     },

        //     output:{
        //         // override certain assets to not have hashes
        //         entryFileNames:(chunkinfo)=>{
        //             if (chunkinfo.name=="anilistHook")
        //             {
        //                 return "assets/[name].js";
        //             }

        //             return "assets/[name]-[hash].js";
        //         }
        //     }
        // }
    }
});