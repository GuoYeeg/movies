/** commonjs 给node读 */

const path =require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports={
  mode:'development',
  entry:path.join(__dirname,'./src/main.js'),
  output:{
    path:path.join(__dirname,'./dist'),
    publicPath:'/',
    filename:'bundle.js'
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:path.join(__dirname,'src/inedx.html'),
      filename:'index.html',
      publicPath:'/'
    })
  ],
  module:{
    rules:[
      //loader
      {
        test:/\.css$/,
        use:['style-loader','css-loader'],
        
      },
      {test:/\.less$/,use:['style-loader',{
        loader:"css-loader",
        options:{
          modules:{
            localIdentName:'[path][name]__[local]--[hash:base64:5]'
          }, //css组件样式私有化/模块化
          sourceMap:true,
        }
      },'less-loader'],exclude:[/node_modules/,/dist/]},
      {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
      {test:/\.jsx?/,use:['babel-loader','lazyload-loader'],exclude:/node_modules/},
      {test:/\.(jpg|jpeg|gif|png|webp)$/,use:[{
        loader: 'url-loader',
        options:{
          limit:1000,
          name:'[name].[hash:8].[ext]' 
        }
      }]},

    ]
  },
  devtool:"source-map",
  devServer:{
    port:8080,
    open:true,
    hot:true,
    historyApiFallback:true,
    proxy:{ //配置代理
    
    }
  }
}