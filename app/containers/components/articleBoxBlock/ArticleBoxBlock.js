import React,{Component} from 'react'
//import {Menu} from 'antd'
//import bindAll from 'lodash.bindall';
import style from './style.css'

export default class ArticleBoxBlock extends Component{
    constructor(props){
        super(props);
        //bindAll(this, ['handleClick']);
        //this.handleClick = this.handleClick.bind(this);
        this.state = {
            //current:this.props.categories[0]
            loginMenuShow:'none',
            modalVisible: false

        }
    }

    handleMousemove = (e) => {
        this.setState({loginMenuShow: 'block'});
    };
    handleMouseout = (e) => {
        this.setState({loginMenuShow: 'none'});
    };
    handleLoginClick = (e) => {
        this.setState({loginMenuShow: 'none'});
    };
    handleShowModal = () => {
      this.setState({modalVisible: true});
    }
    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
             this.setState({ loading: false, visible: false });
        }, 3000);
    }
    handleCancel = () => {
        this.setState({ modalVisible: false });
    }
    handleSubmit = () => {
        this.setState({ modalVisible: false });
    }
    render(){
        let _this = this;
        let visible = this.state.loginMenuShow;

        return(


            <div className={style.articleBox}>
                <div >
                    <div className={style.mainRtitle}>
                        <h4><span><em></em>文章推荐</span></h4>
                    </div>
                    <ul className={style.hotArticleList}>
                        <li className={`${style.moTextOverflow} ${style.listGroupItem}`}>
                            <a >文章测试1</a>
                        </li>
                        <li className={`${style.moTextOverflow} ${style.listGroupItem}`}>
                            <a className={style.animate}>ceshishuju222</a>
                        </li>
                        <li className={`${style.moTextOverflow} ${style.listGroupItem}`}>
                            <a className={style.animate}>ceshishuju333</a>
                        </li>
                        <li className={`${style.moTextOverflow} ${style.listGroupItem}`}>
                            <a className={style.animate}>ceshishuju444</a>
                        </li>
                    </ul>
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
