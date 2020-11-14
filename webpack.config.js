const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin=require("fork-ts-checker-webpack-plugin");
const CopyPlugin=require("copy-webpack-plugin");
const WebpackBar=require("webpackbar");

// prod:boolean //enable production mode
module.exports=(env)=>{
    env=env || {};

    var mode=env.prod?"production":"development";
    var outputPath=env.prod?"release":"build";
    var jsOutput=env.prod?"build":".";
    var cssOutput=env.prod?"build":".";
    var devtool=env.prod?false:"cheap-module-source-map";

    var plugins=[
        new MiniCssExtractPlugin({
            filename:`${cssOutput}/[name]-build.css`
        }),

        new ForkTsCheckerWebpackPlugin(),
        new WebpackBar()
    ];

    if (env.prod)
    {
        plugins.push(new CopyPlugin({
            patterns:[
                {
                    from:"assets",
                    to:"assets"
                },
                {
                    from:"popup/popup-index.html",
                    to:"popup"
                },
                {
                    from:"showlist/showlist-index.html",
                    to:"showlist"
                },
                {
                    from:"Manifest.json",
                    to:"."
                }
            ]
        }));
    }

    return {
        mode,
        entry:{
            anilisthook:"./anilist-hooks/anilist-hook.ts",
            showlist:"./showlist/showlist-index.tsx",
            popup:"./popup/popup-index.tsx"
        },
        output:{
            path:`${__dirname}/${outputPath}`,
            filename:`${jsOutput}/[name]-build.js`
        },

        module:{
            rules:[
                {
                    test:/\.(tsx|ts|js|jsx)$/,
                    exclude:/node_modules/,
                    use:{
                        loader:"babel-loader",
                        options:{
                            presets:["@babel/preset-react","@babel/preset-typescript"]
                        }
                    }
                },
                {
                    test:/\.(less|css)$/,
                    use:[
                        MiniCssExtractPlugin.loader,
                        {loader:"css-loader",options:{url:false}},
                        {loader:"less-loader"}
                    ]
                }
            ]
        },

        plugins,

        resolve:{
            extensions:[".tsx",".ts",".jsx",".js"]
        },

        stats:{
            entrypoints:false,
            modules:false,
            chunks:false
        },

        devtool
    };
};