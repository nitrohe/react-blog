import React,{Component} from 'react'
//import {Menu} from 'antd'
//import bindAll from 'lodash.bindall';
import style from './style.css'
import {Icon} from 'antd';
import DocumentTitle from 'react-document-title';
import QueueAnim from 'rc-queue-anim';

export default class TimeLine extends Component{
    constructor(props){
        super(props);
        //bindAll(this, ['handleClick']);
        //this.handleClick = this.handleClick.bind(this);
        //this.state = {
        //    current:this.props.categories[0]
        //}
    }
    /*
    handleClick = (e) => {
        console.log('click ', e);
        if(e === '首页'){
            this.props.getArticleList('');
        }else{
            this.props.getArticleList(e);
        }
        let toPath = e === '首页'?'/':'/'+e;
        this.setState({
            current: e,
        });
        this.props.history.push(toPath);
    };
    */
    render(){
        let _this = this;
        let webTitle = "Nitrohe's Blog";

        return(
            <DocumentTitle title={`${webTitle} | 时间轴`}>
                <div className={style.timeline}>

                    <div className={style.qwe}>
                        <QueueAnim type="bottom" >
                        <div className={style.timelineRow} style={{marginBottom:10, marginTop:10, paddingBottom:50}}>
                            <div className={style.timelineTime} style={{marginLeft:-80, opacity:1}}>
                                <small style={{fontSize:24}}>2017</small>
                            </div>
                            <div className={style.timelineIcon}>
                                <div >
                                    <Icon type="pushpin-o"  style={{color:'#aaa'}} />
                                </div>
                            </div>

                        </div>

                        <div className={style.timelineRow} key="QA-T-1">
                            <div className={style.timelineTime}>
                                <small>2017-04-01</small>
                            </div>
                            <div className={style.timelineIcon}>
                                <div >
                                    <Icon type="edit" style={{color:'#aaa'}}/>
                                </div>
                            </div>
                            <div className={`${style.panel} ${style.timelineContent}`}>
                                <div className={style.panelBody}>
                                    <h2>Blog创建过程</h2>
                                    <p>刚开始也没想过写个博客什么的，某天查资料的时候，看到别人搭建的博客，想着闲着没事自己也整一个，然后就是开始码代码……</p>
                                </div>
                            </div>
                        </div>
                        <div className={style.timelineRow} key="QA-T-2">
                            <div className={style.timelineTime}>
                                <small>2017-05-13</small>
                            </div>
                            <div className={style.timelineIcon}>
                                <div >
                                    <Icon type="edit" style={{color:'#aaa'}}/>
                                </div>
                            </div>
                            <div className={`${style.panel} ${style.timelineContent}`}>
                                <div className={style.panelBody}>
                                    <blockquote>
                                        <p>大概一个月了，抽空的时候翻翻别人的博客（水墨寒的博客、青春博客、轮回博客、SeeYou……很不错），网上搜罗搜罗模板，发现其实并不需要很多功能！自己的博客没啥特色，移植个EasyUI的官方主题试试</p>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                        <div className={style.timelineRow} key="QA-T-3">
                            <div className={style.timelineTime}>
                                <small>2017-05-17</small>
                            </div>
                            <div className={style.timelineIcon}>
                                <div >
                                    <Icon type="edit" style={{color:'#aaa'}}/>
                                </div>
                            </div>
                            <div className={`${style.panel} ${style.timelineContent}`}>
                                <div className={style.panelBody}>
                                    <img  />
                                    <p>功能记录：博客功能、移植EasyUI、时间轴（套模板）、互动（留言功能）、（注册/登录待定）</p>
                                </div>
                            </div>
                        </div>
                        </QueueAnim>
                    </div>

                </div>
            </DocumentTitle>

        )
    }

    componentDidMount() {
        this.setState({
            //current:this.props.history.location.pathname.replace('\/','')||'首页'
        })
    }

}
