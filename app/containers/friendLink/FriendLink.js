import React,{Component} from 'react'
//import {Menu} from 'antd'
//import bindAll from 'lodash.bindall';
import style from './style.css'
import {Icon} from 'antd'
import DocumentTitle from 'react-document-title';

export default class FriendLink extends Component{
    constructor(props){
        super(props);
        //bindAll(this, ['handleClick']);
        //this.handleClick = this.handleClick.bind(this);
        this.state = {
            showLink:''
        }
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
    handleMouseEnter = () => {
        this.setState({showLink: style.expertsListShowLink});
    };
    handleMouseLeave = () => {
        this.setState({showLink: style.expertsListShowLink2});
    };
    render(){
        let _this = this;
        let showClass = this.state.showLink;
        let webTitle = "Nitrohe's Blog";
        
        return(
            <DocumentTitle title={`${webTitle} | 友链`}>
                <div className={style.friendLink}>

                    <div className={style.friendLinkBanner}>
                        <div className={style.friendLinkPre}>
                            <div className={style.friendLinkInfo}>
                                <Icon type="file-add" style={{fontSize :24,color:"#fff",float:"left",paddingTop:8}} />
                                <p >友情链接</p>
                            </div>
                            <p >欢迎喜欢技术、有原创的站点申请友链，请发送相关信息至nitrohe@163.com</p>
                        </div>
                    </div>


                    <div className={style.expertsListWrap }>

                       <div className={style.expertsList}>
                            <dt>
                                <a >
                                <img className={style.expertHead} src={require('./2.jpg')}/>
                                </a>
                            </dt>

                            <a className={style.expertsListInfo} target="_blank"  title="Nitrohe的博客" >
                                <div className={style.expertsListTitle}>
                                    <span>Nitrohe的博客</span>
                                </div>
                                <div className={style.i_w}>
                                    <div className={`${style.i} ${showClass}`} onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)}>
                                        <div className={style.c1}>
                                            <span>技术交流、web开发 技术交流、web开发 技术交流、web开发 </span>
                                        </div>
                                        <div className={style.c2}>
                                            <ul><li >http://www.nitrohe.xin</li></ul>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>


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
