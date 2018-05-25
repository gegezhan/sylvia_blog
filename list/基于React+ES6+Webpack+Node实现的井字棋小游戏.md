# 基于 React + ES6 + Webpack + Node 实现的井字棋小游戏
本实例基于 React + ES6 + Webpack + Node 实现一个井字棋的小游戏，来进一步深刻理解 React 的组件化思想。

### 1. 效果预览
您可点击[预览](https://hitsuoyue.github.io/TicTacToe/)进行效果预览。
井字棋规则如下：
* 下棋操作：A / B 两人轮流下棋，下好后该点显示下棋人的名字
* 成功：当某人下的棋连成三点一线，则判定某人成功
* 提示：棋盘上方提示处显示下一个下棋人是谁，判定某人成功后，提示出获胜者是谁，并且不可继续进行下棋操作
* 重开游戏：点击棋盘上方刷新按钮，清楚当前棋盘数据，重新开始游戏
* 步骤显示及步骤还原：右侧显示步骤按钮，点击即可调到对应步骤对应的棋盘面

### 2. 项目框架搭建
项目目录结构如下图：
![](http://upload-images.jianshu.io/upload_images/8879462-8cb832e6c28183a5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* 配置 package.json——安装依赖，配置 node 运行语句
项目框架使用 React + ES6 + Webpack + Node 搭建，首先创建一个 package.json 文件，如下，已添加好所需要安装的依赖目录，直接 npm install 即可安装项目所需依赖。
```
{
  "name": "game",
  "version": "1.0.0",
  "description": "gama:tic-tac-toe",
  "main": "index.js",
  "scripts": {
    "start": "webpack-dev-server --devtool eval --progress --hot --inline --colors --content-base build",
    "build": "webpack --progress --colors",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "css-loader": "^0.28.10",
    "file-loader": "^1.1.10",
    "node-sass": "^4.7.2",
    "react": "^16.2.0",
    "react-dom": "^16.2.0",
    "react-redux": "^5.0.6",
    "react-router": "^4.2.0",
    "redux": "^3.7.2",
    "redux-logger": "^3.0.6",
    "sass-loader": "^6.0.6",
    "style-loader": "^0.20.2",
    "url-loader": "^0.6.2"
  },
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-polyfill": "^6.26.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-2": "^6.24.1",
    "babel-runtime": "^6.26.0",
    "html-webpack-plugin": "^2.30.1",
    "open-browser-webpack-plugin": "0.0.5",
    "webpack": "^3.10.0",
    "webpack-dev-server": "^2.9.7"
  }
}
```
* 配置 webpack.config.js，配置项目编译、打包、浏览器自启动等功能
```
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
module.exports = {
    entry: './app.js',//
    output: {
        filename: "build/build.js"
    },
    devServer: {
        inline: true,
        port: 8060
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'index.html'
    }),
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({url: 'http://localhost:8060'})//自动打开浏览器
    ],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                plugins: ['transform-runtime'],
                presets: ['es2015', 'react', 'stage-2']
            }
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.scss$/,
            loader: "style-loader!css-loader!sass-loader"
        },{
            // 图片加载器
            test:/\.(png|jpg|gif|jpeg)$/,
            loader:'url-loader?limit=2048'
        }]
    }
};
```
* 新建 index.html，作为主页面入口
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>my app</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```
* 新建 src 文件夹存放项目代码，并在src 文件夹内新建 TicTacToe.js 文件，作为游戏区域外层组件

```
import React, {Component} from 'react';

class TicTacToe extends Component{
    render(){
        return(
            <div className='game'>
                tic-tac-toe
            </div>
        )
    }
}

export default TicTacToe;
```

* 新建 index.scss 文件，在后续的入口文件中引用
* 新建 app.js 文件作为项目入口文件，引用 src 内的 TicTacToe 组件及 index.scss 文件

```
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TicTacToe from './src/TicTacToe';
import './index.scss';

class APP extends Component{
    render(){
        return(
            <TicTacToe/>
        )
    }
}
ReactDOM.render(<APP/>, document.getElementById('app'));
```

* 至此，运行 npm start 即可启动项目，浏览器会自动打开 8060 端口，运行项目，效果如下图，接下来就可以进行组件划分。
![](http://upload-images.jianshu.io/upload_images/8879462-110998459c06a2a0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 3. 组件划分
* 从外到内划分，创建组件框架，完成引用，后进行功能完善
React 最核心的思想就是组件化，那么首先我们将井字棋游戏区域，按照显示和功能划分为组件。划分时，我采用了从外到内的顺序。
![](http://upload-images.jianshu.io/upload_images/8879462-4b8cc2be7cfb7235.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/620)
如上图，井字棋可划分为四部分，对应TicTacToe 、Header、Board、Steps四个组件。

### 4. 初步创建组件框架
* 从内到外创建，然后在外层引用
##### Header 组件：头部提示区
功能：显示当前下棋人、提示有人连线成功、重开游戏
render 代码中，status 为当前提示文字，<button/> 为重开游戏按钮
新建 Header 组件

```
import React, {Component} from 'react';

class Header extends Component{
    render(){
        const { winner, master } = this.props;
        let status = winner ? `Winner is ${winner}！` : `Next Player: ${master}`;
        return(
            <div>
                {status}
                <button>重玩儿一把</button>
            </div>
        )
    }
}

export default Header;
```

Header 组件需要从上层传下 winner、master 数据。
在 TicTacToe 组件中调用

```
import React, {Component} from 'react';
import Header from './Header';

class TicTacToe extends Component{
    constructor(props){
        super(props);
        this.state = {
            master: 'A',
            winner: ''
        }
    }
    render(){
        const { master, winner } = this.state;
        return(
            <div className='game'>
                <Header
                    master={master}
                    winner={winner}
                />
            </div>
        )
    }
}

export default TicTacToe;

```

效果如下图：
![](http://upload-images.jianshu.io/upload_images/8879462-8a4c161d48716520.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### Board 组件：棋盘组件，包含九个小棋盘格

```
import React, {Component} from 'react';

class Board extends Component{

    /**
     * 渲染多个棋盘格
     */
    renderSquares = () => {
        const { squares, onClickSquare } = this.props;
        let squaresDom = [];
        for(let i=0;i<9;i++){
            squaresDom.push(
                <button
                    key={i}
                    className='square'
                    onClick={e=>onClickSquare(e,i)}
                >
                    {squares[i]}
                </button>
            )
        };
        return squaresDom;
    }

    render(){
        return(
            <div className='board'>
                {this.renderSquares()}
            </div>
        )
    }
}

export default Board;

```

Board 组件需要从上层组件传入 squares、onClickSquare 数据。
下面在 TicTacToe 组件中调用 Board 组件，并添加 squares 数据和 onClickSquare 函数。

```
import React, {Component} from 'react';
import Header from './Header';
import Board from './Board';

class TicTacToe extends Component{
    constructor(props){
        super(props);
        this.state = {
            master: 'A',
            winner: '',
            squares: Array(9).fill(undefined)
        }
    }

    /**
     * 下棋触发
     */
    onClickSquare = (e, index) => {
        const {master, squares, winner} = this.state;
        if(squares[index] === undefined && !winner){
            let newSquares = Object.assign([], squares);
            newSquares[index] = master;
            let newMaster = '';
            switch (master){
                case 'A':
                    newMaster = 'B';
                    break;
                case 'B':
                    newMaster = 'A';
                    break;
                default:
                    break;
            }
            this.setState({
                master: newMaster,
                squares: newSquares
            })
        }
    }

    render(){
        const { master, winner, squares } = this.state;
        return(
            <div className='game'>
                <Header
                    master={master}
                    winner={winner}
                />
                <Board
                    squares={squares}
                    onClickSquare={this.onClickSquare}
                />
            </div>
        )
    }
}

export default TicTacToe;
 ```

在 index.scss 中加入样式：

```
.board{
  width: 120px;
  height: 120px;
  border: 1px solid #ccc;
  font-size: 0;
  .square{
    width: 40px;
    height: 40px;
    background: transparent;
    border: 1px solid #ccc;
    outline: none;
    cursor: pointer;
    vertical-align: bottom;
  }
}
```

运行结果如下：
![](http://upload-images.jianshu.io/upload_images/8879462-8ffb871881979f6b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
##### Steps 组件：步骤列组件，进行一步操作则产生一个步骤条，点击步骤条则跳转到对应棋盘格状态

```
import React, {Component} from 'react';

class Steps extends Component{

    /**
     * 渲染步骤条
     */
    renderSteps = () => {
        const { history, turnToStep } = this.props;
        let steps = [];
        history['data'].forEach((obj, index) => {
            steps.push(
                <button
                    key={index}
                    onClick={e=>turnToStep(e, index)}
                    className='step-btn'
                >
                    step{index}
                </button>
            )
        })
        return steps;
    }

    render(){
        return(
            <div className='steps'>
                {this.renderSteps()}
            </div>
        )
    }
}

export default Steps;

```

Steps 组件需要从上层组件传入 history、turnToStep 数据。
下面在 TicTacToe 组件中调用 Steps 组件，并添加 history 数据和 turnToStep 函数。

```
 import React, {Component} from 'react';
import Header from './Header';
import Board from './Board';
import Steps from './Steps';

class TicTacToe extends Component{
    constructor(props){
        super(props);
        this.state = {
            master: 'A',
            winner: '',
            squares: Array(9).fill(undefined),
            history: {
                flag: false,
                data:[{
                    master: 'A',
                    squares: Array(9).fill(undefined)
                }]
            }
        }
    }

    /**
     * 下棋触发
     * @returns {*}
     */
    onClickSquare = (e, index) => {
        const {master, squares, winner, history} = this.state;
        const { flag, data } = history;
        if(squares[index] === undefined && !winner){
            if(flag){
                let newMaster = data[data.length-1].master;
                let newSquares = data[data.length-1].squares;
                let newHistory = Object.assign([], history);
                newHistory.flag = false;
                this.setState({
                    master: newMaster,
                    squares: newSquares,
                    history: newHistory
                })
            }else{
                let newSquares = Object.assign([], squares);
                newSquares[index] = master;
                let newMaster = '';
                switch (master){
                    case 'A':
                        newMaster = 'B';
                        break;
                    case 'B':
                        newMaster = 'A';
                        break;
                    default:
                        break;
                }

                let newHistory = Object.assign([], history);
                newHistory.data.push({
                    master: newMaster,
                    squares: newSquares
                });

                this.setState({
                    master: newMaster,
                    squares: newSquares,
                    history: newHistory
                })
            }
        }
    }

    /**
     * 跳转到某一步
     * @returns {*}
     */
    turnToStep = (e, index) => {
        const { history } = this.state;
        const { master, squares } = this.state.history.data[index];
        let newHistory = Object.assign({}, history);
        newHistory.flag = true;
        this.setState({
            squares: squares,
            master: master,
            history: newHistory
        })
    }

    render(){
        const { master, winner, squares, history } = this.state;
        return(
            <div className='game'>
                <Header
                    master={master}
                    winner={winner}
                />
                <Board
                    squares={squares}
                    onClickSquare={this.onClickSquare}
                />
                <Steps
                    history={history}
                    turnToStep={this.turnToStep}
                />
            </div>
        )
    }
}

export default TicTacToe;
```

history.data 存储每一步点击的数据，history.flag 为是否点击了步骤条，若点击了步骤条，再下次点击棋盘时，先将期盼恢复为最后一次下棋结束的样子。
相应地，onClickSquare 函数也进行了更改。
### 5. 功能完善
基础组件已都已构建完毕，接下来进行功能完善。
* 判断胜出功能
思路：通过矩阵位置判断。下棋时，维护每个下棋人对应下棋的位置数据，通过位置数据与获胜位置数据匹配进行判断。
* 再玩一把功能
思路：将所有数据置为初始值即可。
完善后的 TicTacToe 组件代码如下：

```
import React, {Component} from 'react';
import Board from './Board';
import Steps from './Steps';
import Header from './Header';

class TicTacToe extends Component{
    constructor(props){
        super(props);
        this.state = {
            master: 'A',
            squares: Array(9).fill(undefined),
            winner: '',
            history:[{
                master: 'A',
                squares: []
            }]
        };
        this.squaresA = [];
        this.squaresB = [];
    }

    /**
     * 下棋触发
     */
    clickSquare = (e, value, index) => {
        const { master, winner } = this.state;
        if(value === undefined && !winner){
            let newSquares = Object.assign([], this.state.squares);
            let newHistory = Object.assign([], this.state.history);
            newSquares[index] = master;
            let newMaster = '';
            if(master === 'A'){
                newMaster = 'B';
                this.squaresA.push(index);
            }else if(master === 'B'){
                newMaster = 'A';
                this.squaresB.push(index);
            }
            newHistory.push({
                master: newMaster,
                squares: newSquares
            });

            let winner = this.calculateWinner();

            this.setState({
                master: newMaster,
                squares: newSquares,
                winner: winner,
                history: newHistory
            });
        }

    };

    /**
     * 点击步骤按钮后，跳转到对应的棋盘格状态
     */
    onStepClick = (e, data) => {
        const { master, squares } = data;
        this.setState({
            squares: squares,
            master: master
        });
    }

    /**
     * 判断是否有人连线成功
     */
    calculateWinner = () => {
        let winner = '';
        const { master } = this.state;
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        let squares = (master === 'A') ? this.squaresA : this.squaresB;

        lines.forEach(arr => {
            if(squares.indexOf(arr[0]) !== -1 && squares.indexOf(arr[1]) !== -1 && squares.indexOf(arr[2]) !== -1){
                winner = master;
            }
        });
        return winner;
    }

    /**
     * 重新开始一把游戏
     */
    refreshGame = () => {
        this.squaresA = [];
        this.squaresB = [];
        this.setState({
            master: 'A',
            squares: Array(9).fill(null),
            winner: '',
            history:[{
                master: 'A',
                squares: []
            }]
        })
    }

    render(){
        const { master, squares, winner, history } = this.state;
        return(
            <div className='game'>
                <Header
                    winner={winner}
                    master={master}
                    refreshGame={this.refreshGame}
                />
                <Board
                    clickSquare={this.clickSquare}
                    master={master}
                    squares={squares}
                    winner={winner}
                />
                <Steps
                    history={history}
                    onStepClick={this.onStepClick}
                />
            </div>
        )
    }
}

export default TicTacToe;
```

再给 Header 组件 的 button 添加点击事件。

```
import React, {Component} from 'react';

class Header extends Component{
    render(){
        const { winner, master, refreshGame } = this.props;
        let status = winner ? `Winner is ${winner}！` : `Next Player: ${master}`;
        return(
            <div className='title'>
                {status}
                <button className='refresh' onClick={refreshGame}/>
            </div>
        )
    }
}

export default Header;
```

至此，功能完善完毕。
### 6. 样式调整
最后再进行样式调整。

```
.game{
  width: 500px;
  height: 380px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -190px;
  margin-left: -250px;
  .title{
    height: 80px;
    line-height: 80px;
    font-size: 30px;
    text-indent: 50px;
    .refresh{
      width: 30px;
      height: 32px;
      outline: none;
      border: none;
      cursor: pointer;
      margin-left: 100px;
      vertical-align: middle;
      background: url("./src/image/refresh.png")no-repeat 0 0/30px 30px;
    }
  }
  .board{
    width: 300px;
    border: 1px solid #ccc;
    font-size: 0;
    float: left;
    .square{
      width: 100px;
      height: 100px;
      line-height: 60px;
      background: transparent;
      border: 1px solid #ccc;
      outline: none;
      cursor: pointer;
      vertical-align: middle;
    }
  }
  .steps{
    width: 198px;
    float: right;
    .step-btn{
      height: 28px;
      width: 85%;
      background: transparent;
      outline: none;
      border: 1px solid #ccc;
      margin-left: 15%;
      margin-top: 2px;
      border-radius: 5px;
    }
  }
}
```

效果如下：
![](http://upload-images.jianshu.io/upload_images/8879462-da2e4dc7cbd68462.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


[完整代码地址](https://github.com/Hitsuoyue/TicTacToe)


ps： 还有一个更完整的 井字棋/五子棋 切换小游戏，[预览网址](https://hitsuoyue.github.io/tic-tac-toe/)，[代码地址](https://github.com/Hitsuoyue/tic-tac-toe)。


本文参考：
https://reactjs.org/tutorial/tutorial.html