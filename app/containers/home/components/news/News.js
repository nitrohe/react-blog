import React, {Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import style from './style.css'
import {Icon} from 'antd';



export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsPos:0,
            newsDely:1,
            newsTimer:{}
        }
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.handleCallBack = this.handleCallBack.bind(this)
    }
    handleCallBack() {
        let _this = this;
        /*if(_this.state.newsPos >= 90) {
            _this.setState({
                newsPos: 0 ,
                newsDely: .5,
            });
            _this.timeInter = 0;

        } else {
            _this.setState({
                newsPos: _this.state.newsPos + 30,
                newsDely: .5,
            });

        }*/
        _this.newsTimer = setTimeout(_this.handleCallBack(), _this.timeInter);
    }

    render() {
        let _this = this;
        let newsList = ["更新博客了~~~","稳定性测试中~~欢迎提bug~~~","部分数据还未从1.0版本中导入~~~","更新博客了~~~"];

        //let divStyle = {transform: 'translateY(-'+this.state.newsPos+'px) translateZ(0px)',transitionDuration: ''+this.state.newsDely+'s'};
        let divStyle = {marginTop: '-'+this.state.newsPos+'px', transition: 'margin-top '+this.state.newsDely+'s linear '+this.state.newsDely+'s'};
        //let tmpT = this.state.newsPos==0?'0':'.5';
        //let divStyle = {marginTop: '-'+this.state.newsPos+'px', transition: 'margin-top '+tmpT+'s linear '+this.state.newsDely+'s'};

        let liList = newsList.map((item,index)=>(
            <li key={index} className={style.newsLi} > {item} </li>
        ));
        return (
            <div className={style.newsContainer}>
                <span className={style.newsImg}><Icon type="tags"  /></span>
                <ul className={style.newsUl} style={divStyle}>
                    {liList}
                </ul>

            </div>
        )
    }

    componentDidMount() {
        var _this = this;

        var newsTimer = setInterval(() => {
            if(this.state.newsPos >= 90) {
                this.setState({
                    newsPos: 0,
                    newsDely: 0,
                });

            } else {
                this.setState({
                    newsPos: this.state.newsPos + 30,
                    newsDely: .5,
                });

            }

        }, 1500)


        this.setState({
            newsTimer: newsTimer,
        });

    }
    componentWillUnmount() {
        //clearInterval(this.state.newsTimer);
        clearTimeout(this.state.newsTimer);
    }
}
