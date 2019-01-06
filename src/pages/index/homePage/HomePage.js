import React,{Component} from 'react'
//import {Menu} from 'antd'
//import bindAll from 'lodash.bindall';
import style from './style.css'

export default class HomePage extends Component{
    constructor(props){
        super(props);
        //bindAll(this, ['handleClick']);
        //this.handleClick = this.handleClick.bind(this);
        //this.state = {
        //    current:this.props.categories[0]
        //}
    }

    render(){
        let _this = this;

        return(

            <div style={{minWidth:960}}>

                <div className={style.boxContent}>
                    <div className={style.clearfix}>
                        <div className={style.cdTestimonialsWrapper}>
                            <ul className={style.cdTestimonials}>
                                <li>
                                    <p >“Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday’s code.”</p>
                                    <div >
                                        <img  />
                                        <ul className={style.cdAuthorInfo}>
                                            <li>Nitrohe's Blog</li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>

                        </div>

                        <div className={style.cdSeeAll}>
                            <a className={style.btnF} href="#about">关于</a>
                            <a className={style.btnF} style={{marginLeft:30}} href="">博客</a>
                        </div>
                    </div>
                </div>

                <div className={style.container}>
                    <div className={style.heading}>
                        <div className={style.intro}>关于博客</div>
                    </div>
                    <div className={style.row}>
                        <ul className={style.timeline}>
                            <li className={style.blue}>
                                <div className={style.timelineImage}>
                                    <img className={style.imgcircle} src={require('./timeLineImg.jpg')} alt="" />
                                </div>
                                <div className={style.timelinePanel}>
                                    <div className={style.timelineHeading}>
                                        <h4>2017.04</h4>
                                        <h4 className={style.subheading}>Blog's Beginnings</h4>
                                    </div>
                                    <div className={style.timelineBody}>
                                        <p className={`${style.textMted} ${style.italicType}`} style={{paddingTop:5}}>创建的理由很简单，就是写写笔记，把看到的、想到的、做到的分享出来，希望有点用处!</p>
                                    </div>
                                </div>
                            </li>
                            <li className={`${style.timelineInverted} ${style.yellow}`}>
                                <div className={style.timelineImage}>
                                    <img className={style.imgcircle} src={require('./timeLineImg.jpg')}  alt="" />
                                </div>
                                <div className={style.timelinePanel}>
                                    <div className={style.timelineHeading}>
                                        <h4>2017.05</h4>
                                        <h4 className={style.subheading}>Continue</h4>
                                    </div>
                                    <div className={style.timelineBody}>
                                        <p className={`${style.textMted} ${style.italicType}`} style={{paddingTop:5}}>博客差不多完成了，是该写点什么了。</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={style.menuLogin}>
                </div>

            </div>

        )
    }

    componentDidMount() {
        this.setState({
            //current:this.props.history.location.pathname.replace('\/','')||'首页'
        })
    }

}
